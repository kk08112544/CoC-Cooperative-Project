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
       alcohol_zone: req.body.alcohol_zone,
       img: req.body.img,
       status:'0'
    });
    Alcohol.addAlcohol(AlcoholObj,(err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Some error occured while creating"});
        }else res.send(data);
    })
}



const updateToAlcohol = (req,res) => {
    const id = req.params.id;
    if(!req.body){
        res.status(400).send({message: "Content can not be empty."});
    }
    const data = {
        alcohol_zone: req.body.alcohol_zone,
        img: req.body.img,
    };
    Alcohol.updateAlcoholId(id,data,(err,result)=>{
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
    if(!req.body.status){
        res.status(400).send({message: "Content can not be empty."});
    }
    newStatus=req.body.status
    Alcohol.updateStatusAlcoholById(id,newStatus,(err,result)=>{
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
        }
        else res.send(data);
    })
}

const updateDetectDataAlcohol = (req,res) => {
    const id = req.params.id;
    if(!req.body.status){
        res.status(400).send({message: "Content can not be empty."});
    }
    newDetect=req.body.detect
    Alcohol.updateDetectAlcoholById(id,newDetect,(err,result)=>{
        if(err) {
            if (err.kind == "not_found") {
                res.status(401).send({
                  message: "Not found Alcohol id: " + req.params.id,
                });
              } else {
                res.status(500).send({
                  message: "Error updating Detect Alcohol id: " + req.params.id,
                });
            }
        }
        else res.send(data);
    })
}


module.exports = {
    getAllAlcohol,
    addToAlcohol,
    updateToAlcohol,
    deleteToAlcohol,
    updateStatusToAlcohol,
    updateDetectDataAlcohol,
}