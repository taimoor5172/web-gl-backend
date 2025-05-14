const { validateEditProfileData } = require("../utils/validation");

class ProfileService {
  validateEditProfileData(req) {
    const isValid = validateEditProfileData(req);
    return {
      isValid,
      error: isValid ? null : "Invalid Edit Request"
    };
  }

  async updateProfile(user, updateData) {
    Object.keys(updateData).forEach((key) => (user[key] = updateData[key]));
    await user.save();
    return user;
  }
}

module.exports = new ProfileService();