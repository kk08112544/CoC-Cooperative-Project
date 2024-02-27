const Dashboard = require("../models/dashboard.model")
const bcrypt = require("bcryptjs");


const getAllTotal = (req,res) => {
    Dashboard.getAll((err,data)=>{
        if(err){
            res.status(400).send({message: err.message || "Some error ocurred."});
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

const getRoom = (req,res) => {
    Dashboard.getRoom((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

const addNotify = (req,res) => {
    if(!req.body.alcohol_id){
        res.status(400).send({message: "Content can not be empty."});
    }
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = currentDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    console.log("Current date:", formattedDate);
    console.log("Current time:", formattedTime);

    
    const createNewNotify = new Dashboard({
        alcohol_id:req.body.alcohol_id,
        date: formattedDate,
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
    getRoom,
    addNotify,
}