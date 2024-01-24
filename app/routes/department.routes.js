const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const department_controller = require("../controllers/department.controller");
    var router = require("express").Router();
    router.get("/:role_id",authJwt, department_controller.getAllDepartment);
    router.get("/:id",authJwt, department_controller.getRoleById);
    router.put("/updateToDepartment/:id",authJwt,department_controller.updateToDepartment);
    router.post("/addToDepartment",authJwt,department_controller.addToDepartment);
    router.delete("/deleteToDepartment/:id",authJwt,department_controller.deleteToDepartment);
    app.use("/api/department", router);
};