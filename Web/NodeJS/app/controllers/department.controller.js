const Department = require("../models/department.model")
const bcrypt = require("bcryptjs");

const getAllDepartment = (req,res) => {
    Department.getAllDepartment((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

const getAllDepartmentById = (req,res) => {
    const role_id =req.params.role_id;
    Department.getDepartmentById(role_id,(err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

const getRoleById = (req,res) => {
    const id = req.params.id;
    Department.getRoleId(id,(err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}



const updateToDepartment = (req,res) => {
    const id = req.params.id;
    if(!req.body.depart_name){
        res.status(400).send({message: "Content can not be empty."});
    }
 
    const newDepartName=req.body.depart_name
    Department.updateByDepartmentId( id, newDepartName,(err,result)=>{
        if(err) {
            if (err.kind == "not_found") {
                res.status(401).send({
                  message: "Not found Role id: " + req.params.id,
                });
              } else {
                res.status(500).send({
                  message: "Error updating Department Name by id: " + req.params.id,
                });
            }
        }
        else res.send(result);
    })
}

const  addToDepartment = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const DepartmentObj = new Department({
       depart_name: req.body.depart_name,
       role_id:req.body.role_id,
    });
    Department.addDepartment(DepartmentObj,(err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating"});
        }else res.send(data);
    })
}

const deleteToDepartment = (req, res) => {
    const id = req.params.id; // เปลี่ยนชื่อตัวแปรเพื่อไม่ให้ซ้ำกับ res ใน callback ด้านล่าง
    Department.deleteDepartmentById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Department id: " + req.params.id,
                });
            } else {
                res.status(500).send({
                    message: "Error deleting Department id: " + req.params.id,
                });
            }
        } else {
            res.send(data);
        }
    });
};


module.exports = {
    getAllDepartmentById ,
    getRoleById,
    updateToDepartment,
    addToDepartment,
    deleteToDepartment,
    getAllDepartment,
}