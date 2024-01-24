const Dashboard = require("../models/dashboard.model")
const bcrypt = require("bcryptjs");


const getAllTotal = (req,res) => {
    Dashboard.getAll((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

const getThisDay = (req,res) => {
    Dashboard.getDay((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    });
}

const getAllTotalZone = (req,res) => {
    Dashboard.getAllZone((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    });
}

const getThisDayZone = (req,res) =>{
    Dashboard.getDayZone((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}


const getThisAmount = (req,res) => {
    Dashboard.getAmount((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

const addNotify = (req,res) => {
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    date=CURDATE()
    const currentDate = new Date();

    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const createNewNotify = new Dashboard({
        alcohol_id:req.body.alcohol_id,
        date: date,
        times:formattedTime
    })
    Dashboard.createNotify(createNewNotify,(err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating"});
        }else res.send(data);
    })
}

module.exports = {
    getAllTotal,
    getThisDay,
    getAllTotalZone,
    getThisDayZone,
    getThisAmount,
    addNotify,
}