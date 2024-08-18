const driverService = require('../Services/driverService');

const loginDriverController = async (req, res) => {
    const { SDT, PassWord, ID_role } = req.body;
    console.log(req.body)
    console.log(SDT, PassWord, ID_role)
    try {
        const driver = await driverService.loginDriverService(SDT, PassWord, ID_role);
        console.log(";ls;dsds", driver)
        if (driver) {
            res.json({ success: true, user: driver });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in driver", error });
    }
}

const getDetailDriverController = async (req, res) => {
    const { SDT } = req.body;
    try {
        const driver = await driverService.getDetailDriverService(SDT);
        if (driver) {
            res.json(driver);
        } else {
            res.status(404).json({ message: "Driver not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error getting driver details", error });
    }
}

const getDetailOrderController = async (req, res) => {
    const { PK_Id_DonHang, ID_TX } = req.params;
    try {
        const order = await driverService.getDetailOrderService(PK_Id_DonHang, ID_TX);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error getting order details", error });
    }
}

const confirmOrderController = async (req, res) => {
    const { PK_Id_DonHang } = req.body;
    console.log(req.body)
    try {
        await driverService.confirmOrderService(PK_Id_DonHang);
        res.status(200).send({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send({ message: 'Failed to update order' });
    }
}

const rejectOrderController = async (req, res) => {
    const { PK_Id_DonHang, ID_TX, vehicleId } = req.body;
    console.log("từ chối đơn hàng: ", req.body)
    console.log("reject : ", PK_Id_DonHang)
    console.log("reject : ", vehicleId)
    console.log("reject : ", ID_TX)
    try {
        await driverService.rejectOrderService(PK_Id_DonHang, ID_TX, vehicleId);
        res.status(200).send({ message: 'Cập nhật lại trạng thái từ chối thành công' });
    } catch (error) {
        console.error('Error reject order:', error);
        res.status(500).send({ message: 'Failed to reject order' });
    }
}
module.exports = {
    loginDriverController,
    getDetailDriverController,
    getDetailOrderController,
    confirmOrderController,
    rejectOrderController
};