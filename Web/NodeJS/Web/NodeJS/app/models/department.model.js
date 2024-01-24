const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const Department = function(department){
    this.depart_name = department.depart_name;
    this.role_id = department.role_id;
}

Department.getDepartment = (id,result) => {
    sql.query("SELECT * FROM department WHERE id = ?",[id],(err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    });
}


Department.updateDepartment = (id,newDepartName,result)=>{
    sql.query('SELECT * FROM department WHERE id=?',[id],
    (err,res)=>{
        if(err){
            console.log("Query error: " + err);
               result(err, null);
               return;
        }else{
            sql.query('UPDATE department SET depart_name=? WHERE id=?',[newDepartName,id]
                ,(err,res)=>{
                if(err){
                    console.log("Query error: " + err);
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }
                console.log("Updated Department Id: ", { id: id, Department:newDepartmentName });
                result(null, { id: id, Department:newDepartmentName });
            })
        }
    })
}

Department.addDepartment = (DepartmentObj,result) => {
    sql.query('INSERT INTO department SET ?',DepartmentObj,(err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, {id:res.insertId, ...DepartmentObj});
        console.log("Created Department:", {id:res.insertId, ...DepartmentObj});
    })
}

Department.deleteDepartment = (id,result) => {
    sql.query("DELETE FROM department WHERE id=?",[id],(err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Deleted Department id: " + id);
        result(null, {id: id});
    })
}

module.exports = Department;