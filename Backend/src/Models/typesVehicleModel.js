const db = require("../Configs/database");

const getAllVehicleTypes = async () => {
    const [rows, fields] = await db.query('SELECT Ten_Loai_Xe, Hang_xe FROM loaixe');
    return rows;
};

module.exports = {
    getAllVehicleTypes
};
