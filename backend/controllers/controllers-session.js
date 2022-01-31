const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("../services/auth");
const authConfig = require("../config/auth");

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User/password invalid" });
    }

    if (!bcrypt.checkPassword(user, password)) {
      return res.status(401).json({ error: "User/password invalid" });
    }

    const { id } = user;

    return res.json({
      user: {
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
