const orderModel = require('../Models/orderModel');

const getAllOrders = async () => {
    try {
        const orders = await orderModel.getAllOrders();
        return orders;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getReasonReject = async (id) => {
    try {
        const orderRejectReason = await orderModel.getReasonReject(id)
        console.log("Lấy id service", orderRejectReason)
        return orderRejectReason
    } catch (error) {
        console.log(error)
        throw error
    }
}

const rejectOrderService = async (idHoSo, noiDungTuChoi, nguoiXuLy) => {
    try {
        // Gọi hàm mô-đun để xử lý việc từ chối đơn hàng
        const reject = await orderModel.rejectOrderModel(idHoSo, noiDungTuChoi, nguoiXuLy);
        console.log("iddddđ", idHoSo)
        console.log('Đơn hàng đã bị từ chối thành công.');
        return reject
    } catch (error) {
        console.error('Lỗi khi từ chối đơn hàng: ', error);
        throw new Error('Không thể xử lý yêu cầu từ chối đơn hàng.');
    }
};

const getDetailOrderByID = async (id) => {
    try {
        const order = await orderModel.getDetailOrderByID(id);
        console.log("?>>>?<>>??>?>?>?>?>?>", order)
        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateOrder = async (orderId, deliveryDate, driverId, vehicleId, addressCustomer) => {
    try {
        await orderModel.updateOrderDeliveryDate(orderId, deliveryDate);
        await orderModel.updateDriverStatus(driverId, 'Đang bận');
        await orderModel.updateVehicleStatus(vehicleId, 'Đang giao');
        await orderModel.updateOrderDriver(orderId);
        await orderModel.updateOrderDateDevivery(deliveryDate, orderId);
        await orderModel.updateOrderAddress(addressCustomer, orderId);
        await orderModel.addVehicleId(vehicleId, orderId);
        await orderModel.updateOrderDriverID(driverId, orderId);
    } catch (error) {
        console.log("Lỗi truy service updateOrder", error);
        throw error;
    }
}

const CreateFileService = async () => {
    try {
        const orders = await orderModel.createFileModel();
        return orders;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getOrderByIdKH = async (id) => {
    try {
        const orders = await orderModel.getOrderByIdKH(id);
        return orders;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getOrderDetailFinisedService = async (id) => {
    try {
        const order = await orderModel.getOrderDetailFinished(id);
        return order;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getOrderUpdateFile = async (id) => {
    try {
        console.log("id services", id)
        const updateOrder = await orderModel.updateFile(id);
        console.log("serrvice >>>>>>>>>", updateOrder)
        return updateOrder

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getAllOrders,
    getDetailOrderByID,
    updateOrder,
    getOrderByIdKH,
    getOrderDetailFinisedService,
    getReasonReject,
    getOrderUpdateFile,
    rejectOrderService,
    CreateFileService
};