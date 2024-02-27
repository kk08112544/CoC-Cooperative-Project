const Alcohol = require("../models/alcohol.model")
const bcrypt = require("bcryptjs");

const getAllAlcohol = (req,res) => {
    Alcohol.getAlcohol((err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error ocurred."});
        }else res.send(data);
    })
}

const addToAlcohol = (req,res) => {
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const AlcoholObj = new Alcohol({
       room: req.body.room,
       detect: '0',
       status_id:'1',
    });
    Alcohol.addAlcohol(AlcoholObj,(err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating"});
        }else res.send(data);
    })
}


const getById = (req,res) => {
    const id = req.params.id;
    Alcohol.getAlcoholId(id,(err,data)=>{
        if(err){
            res.status(500).send({message:err.message || "Some error ocurred."});
        }else res.send(data);
    })
}


const updateToAlcohol = (req,res) => {
    const id = req.params.id;
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    let newRoom = req.body.room;
    Alcohol.updateAlcoholId(id,newRoom,(err,data)=>{
        if(err) {
            if (err.kind == "not_found") {
                res.status(401).send({
                  message: "Not found Alcohol id: " + req.params.id,
                });
              } else {
                res.status(500).send({
                  message: "Error updating Alcohol id: " + req.params.id,
                });
            }
        }
        else res.send(data);
    })
}

const deleteToAlcohol = (req,res) => {
    const id = req.params.id;

    Alcohol.deleteAlcoholId(id,(err,result)=>{
        if(err){
            if (err.kind == "not_found") {
                res.status(401).send({
                  message: "Not found Alcohol id: " + req.params.id,
                });
              } else {
                res.status(500).send({
                  message: "Error delete Alcohol id: " + req.params.id,
                });
            }
        }
    })
}

const updateStatusToAlcohol = (req,res) => {
    const id = req.params.id;
    if(!req.body.status_id){
        res.status(400).send({message: "Content can not be empty."});
    }
    let newStatus=req.body.status_id
    Alcohol.updateStatusAlcoholById(id,newStatus,(err,data)=>{
        if(err) {
            if (err.kind == "not_found") {
                res.status(401).send({
                  message: "Not found Alcohol id: " + req.params.id,
                });
              } else {
                res.status(500).send({
                  message: "Error updating status Alcohol id: " + req.params.id,
                });
            }
        }else res.send(data);
    })
}



module.exports = {
    getAllAlcohol,
    addToAlcohol,
    getById,
    updateToAlcohol,
    deleteToAlcohol,
    updateStatusToAlcohol,
}