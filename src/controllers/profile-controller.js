const profileService = require('../services/profile-service');
const { validateEditProfileData } = require("../utils/validation");

class ProfileController {
  async viewProfile(req, res) {
    try {
      const user = req.user;
      res.send(user);
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }

  async editProfile(req, res) {
    try {
        
      const { isValid, error } = validateEditProfileData(req);
      if (!isValid) {
        throw new Error(error || "Invalid Edit Request");
      }
      
      const loggedInUser = req.user;
      const updatedUser = await profileService.updateProfile(loggedInUser, req.body);
      
      res.json({
        message: `${updatedUser.firstName}, your profile updated successfully`,
        data: updatedUser,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
}

module.exports = new ProfileController();