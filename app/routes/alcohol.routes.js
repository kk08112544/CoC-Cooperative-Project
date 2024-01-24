const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const alcohol_controller = require("../controllers/alcohol.controller");
    var router = require("express").Router();
    router.get("/", authJwt,alcohol_controller.getAllAlcohol);
    router.post("/addToAlcohol",authJwt,alcohol_controller.addToAlcohol);
    router.put("/updateToAlcohol/:id",authJwt,alcohol_controller.updateToAlcohol);
    router.delete("/deleteToAlcohol/:id",authJwt,alcohol_controller.deleteToAlcohol);
    router.put("/updateStatusToAlcohol/:id",alcohol_controller.updateStatusToAlcohol);
    router.put("/updateDetectDataAlcohol/:id",alcohol_controller.updateDetectDataAlcohol);
    app.use("/api/alcohol", router);
};