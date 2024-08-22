const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const database = require("./Configs/database");
const { createUser, login, getDriverIdleController, deleteUserAccount } = require("./Controllers/UserController.js");
const {
  getAllTraffics,
  addTrafficsController,
  getTrafficById,
  deleteTrafficController,
  updateTrafficController,
  searchTrafficByLicensePlateController,
  getVehicleIdleController,
} = require("./Controllers/trafficController.js");
const { getAllVehicleTypes } = require("./Controllers/typesVehicleController.js");
const { getAllOrders, rejectOrderControllerV, updateChiTiet, reasonRejectController, getDetailOrderByID, updateOrderController, createKehoach, getOrderByIdKH, getOrderDetailFinishedController, getOrderFileUpdate } = require("./Controllers/orderController.js");
const { getAllCustomersController, getinforCustomerByID } = require("./Controllers/CustomerController.js");
const { getAllDataShipper } = require("./Controllers/ChartController.js")
const { getAllDriver, getAllEmployee, updateEmployee, addDriver, getInforDriverByID, updateDriverByID } = require("./Controllers/employeeController.js")
const { loginDriverController, rejectOrderController, getDetailDriverController, getDetailOrderController, confirmOrderController } = require("./Controllers/driverController.js");
const { updateFile } = require("./Models/orderModel.js");

app.use(express.json());
app.use(cors()); // Thêm middleware cors vào ứng dụng Express

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Use the uploads directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
  })
});
// Database connection
try {
  database;
  console.log("Connected to the database");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Routes
app.post("/api/register", createUser);
app.post("/api/login", login);
app.post("/api/loginDriver", loginDriverController);
app.post("/api/getDetailDriver", getDetailDriverController);

// traffic
app.get("/api/getAllTraffics", getAllTraffics);
app.post("/api/addTraffics", addTrafficsController);
app.get("/api/getTraffic/:id", getTrafficById);
app.delete("/api/deleteTraffic/:id", deleteTrafficController);
app.put("/api/updateTraffic/:id", updateTrafficController);
app.get(
  "/api/searchTrafficByLicensePlate/:licensePlate",
  searchTrafficByLicensePlateController
);
app.get("/api/getVehicleIdle", getVehicleIdleController);

// loại xe
app.get("/api/getAllVehicleTypes", getAllVehicleTypes);

// tài xế
app.get("/api/getAllDriversIdle", getDriverIdleController);
app.get("/api/getDetailOrder/:PK_Id_DonHang/:ID_TX", getDetailOrderController);
app.post("/api/confirmOrder", confirmOrderController);
app.post("/api/rejectOrder", rejectOrderController);

// Đơn hàng
app.get("/api/getAllOrders", getAllOrders);
app.get("/api/getDetailOrderByID/:id", getDetailOrderByID);
app.post("/api/updateOrder", updateOrderController);
app.get("/api/getOrderByIdKH/:id", getOrderByIdKH)
app.get("/api/getOrderDetailFinished/:id", getOrderDetailFinishedController);
app.post("/api/updateOrderFile/:id", getOrderFileUpdate)
app.post("/api/rejectOrdera/:id", rejectOrderControllerV)
app.get("/api/rejection-details/:id", reasonRejectController)
// Endpoint to handle form submission
app.post('/api/submit-order', upload.single('file'), async (req, res) => {
  const {
    facilityName,
    ownerName,
    address,
    businessType,
    businessLicenseNumber,
    licenseIssueDate,
    foodType
  } = req.body;
  const file = req.file;

  const filePath = file ? file.path : null;
  console.log(req.body);
  try {
    // Get the current maximum IdCoSo
    const [maxCoSoResult] = await database.query(
      `SELECT COALESCE(MAX(IdCoSo), 0) AS maxIdCoSo FROM coso`
    );
    const newIdCoSo = maxCoSoResult[0].maxIdCoSo + 1;

    // Insert into CoSo
    await database.query(
      `INSERT INTO coso (IdCoSo, ChuCoSo, TenCoSo, DiaChi, IdLoaiHinhKinhDoanh) VALUES (?, ?, ?, ?, ?)`,
      [newIdCoSo, ownerName, facilityName, address, 1]
    );

    // Get the current maximum IdHoSo
    const [maxHoSoResult] = await database.query(
      `SELECT COALESCE(MAX(IdHoSo), 0) AS maxIdHoSo FROM hosodangky`
    );
    const newIdHoSo = maxHoSoResult[0].maxIdHoSo + 1;

    // Insert into HoSoDangKy
    await database.query(
      `INSERT INTO hosodangky (IdHoSo, IdCoSo, trangThai) VALUES (?, ?, ?)`,
      [newIdHoSo, newIdCoSo, 'Chưa duyệt']
    );

    // Get the current maximum IdHoSo
    const [maxGCNResult] = await database.query(
      `SELECT COALESCE(MAX(IdGiayChungNhan), 0) AS maxIdGiayChungNhan FROM giaychungnhanattp`
    );
    const newgiaychungnhanattp = maxGCNResult[0].maxIdGiayChungNhan + 1;
    await database.query(
      `INSERT INTO giaychungnhanattp (IdGiayChungNhan, IdCoSo, NgayCapChungNhanATTP) VALUES (?, ?, ?)`,
      [newgiaychungnhanattp, newIdCoSo, licenseIssueDate]
    );

    // Get the current maximum IdHoSo
    const [maxChiTiet] = await database.query(
      `SELECT COALESCE(MAX(IdChiTietKetQua), 0) AS maxIdChiTiet FROM ChiTietKetQua`
    );
    const newmaxChiTiet = maxChiTiet[0].maxIdChiTiet + 1;
    await database.query(
      `INSERT INTO ChiTietKetQua (IdChiTietKetQua) VALUES (?)`,
      [newmaxChiTiet]
    );

    res.json({
      success: true,
      message: 'Form submitted successfully'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while submitting the form'
    });
  }
});
app.post('/api/createKehoach', createKehoach)
app.post('/api/updateIDChiTiet', updateChiTiet)
app.get('/api/getallThanhTra', async (req, res) => {
  try {
    const query = `
            SELECT 
                k.NoiDung AS 'Tên kế hoạch', 
                k.ThoiGianBatDau AS 'Ngày thanh tra',
                DATE_FORMAT(k.ThoiGianBatDau, '%H:%i') AS 'Giờ bắt đầu',
                c.TenCoSo AS 'Cơ sở thanh tra'
            FROM 
                kehoach k
            JOIN 
                coso c ON k.IdCoSo = c.IdCoSo; 
        `;

    const [results, fields] = await database.query(query);
    res.json(results); // Trả về kết quả dưới dạng JSON
  } catch (error) {
    console.error('Lỗi khi lấy danh sách thanh tra:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách thanh tra' });
  }
});

// khách hàng
app.get("/api/getAllCustomers", getAllCustomersController);
app.get("/api/getinforCustomerByID/:id", getinforCustomerByID);


//Chart Report
app.get("/api/getAllReportShipers", getAllDataShipper);

//Employee
app.get("/api/getAllDriver", getAllDriver);
app.get("/api/getAllEmployee", getAllEmployee);
app.put("/api/updateEmployee/:id", updateEmployee)
app.post("/api/addDriver", addDriver)
app.get("/api/getInforDriverByID/:id", getInforDriverByID);
app.put("/api/updateDriverByID/:id", updateDriverByID);


//User
app.delete("/api/deleteUserAccount/:id", deleteUserAccount)
module.exports = app;
