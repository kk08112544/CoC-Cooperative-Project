const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const Dashboard = function(dashboard){
    this.alcohol_id = dashboard.alcohol_id;
    this.date = dashboard.date;
    this.times = dashboard.times;
    // this.alcohol_zone = dashboard.alcohol_zone;
    // this.detect = dashboard.detect;
}

Dashboard.getAll = (result)=>{
    sql.query("SELECT COUNT(*) as Total FROM notify", (err, res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    });
};

Dashboard.getDay = (result)=>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    sql.query("SELECT COUNT(*) as Total FROM notify WHERE DATE(date) = ?",[formattedDate],(err, res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    });
};

Dashboard.getAllZone = (result) => {
    sql.query("SELECT n.alcohol_id, a.alcohol_zone, COUNT(*) as count FROM notify n JOIN alcohol a ON n.alcohol_id = a.id GROUP BY n.alcohol_id, a.alcohol_zone",(err, res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    });
}

Dashboard.getDayZone = (result) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    sql.query("SELECT a.alcohol_zone, COUNT(*) as count FROM notify n JOIN alcohol a ON n.alcohol_id = a.id WHERE DATE(n.date) = ? GROUP BY a.alcohol_zone",[formattedDate],(err, res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    });
}

Dashboard.getAmount = (result) => {
    sql.query('SELECT * FROM alcohol',(err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    })
}

Dashboard.createNotify = (createNewNotify,result) => {
    sql.query('INSERT INTO notify SET ?',createNewNotify,(err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
        result(null, {id:res.insertId, ...createNewNotify});
        console.log("Cart:", {id:res.insertId, ...createNewNotify});
    })
}

module.exports = Dashboard;