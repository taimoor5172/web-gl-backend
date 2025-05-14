const authService = require('../services/auth-service');

class AuthController {
  async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      
      // Service handles validation and user creation
      const { user, token } = await authService.registerUser({
        name,
        email,
        password
      });

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      
      res.json({ message: "User Added successfully!", data: user });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Service handles authentication logic
      const { user, token } = await authService.authenticateUser(email, password);
      
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      
      res.send(user);
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }

  async logout(req, res) {
    // Clear the token cookie
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    
    res.send("Logout Successful!!");
  }
}

module.exports = new AuthController();