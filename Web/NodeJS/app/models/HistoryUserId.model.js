const sql = require("./db");
const jwt = require("jsonwebtoken");
const scKey = require("../config/jwt.config");
const bcrypt = require("bcryptjs/dist/bcrypt");
const expireTime = "2h"; //token will expire in 2 hours
const fs = require("fs");

const HistoryUserId = function(historyuserid){
    this.alcohol_id = historyuserid.alcohol_id;
    this.detect = historyuserid.detect;
    this.date = historyuserid.date;
    this.times = historyuserid.times;
    this.user_id = historyuserid.user_id;
}

HistoryUserId.getHistoryUserId = (id,result) => {
    sql.query("SELECT DISTINCT ah.id, ah.alcohol_id, a.room, ah.detect, ah.date, ah.times
    FROM AlcoholHistoryRead AS ahr
    INNER JOIN (
        SELECT ah.alcohol_id
        FROM AlcoholHistoryRead AS ahr1
        INNER JOIN AlcoholHistory AS ah ON ahr1.alcohol_id = ah.alcohol_id
        WHERE ahr1.user_id != 1
        AND ah.alcohol_id NOT IN (
            SELECT ahr2.alcohol_id
            FROM AlcoholHistoryRead AS ahr2
            WHERE ahr2.user_id = 1
            GROUP BY ahr2.alcohol_id
            HAVING COUNT(*) > 1
        )
    ) AS filtered_alcohols ON ahr.alcohol_id = filtered_alcohols.alcohol_id
    INNER JOIN alcohol AS a ON ahr.alcohol_id = a.id
    INNER JOIN AlcoholHistory AS ah ON ah.alcohol_id = ahr.alcohol_id
    WHERE ahr.user_id != 1
    AND NOT EXISTS (
        SELECT 1
        FROM AlcoholHistoryRead AS ahr3
        WHERE ahr3.alcohol_id = ahr.alcohol_id
        AND ahr3.user_id = 1
    )",(err,res)=>{
        if(err){
            console.log("Query err: " + err);
            result(err,null);
            return;
        }
        result(null, res);
    })
}

History.create = (id,result) => {

}

module.exports =HistoryUserId;