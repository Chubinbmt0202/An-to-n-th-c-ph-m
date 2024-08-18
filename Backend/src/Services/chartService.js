const charmodel = require("../Models/charModel");

const getAllDataShipper = async () => {
    try {
        const reportShipers = await charmodel.getAllDataShipper();
        return reportShipers;
    }
    catch (error) {
        throw error;
    }
}

module.exports =
{
    getAllDataShipper
};