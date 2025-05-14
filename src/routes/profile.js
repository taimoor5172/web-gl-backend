const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const profileController = require("../controllers/profileController");

profileRouter.get("/profile/view", userAuth, profileController.viewProfile);
profileRouter.patch("/profile/edit", userAuth, profileController.editProfile);

module.exports = profileRouter;