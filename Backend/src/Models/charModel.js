const db = require('../Configs/database');


const getAllDataShipper = async () => {
    const [rows, fields] = await db.query(`SELECT 
    TaiXe.PK_Id_TX,
    MAX(TaiXe.Ten_TX) as TenTX,
    MAX(TaiXe.SDT) as SDT,
    MAX(TaiXe.Email) as Email,
    COUNT(don_hang.PK_ID_DonHang) AS SoLuongDaChay
FROM 
    TaiXe
LEFT JOIN 
    don_hang ON TaiXe.PK_Id_TX = don_hang.ID_TX
GROUP BY 
    TaiXe.PK_Id_TX;`);
    return rows;
}

module.exports = {
    getAllDataShipper
}