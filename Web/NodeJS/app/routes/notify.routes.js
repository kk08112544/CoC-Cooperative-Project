const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const notify_controller = require("../controllers/notify.controller");
    var router = require("express").Router();
    router.get("/less", authJwt, notify_controller.getLess);
    app.use("/api/notify", router);
};