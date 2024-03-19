const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const History = function(history){
    this.alcohol_id = alcohol.alcohol_id;
    this.detect = alcohol.detect;
    this.date = alcohol.date;
    this.times = alcohol.times;
}

History.getHistory = (result) => {
    sql.query('(SELECT AH.id, AH.alcohol_id, A.room, AH.detect, AH.date, AH.times FROM AlcoholHistory AH LEFT JOIN alcohol A ON AH.alcohol_id = A.id WHERE AH.alcohol_id NOT IN ( SELECT alcohol_id FROM AlcoholHistoryRead ) LIMIT 25);',(err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    })
}
module.exports = History;