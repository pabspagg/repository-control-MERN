const bcrypt = require("bcryptjs");

// Passwords control
class Bcrypt {
  createPasswordHash = async (password) => {
    return bcrypt.hash(password, 8);
  };

  checkPassword = async (user, password) => {
    bcrypt.compare(password, user.password);
  };
}

module.exports = new Bcrypt();
