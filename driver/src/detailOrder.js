import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
  DialogTitle,
} from "@headlessui/react";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function DetailOrder() {
  const [orderData, setOrderData] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const { orderId, driverId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [vehicleId, setVehicleId] = useState(null); // State to store vehicleId

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/getDetailOrder/${orderId}/${driverId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setOrderData(data[0]); // Assuming you only receive one order

        // Fetch vehicleId from Firestore
        const q = query(
          collection(db, "users"),
          where("orderId", "==", orderId),
          where("driverId", "==", driverId)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const document = querySnapshot.docs[0].data();
          setVehicleId(document.vehicleId); // Store vehicleId in state
        } else {
          console.log(
            "No documents found with orderId:",
            orderId,
            "and driverId:",
            driverId
          );
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [orderId, driverId]);

  const handleReject = () => {
    setOpenDialog(true);
  };

  const handleAccept = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/confirmOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ PK_Id_DonHang: orderId }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm order");
      }

      const result = await response.json();
      alert(result.message);

      localStorage.setItem('orderId', orderId);

      const q = query(
        collection(db, "users"),
        where("orderId", "==", orderId),
        where("driverId", "==", driverId)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          try {
            const documentId = docSnapshot.id;
            await deleteDoc(doc(db, "users", documentId));
            console.log("Document successfully deleted!");
            window.location.href = "/";
          } catch (deleteError) {
            console.error("Error deleting document:", deleteError);
          }
        });
      } else {
        console.log(
          "No documents found with orderId:",
          orderId,
          "and driverId:",
          driverId
        );
      }
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const handleDialogSave = async () => {
    try {
      const requestData = {
        PK_Id_DonHang: orderId,
        ID_TX: driverId,
        vehicleId: vehicleId, // Include vehicleId in the request payload
        rejectReason: rejectReason, // Include rejectReason in the request payload
      };
  
      console.log("Reject request data:", requestData);
  
      const response = await fetch('http://localhost:3001/api/rejectOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to reject order. Server responded with status: ${response.status}`);
      }
  
      // Create a new document in Firestore for the rejected order
      const rejectCollectionRef = collection(db, "reject");
      const rejectDocRef = doc(rejectCollectionRef, driverId); // Use driverId as the document ID
      await setDoc(rejectDocRef, requestData);
      console.log("New reject document created with ID:", rejectDocRef.id);
  
      // Order rejected successfully, now delete the document from the "users" collection
      const q = query(
        collection(db, "users"),
        where("orderId", "==", orderId),
        where("driverId", "==", driverId)
      );
  
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          try {
            const documentId = docSnapshot.id;
            await deleteDoc(doc(db, "users", documentId));
            console.log("Document successfully deleted!");
            setOpenDialog(false); // Close the dialog after successful rejection
            window.location.href = "/"; // Redirect or do any necessary action
          } catch (deleteError) {
            console.error("Error deleting document:", deleteError);
          }
        });
      } else {
        console.log(
          "No documents found with orderId:",
          orderId,
          "and driverId:",
          driverId
        );
      }
  
      alert("Tài xế đã từ chối đơn hàng!");
    } catch (error) {
      console.error("Error while rejecting order:", error);
    }
  };
  

  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {orderData ? (
          <div>
            <div className="px-4 py-12 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Thông tin đơn hàng
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Personal details and application.
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                {Object.entries(orderData).map(([key, value]) => (
                  <div
                    key={key}
                    className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                  >
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      {key}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {typeof value === "string"
                        ? value
                        : JSON.stringify(value)}
                    </dd>
                  </div>
                ))}
                <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                  <button
                    onClick={handleAccept}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Nhận đơn
                  </button>
                  <button
                    onClick={handleReject}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-3 sm:mt-0"
                  >
                    Từ chối
                  </button>
                </div>
              </dl>
            </div>

            <Transition show={openDialog}>
              <Dialog className="relative z-10" onClose={setOpenDialog}>
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
                                  Nhập lý do không nhận đơn hàng
                                </p>
                                <input
                                  type="text"
                                  value={rejectReason}
                                  onChange={(e) =>
                                    setRejectReason(e.target.value)
                                  }
                                  className="border"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            onClick={handleDialogSave}
                          >
                            Từ chối
                          </button>
                        </div>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </div>
    </div>
  );
}
