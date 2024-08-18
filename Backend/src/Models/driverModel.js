const db = require("../Configs/database");

const LoginDriver = async (SDT, PassWord) => {
  try {
    console.log(SDT, PassWord)
    const [rows] = await db.query(
      `SELECT
            IDNguoiDung,
            HoTen,
            Cccd,
            Sdt,
            IDChucvu
        FROM
            NGUOIDUNG
        WHERE
            Cccd = ?
            AND MatKhau = ?
            AND IDChucvu = 3`,
      [SDT, PassWord]
    );

    console.log(rows);
    return rows[0];  // Return the first row of the result set
  } catch (error) {
    console.error("Error during login: ", error);
    throw error;  // Rethrow the error for handling in upper layers
  }
};


const getDetailDriver = async (SDT) => {
  const [rows] = await db.query(
    `
        SELECT 
            taixe.Ten_TX, 
            taikhoan.Username, 
            taikhoan.PassWord, 
            taikhoan.SDT,
            taixe.PK_Id_TX
        FROM 
            taikhoan
        JOIN 
            taixe 
        ON 
            taikhoan.PK_Id_TK = taixe.Id_TaiKhoan
        WHERE 
            taikhoan.SDT = ?
    `,
    [SDT]
  );
  return rows[0];
};

const getDetailOrder = async (PK_Id_DonHang, ID_TX) => {
  const [rows] = await db.query(
    `
    SELECT 
        don_hang.PK_Id_DonHang AS 'Mã đơn hàng',
        don_hang.Ngay_DH AS 'Ngày đặt hàng',
        don_hang.Ngay_GH AS 'Ngày giao',
        dich_vu_van_chuyen.Ten_dich_vu AS 'Tên dịch vụ vận chuyển',
        dich_vu_van_chuyen.Gia_dich_vu AS 'Giá dịch vụ vận chuyển',
        khachhang.Ten_KH AS 'Tên khách hàng',
        khachhang.SDT AS 'Số điện thoại khách hàng',
        CONCAT(diachi.Ten_Dia_Chi, ', ', diachi.Xa, ', ', diachi.Quan_huyen, ', ', diachi.Tinh) AS 'Địa chỉ khách hàng',
        GROUP_CONCAT(
            DISTINCT CONCAT(
                sanpham.Ten_San_Pham, ' - ', 
                sanpham.Mo_Ta, ' - Giá: ', 
                sanpham.Gia, ' - Số lượng: ', 
                chi_tiet_don_hang.So_Luong
            ) SEPARATOR ', '
        ) AS 'Các sản phẩm mà khách hàng đặt',
        taixe.Ten_TX AS 'Tài xế phụ trách',
        taixe.SDT AS 'Số điện thoại tài xế',
        xe.Bien_so,
        SUM(chi_tiet_don_hang.So_Luong) AS 'Tổng số lượng mặt hàng',
        SUM(chi_tiet_don_hang.Chieu_dai * chi_tiet_don_hang.Chieu_rong * chi_tiet_don_hang.Chieu_cao * chi_tiet_don_hang.So_Luong) AS 'Tổng khối lượng'
    FROM 
        don_hang
        JOIN dich_vu_van_chuyen ON don_hang.ID_DichVu = dich_vu_van_chuyen.PK_Id_DichVu
        JOIN khachhang ON don_hang.ID_KH = khachhang.PK_Ma_KH
        JOIN diachi ON diachi.reference_id = khachhang.PK_Ma_KH AND diachi.type = 'customer'
        JOIN chi_tiet_don_hang ON don_hang.PK_Id_DonHang = chi_tiet_don_hang.PK_Id_DonHang
        JOIN sanpham ON chi_tiet_don_hang.PK_Id_SanPham = sanpham.PK_Id_SanPham
        JOIN taixe ON don_hang.ID_TX = taixe.PK_Id_TX
        JOIN xe ON don_hang.FK_Id_Xe = xe.PK_Id_Xe
    WHERE 
        don_hang.PK_Id_DonHang = ? AND
        don_hang.ID_TX = ?
    GROUP BY 
        don_hang.PK_Id_DonHang, 
        don_hang.Ngay_DH, 
        don_hang.Ngay_GH, 
        dich_vu_van_chuyen.Ten_dich_vu, 
        dich_vu_van_chuyen.Gia_dich_vu,
        khachhang.Ten_KH, 
        khachhang.SDT, 
        diachi.Ten_Dia_Chi, 
        diachi.Xa, 
        diachi.Quan_huyen, 
        diachi.Tinh, 
        taixe.Ten_TX, 
        taixe.SDT,
        xe.Bien_so
    LIMIT 0, 1000;
    `,
    [PK_Id_DonHang, ID_TX]
  );
  return rows;
};

const updateOrder = async (PK_Id_DonHang) => {
  try {
    const query = "UPDATE don_hang SET Trang_Thai = 2 WHERE PK_Id_DonHang = ?";
    await db.query(query, [PK_Id_DonHang]);
  } catch (error) {
    console.log("Lỗi truy vấn");
    throw error;
  }
};

const rejectOrder = async (PK_Id_DonHang) => {
  try {
    const query = "UPDATE don_hang SET Trang_Thai = 0 WHERE PK_Id_DonHang = ?";
    await db.query(query, [PK_Id_DonHang]);
  } catch (error) {
    console.log("Lỗi truy vấn");
    throw error;
  }
};

const rejectOrderTX = async (PK_Id_DonHang) => {
  try {
    const query = "UPDATE don_hang SET ID_TX = null WHERE PK_Id_DonHang = ?";
    await db.query(query, [PK_Id_DonHang]);
  } catch (error) {
    console.log("Lỗi truy vấn");
    throw error;
  }
};

const rejectVehicleStatus = async (Tinh_Trang, PK_Id_Xe) => {
  console.log("PK_Id_Xe: Đang ở service", PK_Id_Xe);
  console.log("Tinh_Trang: Đang ở service", Tinh_Trang);
  console.log("Tinh_Trang: Đang ở service", PK_Id_Xe);
  try {
    const query = "UPDATE xe SET Tinh_Trang = ? WHERE PK_Id_Xe = ?";
    await db.query(query, [Tinh_Trang, PK_Id_Xe]);
  } catch (error) {
    console.log("Lỗi truy vấn update từ chối xe");
    throw error;
  }
};

// Driver Model
const updateDriverStatus = async (Trang_thai, PK_Id_TX) => {
  const query = "UPDATE taixe SET Trang_thai = 'Đang rảnh' WHERE PK_Id_TX = ?";
  await db.query(query, [Trang_thai, PK_Id_TX]);
};

module.exports = {
  LoginDriver,
  getDetailDriver,
  getDetailOrder,
  updateOrder,
  rejectOrder,
  rejectOrderTX,
  updateDriverStatus,
  rejectVehicleStatus,
};
