const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const history_controller = require("../controllers/History.controller");
    var router = require("express").Router();
    router.get('/',authJwt,history_controller.getNotifyHistory);
    app.use("/api/History", router);
};