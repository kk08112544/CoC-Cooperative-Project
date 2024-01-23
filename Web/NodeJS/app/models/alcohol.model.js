const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const Alcohol = function(alcohol){
    this.alcohol_zone = alcohol.alcohol_zone;
    this.img = alcohol.img;
    this.detect = alcohol.detect;
    this.status = alcohol.status;
}

Alcohol.getAlcohol = (result)=>{
    sql.query("SELECT * FROM alcohol", (err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    });
}

Alcohol.addAlcohol = (AlcoholObj,result)=>{
    sql.query("INSERT INTO alcohol SET ?", AlcoholObj,(err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, {id:res.insertId, ...AlcoholObj});
        console.log("Created Alcohol:", {id:res.insertId, ...AlcoholObj});
    });
}

const removeOldImage = (id, result) => {
    sql.query("SELECT * FROM alcohol WHERE id=?", [id], (err, res)=>{
        if(err){
            console.log("error:" + err);
            result(err, null);
            return;
        }
        if(res.length){
            let filePath = __basedir + "/assets/" + res[0].img;
            try {
                if(fs.existsSync(filePath)){
                    fs.unlink(filePath, (e)=>{
                        if(e){
                            console.log("Error: " + e);
                            return;
                        }else{
                            console.log("File: " + res[0].img + " was removed");
                            return;
                        }
                    });
                }else {
                    console.log("File: " + res[0].img + " not found.")
                    return;
                }
            } catch (error) {
                console.log(error);
                return;
            }
        }
    });
};


Alcohol.updateAlcohol = (id,data,result) => {
    if (data.img){
        removeOldImage(id);
    }

    const updateFields = ['alcohol_zone'];
    const updateValues = [data.alcohol_zone];

    if(data.img){
        updateFields.push('img');
        updateValues.push(data.img);
    }

    sql.query(`UPDATE alcohol SET ${updateFields.map(field => `${field}=?`).join(',')} WHERE id=?`,[...updateValues,id],
    (err,res)=>{
        if (err) {
            console.log("Error: " + err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            // No record updated
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Update Alcohol: " + { id: id, ...data });
        result(null, { id: id, ...data });
    })
}

Alcohol.deleteAlcoholId = (id, result)=>{
    removeOldImage(id);
    sql.query("DELETE FROM alcohol WHERE id=?",[id],(err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Deleted Alcohol id: " + id);
        result(null, {id: id});
    })
}

Alcohol.updateStatusAlcoholById = (id,newStatus,result)=>{
    sql.query('UPDATE alcohol SET status=? WHERE id=?',[newStatus,id],
    (err,res)=>{
        if (err) {
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Updated Status Alcohol Id: ", { id: id, Status:newStatus });
        result(null, { id: id, Status:newStatus });
    })
}

Alcohol.updateDetectAlcoholById = (id,newDetect,result)=>{
    sql.query('SELECT * FROM alcohol WHERE id=?',[id],(err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }else if(res[0].detect==newDetect){
            console.log("Same Detect");
        }else{
            sql.query('UPDATE alcohol SET detect=? WHERE id=?',[newDetect,id],
            (err,res)=>{
                if (err) {
                    console.log("Query error: " + err);
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }
                console.log("Updated Detection Alcohol Id: ", { id: id, Detection:newDetect });
                result(null, { id: id, Detection:newDetection });
            })
        }
    })

}


module.exports = Alcohol;