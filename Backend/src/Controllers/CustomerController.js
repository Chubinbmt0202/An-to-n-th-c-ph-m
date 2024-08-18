const customerService = require("../Services/customerService");

const getAllCustomersController = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomersService();
        console.log("lấy thông tin tài khoản", customers)
        res.json(customers);
    }
    catch (error) {
        res.status(500).json({ message: "Error getting all Customers", error });
    }
}

const getinforCustomerByID = async (req, res) => {
    const id = req.params.id;
    try {
        const customers = await customerService.getinforCustomerByID(id);
        res.json(customers);
    }
    catch (error) {
        res.status(500).json({ message: "Error searching Customer by id", error });
    }
}
module.exports = {
    getAllCustomersController,
    getinforCustomerByID
};