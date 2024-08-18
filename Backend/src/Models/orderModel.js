const db = require("../Configs/database");

const getAllOrders = async () => {
  const [rows, fields] = await db.query(`
    SELECT 
        HosoDangKy.IdHoSo, 
        HosoDangKy.trangThai, 
        CoSo.TenCoSo, 
        CoSo.DiaChi
    FROM 
        HosoDangKy
    JOIN 
        CoSo ON HosoDangKy.IdCoSo = CoSo.IdCoSo;
    `);
  return rows;
};

const getDetailOrderByID = async (id) => {
  try {
    const [rows, fields] = await db.query(
      `
      SELECT
          HosoDangKy.IdHoSo,
          HosoDangKy.trangThai,
          CoSo.TenCoSo,
          CoSo.DiaChi
      FROM
          HosoDangKy
      JOIN
          CoSo ON HosoDangKy.IdCoSo = CoSo.IdCoSo
      WHERE
          HosoDangKy.IdHoSo = ?;
        `,
      [id]
    );

    return rows;
  } catch (error) {
    console.error("Error in getDetailOrderByID: ", error);
    throw error; // Rethrow the error for handling in upper layers
  }
};

const getOrderDetailFinished = async (id) => {
  try {
    const [rows, fields] = await db.query(
      `
      SELECT
          CoSo.TenCoSo,
          CoSo.DiaChi,
          LoaiHinhKinhDoanh.TenLoaiHinhKinhDoanh,
          LoaiHinhKinhDoanh.SoGiayPhepKD,
          LoaiHinhKinhDoanh.NgayCapGiayPhep,
          GiayChungNhanATTP.NgayDangKy,
          GiayChungNhanATTP.LoaiThucPham,
          GiayChungNhanATTP.HinhAnhMinhHoa
      FROM
          CoSo
      JOIN
          LoaiHinhKinhDoanh ON CoSo.IdLoaiHinhKinhDoanh = LoaiHinhKinhDoanh.IdLoaiHinhKinhDoanh
      JOIN
          GiayChungNhanATTP ON CoSo.IdCoSo = GiayChungNhanATTP.IdCoSo
      WHERE
          CoSo.IdCoSo = ?;
        `,
      [id]
    );

    return rows;
  } catch (error) {
    console.error("Error in getDetailOrderByID: ", error);
    throw error; // Rethrow the error for handling in upper layers
  }
};

const rejectOrderModel = async (idHoSo, noiDungTuChoi, nguoiXuLy, idXuLyViPham) => {
  try {
    // Lấy IdChiTietKetQua từ IdHoSo
    const queryIdChiTietKetQua = `
      SELECT IdChiTietKetQua 
      FROM ChiTietKetQua 
      WHERE IdKeHoach = (
        SELECT IdKeHoach 
        FROM KeHoach 
        WHERE IdCoSo = (
          SELECT IdCoSo 
          FROM HoSoDangKy 
          WHERE IdHoSo = ?
        )
      )
    `;
    const [rows] = await db.query(queryIdChiTietKetQua, [idHoSo]);
    if (rows.length === 0) {
      throw new Error('Không tìm thấy IdChiTietKetQua.');
    }
    const idChiTietKetQua = rows[0].IdChiTietKetQua;

    // Chèn dữ liệu vào bảng XuLyViPham
    const queryInsert = `
      INSERT INTO XuLyViPham (IdXuLyViPham, IdChiTietKetQua, NgayXuLy, NguoiXuLy, NoiDungXuLy, TrangThai)
      VALUES (?, ?, NOW(), ?, ?, 2)
    `;
    await db.query(queryInsert, [idXuLyViPham, idChiTietKetQua, nguoiXuLy, noiDungTuChoi]);

    // Cập nhật trạng thái của bảng HoSoDangKy
    const queryUpdateStatus = `
      UPDATE HoSoDangKy 
      SET trangThai = 'Từ chối'
      WHERE IdHoSo = ?
    `;
    await db.query(queryUpdateStatus, [idHoSo]);
  } catch (error) {
    console.error("Lỗi khi xử lý query từ chối: ", error);
    throw error; // Rethrow the error for handling in upper layers
  }
};

const createFileModel = async () => {

};

// Order Model
const updateOrderDeliveryDate = async (PK_Id_DonHang, Ngay_DH) => {
  const query = "UPDATE don_hang SET Ngay_DH = ? WHERE PK_Id_DonHang = ?";
  await db.query(query, [Ngay_DH, PK_Id_DonHang]);
};

