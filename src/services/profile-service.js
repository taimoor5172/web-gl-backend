
class ProfileService {
  
  async updateProfile(user, updateData) {
    Object.keys(updateData).forEach((key) => (user[key] = updateData[key]));
    await user.save();
    return user;
  }
}

module.exports = new ProfileService();