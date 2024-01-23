module.exports = (app)=>{
    const user_controller = require("../controllers/user.controller");
    var router = require("express").Router();
    router.get("/:us", user_controller.validUsername);
    router.post("/signup", user_controller.createNewUser);
    router.post("/login", user_controller.login);
    app.use("/api/auth", router);
};