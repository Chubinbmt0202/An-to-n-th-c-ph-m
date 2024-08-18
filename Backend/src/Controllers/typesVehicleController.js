const typesVehicleService = require('../Services/typesVehicleService');

const getAllVehicleTypes = async (req, res) => {
    try {
        const vehicleTypes = await typesVehicleService.getAllVehicleTypes();
        console.log('Vehicle types: ', vehicleTypes);   
        res.json(vehicleTypes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving vehicle types', error });
    }
};

module.exports = {
    getAllVehicleTypes
};