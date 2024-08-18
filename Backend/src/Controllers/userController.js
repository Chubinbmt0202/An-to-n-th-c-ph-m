// src/Controllers/userController.js
const userService = require("../Services/userService");
const { registerUser, loginUser, getDriverService } = require("../Services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

const createUser = async (req, res) => {
  try {
    console.log("Registering user:", req.body);

    const { Username, PassWord, SDT, ID_role } = req.body;

    // Validation checks
    if (!Username || !PassWord || !SDT) {
      throw new Error("Username, password, and SDT are required.");
    }

    if (PassWord.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    const userId = await registerUser({
      Username: Username,
      PassWord: PassWord,
      SDT: SDT,
      ID_role: ID_role,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      userId: userId,
    });
  } catch (error) {
    console.error("Error during registration:", error);

    if (error.message === "Username, password, and SDT are required.") {
      res.status(400).json({ success: false, message: error.message });
    } else if (error.message === "Password must be at least 6 characters long.") {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
};

const login = async (req, res) => {
  try {
    const { Username, PassWord } = req.body;
    console.log("Logging in user:", req.body);

    if (!Username || !PassWord) {
      throw new Error("Username and password are required.");
    }

    const user = await loginUser({ Username, PassWord });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error during login:", error);

    if (error.message === 'Username and password are required.' || error.message === 'Invalid username or password.') {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
};

const getDriverIdleController = async (req, res) => {
  try {
    const drivers = await getDriverService();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving drivers", error });
  }
}


const deleteUserAccount = async (req,res) =>
  {
    const { id } = req.params;
    try
    {
        await userService.deleteUserAccount(id);
        res.json({ message: "User deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting User", error });
      }
  }

module.exports = {
  getUsers,
  createUser,
  login,
  getDriverIdleController,
  deleteUserAccount,
};
