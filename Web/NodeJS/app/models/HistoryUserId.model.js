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

HistoryUserId.getHistoryUserId = (user_id, result) => {
    sql.query(
        "SELECT DISTINCT ah.id, ah.alcohol_id, a.room, ah.detect, ah.date, ah.times " +
        "FROM AlcoholHistoryRead AS ahr " +
        "INNER JOIN (SELECT ah.alcohol_id " +
        "            FROM AlcoholHistoryRead AS ahr1 " +
        "            INNER JOIN AlcoholHistory AS ah ON ahr1.alcohol_id = ah.alcohol_id " +
        "            WHERE ahr1.user_id != ? " +
        "              AND ah.alcohol_id NOT IN (SELECT ahr2.alcohol_id " +
        "                                      FROM AlcoholHistoryRead AS ahr2 " +
        "                                      WHERE ahr2.user_id = ? " +
        "                                      GROUP BY ahr2.alcohol_id " +
        "                                      HAVING COUNT(*) > 1)) AS filtered_alcohols " +
        "       ON ahr.alcohol_id = filtered_alcohols.alcohol_id " +
        "INNER JOIN alcohol AS a ON ahr.alcohol_id = a.id " +
        "INNER JOIN AlcoholHistory AS ah ON ah.alcohol_id = ahr.alcohol_id " +
        "WHERE ahr.user_id != ? " +
        "  AND NOT EXISTS (SELECT 1 " +
        "                  FROM AlcoholHistoryRead AS ahr3 " +
        "                  WHERE ahr3.alcohol_id = ahr.alcohol_id " +
        "                    AND ahr3.user_id = ?) " +
        "UNION " +
        "(SELECT AH.id, AH.alcohol_id, A.room, AH.detect, AH.date, AH.times " +
        " FROM AlcoholHistory AH " +
        " LEFT JOIN alcohol A ON AH.alcohol_id = A.id " +
        " WHERE AH.alcohol_id NOT IN (SELECT alcohol_id FROM AlcoholHistoryRead) " +
        " LIMIT 25);",
        [user_id, user_id, user_id, user_id],
        (err, res) => {
            if (err) {
                console.log("Query err: " + err);
                result(err, null);
                return;
            }
            result(null, res);
        }
    );
};

HistoryUserId.gettotalHistoryUserId = (user_id, result) => {
    sql.query("SELECT COUNT(*) AS total_notifications FROM (SELECT DISTINCT ah.id, ah.alcohol_id, a.room, ah.detect, ah.date, ah.times " +
    "FROM AlcoholHistoryRead AS ahr " +
    "INNER JOIN (SELECT ah.alcohol_id " +
    "            FROM AlcoholHistoryRead AS ahr1 " +
    "            INNER JOIN AlcoholHistory AS ah ON ahr1.alcohol_id = ah.alcohol_id " +
    "            WHERE ahr1.user_id != ? " +
    "              AND ah.alcohol_id NOT IN (SELECT ahr2.alcohol_id " +
    "                                      FROM AlcoholHistoryRead AS ahr2 " +
    "                                      WHERE ahr2.user_id = ? " +
    "                                      GROUP BY ahr2.alcohol_id " +
    "                                      HAVING COUNT(*) > 1)) AS filtered_alcohols " +
    "       ON ahr.alcohol_id = filtered_alcohols.alcohol_id " +
    "INNER JOIN alcohol AS a ON ahr.alcohol_id = a.id " +
    "INNER JOIN AlcoholHistory AS ah ON ah.alcohol_id = ahr.alcohol_id " +
    "WHERE ahr.user_id != ? " +
    "  AND NOT EXISTS (SELECT 1 " +
    "                  FROM AlcoholHistoryRead AS ahr3 " +
    "                  WHERE ahr3.alcohol_id = ahr.alcohol_id " +
    "                    AND ahr3.user_id = ?) " +
    "UNION " +
    "(SELECT AH.id, AH.alcohol_id, A.room, AH.detect, AH.date, AH.times " +
    " FROM AlcoholHistory AH " +
    " LEFT JOIN alcohol A ON AH.alcohol_id = A.id " +
    " WHERE AH.alcohol_id NOT IN (SELECT alcohol_id FROM AlcoholHistoryRead) " +
    " LIMIT 25))AS subquery_count;",[user_id, user_id, user_id, user_id],
    (err, res) => {
        if (err) {
            console.log("Query err: " + err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}



HistoryUserId.create = (newHistory,result) => {
    sql.query("INSERT INTO AlcoholHistoryRead SET ?",newHistory,(err,res)=>{
        if(err){
            console.log("Query error: " + err);
            result(err, null);
            return;
        }
    })
}


module.exports =HistoryUserId;