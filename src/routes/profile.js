const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middewares/auth");
const profileController = require("../controllers/profile-controller");

profileRouter.get("/profile/view", userAuth, profileController.viewProfile);
profileRouter.patch("/profile/edit", userAuth, profileController.editProfile);

module.exports = profileRouter;