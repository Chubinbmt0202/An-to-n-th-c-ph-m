// src/Models/userModel.js
const db = require('../Configs/database');

const getAllUsers = async () => {
    const [rows, fields] = await db.query('SELECT * FROM taikhoan');
    return rows;
};

const addUser = async (user) => {
    const [result] = await db.query('INSERT INTO taikhoan SET ?', user);
    return result.insertId;
};

const findUserByUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM nguoidung WHERE Cccd = ?', [username]);
    console.log(rows[0])
    return rows[0];
};

const getDriverModel = async () => {
    const [rows, fields] = await db.query('SELECT * FROM taixe WHERE Trang_thai = "Đang rảnh"');
    return rows;
};

const deleteUserAccount = async (id) => {
    const [result] = await db.query(`delete from taikhoan where PK_Id_TK = ?`, [id]);
    return result[0];
}

module.exports = {
    getAllUsers,
    addUser,
    findUserByUsername,
    getDriverModel,
    deleteUserAccount,
};
