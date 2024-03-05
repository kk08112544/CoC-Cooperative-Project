const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const dashboard_controller = require("../controllers/dashboard.controller");
    var router = require("express").Router();
    router.get("/total", authJwt,dashboard_controller.getAllTotal);
    router.get("/day",authJwt,dashboard_controller.getThisDay);
    router.get("/zone",authJwt,dashboard_controller.getAllTotalZone);
    router.get("/total_room",authJwt,dashboard_controller.getTotalRoom);
    router.get("/day_zone",authJwt,dashboard_controller.getThisDayZone);
    router.get("/amount",authJwt,dashboard_controller.getThisAmount);
    router.get("/totalRoles",authJwt,dashboard_controller.getAllRole);
    router.get("/getTotalUser",authJwt,dashboard_controller.getTotalUser);
    router.post("/addNotify",dashboard_controller.addNotify);
    router.get("/room",authJwt,dashboard_controller.getRoom);
    app.use("/api/dashboard", router);
};