const trafficModel = require("../Models/trafficModel");

const getAllTraffics = async () => {
  try {
    const traffics = await trafficModel.getAllTraffics();
    return traffics;
  } catch (error) {
    throw error;
  }
};

const addTrafficsService = async ({ Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe }) => {
  if (!Bien_so || !Suc_Chua || !Chieu_dai || !Ngay_DK || !Ngay_Het_DK || !Chieu_rong || !Chieu_cao || !ten_loai_xe || !Hang_xe) {
    throw new Error("All fields are required.");
  }
  try {
    const trafficId = await trafficModel.addTraffics(Bien_so, Suc_Chua, Tinh_Trang, Chieu_dai, Ngay_DK, Ngay_Het_DK, Chieu_rong, Chieu_cao, ten_loai_xe, Hang_xe);
    return trafficId;
  } catch (error) {
    throw error;
  }
};

const getTrafficById = async (id) => {
  try {
    const traffic = await trafficModel.getTrafficById(id);
    return traffic;
  } catch (error) {
    throw error;
  }
};

const deleteTrafficService = async (id) => {
  try {
    await trafficModel.deleteTrafficById(id);
    return { message: "Traffic deleted successfully." };
  } catch (error) {
    throw error;
  }
};

const updateTrafficService = async (id, updatedTrafficData) => {
  try {
      await trafficModel.updateTrafficById(id, updatedTrafficData);
      return { message: "Traffic updated successfully." };
  } catch (error) {
      throw error;
  }
};

const searchTrafficByLicensePlateService = async (licensePlate) => {
  try {
      const traffics = await trafficModel.searchTrafficByLicensePlate(licensePlate);
      return traffics;
  } catch (error) {
      throw error;
  }
};

const getVehicleIdleService = async () => {
  try {
      const vehicles = await trafficModel.getVehicleIdle();
      return vehicles;
  } catch (error) {
      throw error;
  }
}

module.exports = {
  getAllTraffics,
  addTrafficsService,
  getTrafficById,
  deleteTrafficService,
  updateTrafficService,
  searchTrafficByLicensePlateService,
  getVehicleIdleService
};
