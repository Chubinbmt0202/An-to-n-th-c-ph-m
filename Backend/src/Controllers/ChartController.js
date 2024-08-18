const charServive = require("../Services/chartService");

const getAllDataShipper = async (req, res) => {
    try {
        const reportShipers = await charServive.getAllDataShipper();
        res.json(reportShipers);
    }
    catch (error) {
        res.status(500).json({ message: "Error getting all Shipper Report", error });
    }

}

module.exports =
{
    getAllDataShipper
}