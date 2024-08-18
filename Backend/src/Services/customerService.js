const customerModel = require("../Models/customersModel");

const getAllCustomersService = async () => {
    try {
        const customers = await customerModel.getAllCustomers();
        return customers;
    }
    catch (error) {
        throw error;
    }
}


const getinforCustomerByID = async (id) => {
    try {
        const customer = await customerModel.getinforCustomerByID(id);
        return customer;
    }
    catch (error) {
        throw error;
    }
}

module.exports =
{
 getAllCustomersService,
 getinforCustomerByID
};
