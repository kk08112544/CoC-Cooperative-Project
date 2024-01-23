const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const Notify = function(notify){
    this.alcohol_zone = notify.alcohol_zone;
    this.img = notify.img;
    this.detect = notify.detect;
    this.status = notify.status;
}

Notify.Less = (result) => {
    sql.query("SELECT * FROM alcohol WHERE detect != 1",(err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    })
}


module.exports = Notify;