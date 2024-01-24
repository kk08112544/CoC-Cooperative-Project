const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const Roles = function(roles){
    this.role_name = roles.role_name;
}

Roles.getRoles = (result)=>{
    sql.query("SELECT * FROM role",(err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    })
}

Roles.updateByRolesId = (id,newRoleName,result)=>{
    sql.query('SELECT * FROM role WHERE id=?',[id],
    (err,res)=>{
        if(err){
            console.log("Query error: " + err);
               result(err, null);
               return;
        }else{
            sql.query('UPDATE role SET role_name=? WHERE id=?',[newRoleName,id]
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
                console.log("Updated Role Id: ", { id: id, Role:newRoleName });
                result(null, { id: id, Role:newRoleName });
            })
        }
    })
}

Roles.create = (RolesObj,result)=>{
    sql.query("INSERT INTO role SET ?",RolesObj,(err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, {id:res.insertId, ...RolesObj});
        console.log("Cart:", {id:res.insertId, ...RolesObj});
    })
}

Roles.deleteRolesById = (id,result)=>{
    sql.query("DELETE FROM department WHERE role_id = ?",[id],
    (err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) {
            result({ kind: "not_found"},null);
            return;
        }
        sql.query("DELETE FROM role WHERE id = ?",[id],
        (err,res)=>{
            if (err){
                console.log("Query error:" +err);
                result(err,null);
                return;
            }
            if (res.affectedRows == 0){
                result({ kind: "not_found"},null);
                return;
            }
            console.log("Delete Roles Id: ", { id: id});
            result(null, { id: id});
        })
    })
}


module.exports = Roles