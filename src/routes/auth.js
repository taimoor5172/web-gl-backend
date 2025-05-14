const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth-controller");


authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

module.exports = authRouter;