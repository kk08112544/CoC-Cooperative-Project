const authJwt = require("../middleware/auth.jwt");
module.exports = (app)=>{
    const department_controller = require("../controllers/department.controller");
    var router = require("express").Router();
    router.get("/roles/:role_id",department_controller.getAllDepartmentById);
    router.get("/:id",authJwt, department_controller.getRoleById);
    router.get("/",department_controller.getAllDepartment)
    router.put("/updateToDepartment/:id",authJwt,department_controller.updateToDepartment);
    router.post("/addToDepartment",authJwt,department_controller.addToDepartment);
    router.delete("/deleteToDepartment/:id",authJwt,department_controller.deleteToDepartment);
    app.use("/api/department", router);
};