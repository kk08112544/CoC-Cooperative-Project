const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const role_controller = require("../controllers/role.controller");
    var router = require("express").Router();
    router.get("/",authJwt, role_controller.getAllRoles);
    router.put("/updateToRoles/:id",authJwt,role_controller.updateToRoles);
    router.post("/addToRoles",authJwt,role_controller.addToRoles);
    router.delete("/deleteToRoles/:id",authJwt,role_controller.deleteToRoles);
    app.use("/api/role", router);
};