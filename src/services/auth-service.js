const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validateSignUpData } = require('../utils/validation');

class AuthService {
  async registerUser(userData) {
    
    validateSignUpData({ body: userData });
    
    
    const passwordHash = await bcrypt.hash(userData.password, 10);
    
    // Create a new user instance
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: passwordHash,
    });
    
    const savedUser = await user.save();
    
    // Generate JWT token
    const token = await savedUser.getJWT();
    
    return { user: savedUser, token };
  }

  async authenticateUser(email, password) {
    // Find user by email
    const user = await User.findOne({ email});
    
    if (!user) {
      throw new Error("Invalid credentials");
    }
    
    // Validate password
    const isPasswordValid = await user.validatePassword(password);
    
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    
    // Generate JWT token
    const token = await user.getJWT();
    
    return { user, token };
  }
}

module.exports = new AuthService();