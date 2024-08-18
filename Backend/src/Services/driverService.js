const driverModel = require('../Models/driverModel');

const loginDriverService = async (SDT, PassWord, ID_role) => {
    try {
        const driver = await driverModel.LoginDriver(SDT, PassWord, ID_role);
        console.log("Service Driver", driver)
        return driver;
    }
    catch (error) {
        throw error;
    }
}

const getDetailDriverService = async (SDT) => {
    try {
        const driver = await driverModel.getDetailDriver(SDT);
        return driver;
    }
    catch (error) {
        throw error;
    }
}

const getDetailOrderService = async (PK_Id_DonHang, ID_TX) => {
    try {
        const order = await driverModel.getDetailOrder(PK_Id_DonHang, ID_TX);
        return order;
    }
    catch (error) {
        throw error;
    }
}

const confirmOrderService = async (PK_Id_DonHang) => {
    try {
        await driverModel.updateOrder(PK_Id_DonHang);
        console.log("Odder đang ở service");
    } catch (error) {
        console.log("Lỗi truy service updateOrder", error);
        throw error;
    }
}

const rejectOrderService = async (PK_Id_DonHang, ID_TX, PK_Id_Xe) => {
    try {
        await driverModel.rejectOrder(PK_Id_DonHang);
        await driverModel.rejectOrderTX(PK_Id_DonHang);
        await driverModel.updateDriverStatus(ID_TX, 'Đang bận');
        await driverModel.rejectVehicleStatus('Đang chờ', PK_Id_Xe);
        console.log("Odder đang ở service reject");
    } catch (error) {
        console.log("Lỗi truy service rejectOrder", error);
        throw error;
    }
}

module.exports = {
    loginDriverService,
    getDetailDriverService,
    getDetailOrderService,
    confirmOrderService,
    rejectOrderService
};
