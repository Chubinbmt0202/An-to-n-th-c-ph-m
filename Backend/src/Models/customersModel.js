const db = require('../Configs/database');


const getAllCustomers = async () => {
    const [rows, fields] = await db.query(`
        SELECT 
            NGUOIDUNG.HoTen, 
            NGUOIDUNG.Cccd, 
            NGUOIDUNG.Sdt, 
            NGUOIDUNG.MatKhau, 
            CHUCVU.TenChucvu
        FROM 
            NGUOIDUNG
        JOIN 
            CHUCVU ON NGUOIDUNG.IDChucvu = CHUCVU.IDChucvu;
        `);
    return rows;
}

const getinforCustomerByID = async (id) => {
    const [results] = await db.query(`SELECT 
    PK_Ma_KH,
        Ten_KH,
       Email,
      SDT,
        COUNT(don_hang.PK_Id_DonHang) AS SoLuongDonHang
    FROM 
        Khachhang
    LEFT JOIN 
        don_hang ON Khachhang.PK_Ma_KH = don_hang.ID_KH
    WHERE 
        PK_Ma_KH = ?
        
    GROUP BY 
        KhachHang.PK_Ma_KH`, [id]);
    return results[0];

}


module.exports = {
    getAllCustomers,
    getinforCustomerByID
};