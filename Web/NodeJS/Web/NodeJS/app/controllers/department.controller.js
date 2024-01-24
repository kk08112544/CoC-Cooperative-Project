const Department = require("../models/department.model")
const bcrypt = require("bcryptjs");

const getAllDepartment = (req,res) => {
    const id =req.params.id;
    Department.getDepartment(id,(err,data)=>{
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
    newDepartName:req.body.depart_name
    Department.updateDepartment(id,newDepartName,(err,data)=>{
        if(err) {
            if (err.kind == "not_found") {
                res.status(401).send({
                  message: "Not found Department id: " + req.params.id,
                });
              } else {
                res.status(500).send({
                  message: "Error updating Department id: " + req.params.id,
                });
            }
        }
        else res.send(data);
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

const deleteToDepartment = (req,res)=>{
    const id = req.params.id;

    Department.deleteDepartment(id,(err,result)=>{
        if(err){
            if (err.kind == "not_found") {
                res.status(401).send({
                  message: "Not found Alcohol id: " + req.params.id,
                });
              } else {
                res.status(500).send({
                  message: "Error delete Alcohol id: " + req.params.id,
                });
            }
        }
    })
}

module.exports = {
    getAllDepartment,
    updateToDepartment,
    addToDepartment,
    deleteToDepartment,
}