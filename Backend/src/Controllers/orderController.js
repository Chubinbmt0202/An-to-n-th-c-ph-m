const orderService = require('../Services/orderService');

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving orders", error });
    }
};

const createFile = async (req, res) => {
    console.log(";;;;;;;;;;;", req.body)
    try {
        const fileCreated = await orderService.CreateFileService();
        res.json(fileCreated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving orders", error });
    }
};

const getDetailOrderByID = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderService.getDetailOrderByID(id);
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving order", error });
    }
}

const updateOrderController = async (req, res) => {
    console.log("body", req.body)
    const { orderId, deliveryDate, driverId, vehicleId, addressCustomer } = req.body;
    let dateString = deliveryDate.substring(0, 10);
    console.log('orderId, deliveryDate, driverId, vehicleId:', orderId, dateString, driverId, vehicleId);

    try {
        await orderService.updateOrder(orderId, dateString, driverId, vehicleId, addressCustomer);
        res.status(200).send({ message: 'Order updated successfully' });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send({ message: 'Failed to update order' });
    }
}

const getOrderByIdKH = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderService.getOrderByIdKH(id);
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving order", error });
    }
}

const getOrderDetailFinishedController = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderService.getOrderDetailFinisedService(id);
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving order", error });
    }
}

const getOrderFileUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderService.getOrderUpdateFile(id);
        res.json(order);
        console.log("Update thành công", order)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving order", error });
    }
}

const rejectOrderControllerV = async (req, res) => {
    const { id } = req.params; // Lấy idHoSo từ URL parameters
    const { noiDungTuChoi, nguoiXuLy } = req.body; // Lấy thông tin từ body
    console.log(req.body)
    if (!id || !noiDungTuChoi || !nguoiXuLy) {
        return res.status(400).json({ message: 'Thiếu thông tin cần thiết.' });
    }

    try {
        await orderService.rejectOrderService(id, noiDungTuChoi, nguoiXuLy);
        res.status(200).json({ message: 'Đơn hàng đã bị từ chối thành công.' });
    } catch (error) {
        console.error('Lỗi khi từ chối đơn hàng: ', error);
        res.status(500).json({ message: 'Không thể xử lý yêu cầu từ chối đơn hàng.', error: error.message });
    }
};

const reasonRejectController = async (req, res) => {
    const { id } = req.params;
    console.log("id trong laays reason", id)
    try {
        const rejectData = await orderService.getReasonReject(id)
        console.log("Update thành công", rejectData)
        res.json(rejectData);
    } catch (error) {
        console.log("lỗi khi load thông tin từ chối")
    }
}

module.exports = {
    getAllOrders,
    getDetailOrderByID,
    updateOrderController,
    getOrderByIdKH,
    getOrderDetailFinishedController,
    getOrderFileUpdate,
    rejectOrderControllerV,
    reasonRejectController,
    createFile
};