const HistoryUserId = require('../models/HistoryUserId.model');
const bcrypt = require("bcryptjs");

const getHistoryUserId = (req,res) => {
    HistoryUserId.getHistoryUserId((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

module.exports = {
    getHistoryUserId,
}