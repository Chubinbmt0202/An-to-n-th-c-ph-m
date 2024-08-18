import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";
import { db } from "../src/firebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ SDT: "", PassWord: "" });
  const [error, setError] = useState("");
  const [driverName, setDriverName] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [specificMessage, setSpecificMessage] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
        setDriverName(parsedUser.HoTen);
        try {
          await fetchDriverDetails(parsedUser.SDT);
          await fetchSpecificMessage(parsedUser.PK_Id_TX.toString());
        } catch (error) {
          console.error("Error fetching driver details:", error);
        }
      } else {
        setIsLoggedIn(false);
        setOpen(true);
      }
    };

    // Initial check
    checkLoginStatus();

    // Set an interval to check login status periodically
    // Optionally, you can remove this interval if you don't need periodic checks
    const interval = setInterval(checkLoginStatus, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/loginDriver",
        {
          SDT: credentials.SDT,
          PassWord: credentials.PassWord,
          ID_role: 3,
        }
      );
      if (response.data.success) {
        setIsLoggedIn(true);
        setOpen(false);
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Assuming response.data.user contains the user info
        await fetchDriverDetails(credentials.SDT);
      } else {
        setError("Invalid phone number or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setOpen(true);
    setDriverName("");
    setMessage("");
    setSpecificMessage("");
  };


  const handleCloseModal = () => {
    if (isLoggedIn) return;
    setOpen(false);
  };

  const fetchDriverDetails = async (SDT) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/getDetailDriver",
        { SDT }
      );
      const driverData = response.data;
      console.log(driverData.Ten_TX);
      setDriverName(driverData.Ten_TX);
      localStorage.setItem("user", JSON.stringify(driverData));
      await fetchMessage(driverData.PK_Id_TX);
    } catch (error) {
      console.error("Error fetching driver details:", error);
    }
  };

  const fetchMessage = (PK_Id_TX) => {
    const q = query(collection(db, "users"), where("PK_Id_TX", "==", PK_Id_TX));
    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          setMessage(doc.data().message || "No message available.");
        });
      } else {
        setMessage("No message available.");
      }
    });
  };

  const fetchSpecificMessage = async (documentId) => {
    console.log("Fetching document with ID:", documentId); // Debugging line
    const docRef = doc(db, "users", documentId);

    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setUsers(userData);
        setOpenDialog(true);
        const specificMessage = userData.message || "No message available.";
        setSpecificMessage(specificMessage);
      } else {
        console.log("Document does not exist"); // Debugging line
        setSpecificMessage("Không có đơn hàng nào sử lý");
        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Error getting document:", error);
      setSpecificMessage("Error fetching document data");
    }
  };

  const handleMove = () => {
    const orderID = users.orderId;
    const driverID = users.driverId;
    window.location.href = `/createOrder`;
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Trang khách hàng
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Xin chào: {isLoggedIn ? driverName : "Khách hàng chưa đăng nhập"}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {isLoggedIn
              ? specificMessage
              : `Đang giao đơn hàng với ID là:`}
          </p>
          {isLoggedIn && (
            <button onClick={handleLogout} className="text-black bg-slate-50 mr-4">
              Đăng xuất
            </button>
          )}
          <button onClick={handleMove} className="text-black bg-slate-50">
            Tạo đơn đăng ký an toàn thực phẩm
          </button>
        </div>
      </div>

      <Transition show={open}>
        <Dialog className="relative z-10" onClose={handleCloseModal}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                      <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Đăng nhập với tài khoản tài xế
                      </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                          <label
                            htmlFor="SDT"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Số điện thoại
                          </label>
                          <div className="mt-2">
                            <input
                              id="SDT"
                              name="SDT"
                              type="text"
                              autoComplete="phone"
                              required
                              value={credentials.SDT}
                              onChange={handleChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="PassWord"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Password
                            </label>
                            <div className="text-sm">
                              <a
                                href="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                              >
                                Forgot password?
                              </a>
                            </div>
                          </div>
                          <div className="mt-2">
                            <input
                              id="PassWord"
                              name="PassWord"
                              type="password"
                              autoComplete="current-password"
                              required
                              value={credentials.PassWord}
                              onChange={handleChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                      {error && (
                        <p className="mt-2 text-center text-sm text-red-600">
                          {error}
                        </p>
                      )}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition show={openDialog}>
        <Dialog className="relative z-10" onClose={() => setOpenDialog(false)}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Thông báo
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {specificMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleMove}
                    >
                      Tới trang chi tiết đơn hàng
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
