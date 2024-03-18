const History = require("../models/History.model")
const bcrypt = require("bcryptjs");

const getNotifyHistory =(req,res)=>{
    History.getHistory((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

module.exports = {
    getNotifyHistory,
}