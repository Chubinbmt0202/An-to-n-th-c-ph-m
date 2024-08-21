// src/Services/userService.js
const userModel = require("../Models/userModel");
const { findUserByUsername, getDriverModel } = require("../Models/userModel");

const getUsers = async () => {
  try {
    const users = await userModel.getAllUsers();
    return users;
  } catch (error) {
    throw error;
  }
};

const registerUser = async ({ Username, PassWord, SDT, ID_role }) => {
  if (!Username || !PassWord || !SDT) {
    throw new Error("Username, password, and SDT are required.");
  }

  if (PassWord.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }
  try {
    const userId = await userModel.addUser({
      Username: Username,
      PassWord: PassWord,
      SDT: SDT,
      ID_role: ID_role || "1", // Default role
      Trang_Thai: "1",
    });

    return userId;
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ Username, PassWord }) => {
  if (!Username || !PassWord) {
    throw new Error("Cccd and password are required.");
  }

  const user = await findUserByUsername(Username); // Truy vấn dựa trên Cccd
  console.log("log ra tài khoản", user)
  if (!user) {
    throw new Error("Invalid Cccd.");
  }

  if (PassWord !== user.MatKhau) {
    throw new Error("Invalid Cccd or password.");
  }

  if (user.IDChucvu == 3) {
    throw new Error("Tài khoản này không có tồn tại")
  }

  // Return user details or a token
  return { id: user.IDChucvu, Username: user.HoTen, SDT: user.SDT, ID_role: user.ID_role };
};

const getDriverService = async () => {
  try {
    const drivers = await getDriverModel();
    return drivers;
  } catch (error) {
    throw error;
  }
}

const deleteUserAccount = async (id) => {
  try {
    await userModel.deleteUserAccount(id);
    return { message: "Account deleted successfully." };
  }
  catch (error) {
    throw (error)
  }
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  getDriverService,
  deleteUserAccount
};
