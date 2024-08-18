const employeeService = require("../Services/employeeService");


const getAllDriver = async (req, res) => {
    try {
        const driver = await employeeService.getAllDriver();
        res.json(driver);
    }
    catch (error) {
        res.status(500).json({ message: "Error getting all Driver", error });
    }
}
const getAllEmployee = async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployee();
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({ message: "Error getting all Employee", error });
    }
}

const updateEmployee = async (req,res) =>
    {

        const { id } = req.params;
        try
        {
            await employeeService.updateEmployee(id);
            res.json({ message: "Employee update successfully." });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting Employee", error });
          }
    }


const addDriver  = async (req,res) => 
    {
        const id_tk = parseInt(req.body.Id_TK);
        const {Ten_TX,SDT,Email,NgaySinh,GioiTinh,Tinh_Trang} = req.body;
        console.log(req.body);
        try
        {
            const driver = await employeeService.addDriverService(
                {
                    Ten_TX:Ten_TX,
                    SDT:SDT,
                    Email:Email,
                    NgaySinh:NgaySinh,
                    GioiTinh:GioiTinh,
                    Tinh_Trang:Tinh_Trang,
                    Id_TaiKhoan:id_tk,
                } );
                res.json(driver);
        }
        catch (error)
        {
            res.status(500).json({ message: "Error adding Driver", error });
        }
    }

const getInforDriverByID  = async(req,res) =>
    {
        try{
            const {id} = req.params;
            const infordriver  = await employeeService.getInforDriverByID(id);
            res.json(infordriver);
        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({message : "Error retrieving inforDriver",error});
        }

        
    }

const updateDriverByID  = async (req,res) =>
    {
        const { id } = req.params;
        try
        {
            await employeeService.sevicUpdateDriverByID(id);
            res.json({ message: "Employee update successfully." });
        }
        catch (error) {
            res.status(500).json({ message: "Error update Employee", error });
          }
    }

module.exports = 
{
    getAllDriver,
    getAllEmployee,
    updateEmployee,
    addDriver,
    getInforDriverByID,
    updateDriverByID,
}