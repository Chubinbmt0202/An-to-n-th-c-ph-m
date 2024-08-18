const trafficService = require("../Services/trafficService");

const getAllTraffics = async (req, res) => {
  try {
    const traffics = await trafficService.getAllTraffics();
    res.json(traffics);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving traffics", error });
  }
};

const addTrafficsController = async (req, res) => {
  console.log(req.body);
  const Suc_Chua = parseInt(req.body.Suc_Chua);
  const Chieu_dai = parseFloat(req.body.Chieu_dai);
  const Chieu_rong = parseFloat(req.body.Chieu_rong);
  const Chieu_cao = parseFloat(req.body.Chieu_cao);

  const { Bien_so, Tinh_Trang, Ngay_DK, Ngay_Het_DK, ten_loai_xe, Hang_xe } = req.body;
  try {
    const traffic = await trafficService.addTrafficsService({
      Bien_so: Bien_so,
      Hang_xe: Hang_xe,
      Suc_Chua: Suc_Chua,
      Tinh_Trang: Tinh_Trang,
      Chieu_dai: Chieu_dai,
      Chieu_rong: Chieu_rong,
      Chieu_cao: Chieu_cao,
      ten_loai_xe: ten_loai_xe,
      Ngay_DK: Ngay_DK,
      Ngay_Het_DK: Ngay_Het_DK,
    });
    res.json(traffic);
  } catch (error) {
    res.status(500).json({ message: "Error adding traffic", error });
  }
};

const getTrafficById = async (req, res) => {
  try {
    const traffic = await trafficService.getTrafficById(req.params.id);
    res.json(traffic);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving traffic details", error });
  }
};

const deleteTrafficController = async (req, res) => {
  try {
    await trafficService.deleteTrafficService(req.params.id);
    res.json({ message: "Traffic deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting traffic", error });
  }
};

const updateTrafficController = async (req, res) => {
  const { id } = req.params;
  const updatedTrafficData = req.body;
  try {
    await trafficService.updateTrafficService(id, updatedTrafficData);
    res.json({ message: "Traffic updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating traffic", error });
  }
};

const searchTrafficByLicensePlateController = async (req, res) => {
  const licensePlate = req.params.licensePlate;
  try {
      const traffics = await trafficService.searchTrafficByLicensePlateService(licensePlate);
      res.json(traffics);
  } catch (error) {
      res.status(500).json({ message: "Error searching traffic by license plate", error });
  }
};

const getVehicleIdleController = async (req, res) => {
  try {
    const traffics = await trafficService.getVehicleIdleService();
    res.json(traffics);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving idle vehicles", error });
  }
}

module.exports = {
  getAllTraffics,
  addTrafficsController,
  getTrafficById,
  deleteTrafficController,
  updateTrafficController,
  searchTrafficByLicensePlateController,
  getVehicleIdleController
};