const updateOrderDriverID = async (ID_TX, PK_Id_DonHang) => {
  const query = "UPDATE don_hang SET ID_TX = ? WHERE PK_Id_DonHang = ?";
  await db.query(query, [ID_TX, PK_Id_DonHang]);
};

// Driver Model
const updateDriverStatus = async (Trang_thai, PK_Id_TX) => {
  const query = "UPDATE taixe SET Trang_thai = 'Đang bận' WHERE PK_Id_TX = ?";
  await db.query(query, [Trang_thai, PK_Id_TX]);
};

// Vehicle Model
const updateVehicleStatus = async (Tinh_Trang, PK_Id_Xe) => {
  const query = "UPDATE xe SET Tinh_Trang = 'Đang giao' WHERE PK_Id_Xe = ?";
  await db.query(query, [Tinh_Trang, PK_Id_Xe]);
};

// add vehicle id
const addVehicleId = async (PK_Id_Xe, PK_Id_DonHang) => {
  const query = "UPDATE don_hang SET FK_Id_Xe = ? WHERE PK_Id_DonHang = ?";
  await db.query(query, [PK_Id_Xe, PK_Id_DonHang]);
};

const updateOrderAddress = async (addressCustomer, orderId) => {
  try {
    const query = "UPDATE don_hang SET tuyen_duong = ? WHERE PK_Id_DonHang = ?";
    await db.query(query, [addressCustomer, orderId]);
  } catch (error) {
    throw error;
  }
};

const updateFile = async (orderId) => {
  try {
    console.log("id trong model", orderId);
    const query = "UPDATE HoSoDangKy SET trangThai = 'Đã duyệt' WHERE IdHoSo = ?";
    await db.query(query, [orderId])

  } catch (error) {
    console.error("Lỗi khi cập nhật hồ sơ:", error);
    throw error; // Hoặc trả về một giá trị lỗi cụ thể
  }
};

const updateOrderDriver = async (orderId) => {
  try {
    const query = "UPDATE don_hang SET Trang_Thai = 3 WHERE PK_Id_DonHang = ?";
    await db.query(query, [orderId]);
  } catch (error) {
    throw error;
  }
};

const updateOrderDateDevivery = async (deliveryDate, orderId) => {
  try {
    const query = "UPDATE don_hang SET Ngay_GH = ? WHERE PK_Id_DonHang = ?";
    await db.query(query, [deliveryDate, orderId]);
  } catch (error) {
    throw error;
  }
};
const getOrderByIdKH = async (id) => {
  try {
    const query = `SELECT Ten_Don_Hang,
    CASE 
        WHEN dh.Trang_Thai = 0 THEN 'Chưa giao hàng'
        WHEN dh.Trang_Thai = 1 THEN 'Đã giao hàng'
        WHEN dh.Trang_Thai = 2 THEN 'Đang giao hàng'
        ELSE 'Trạng thái không xác định'
    END AS TrangThai, 
    ID_KH  
FROM don_hang dh 
WHERE ID_KH = ?`;

    const [rows, fields] = await db.query(query, [id]);
    return rows;
  } catch (error) {
    throw error;
  }
};
const getReasonReject = async (id) => {
  try {
    const [rows, fields] = await db.query(
      `
      SELECT
            HoSoDangKy.IdHoSo,
            HoSoDangKy.IdCoSo,
            HoSoDangKy.trangThai,
            XuLyViPham.NoiDungXuLy
        FROM
            HoSoDangKy
        JOIN
            ChiTietKetQua ON HoSoDangKy.IdCoSo = ChiTietKetQua.IdKeHoach
        JOIN
            XuLyViPham ON ChiTietKetQua.IdChiTietKetQua = XuLyViPham.IdChiTietKetQua
        WHERE
            HoSoDangKy.trangThai = 'Từ chối' AND
            HoSoDangKy.IdHoSo = ?;
        `,
      [id]
    );
    console.log("LLLLLLLLLLLLLLLLLLLL")
    console.log(rows)
    return rows;
  } catch (error) {
    console.error("Error in getDetailOrderByID: ", error);
    throw error; // Rethrow the error for handling in upper layers
  }
};
module.exports = {
  getReasonReject,
  getAllOrders,
  getDetailOrderByID,
  updateOrderDeliveryDate,
  updateDriverStatus,
  updateVehicleStatus,
  updateFile,
  updateOrderDateDevivery,
  updateOrderAddress,
  getOrderByIdKH,
  getOrderDetailFinished,
  addVehicleId,
  updateOrderDriverID,
  updateOrderDriver,
  rejectOrderModel,
  createFileModel
};
