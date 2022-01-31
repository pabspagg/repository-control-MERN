const User = require("../models/User");
const createPasswordHash = require("../services/auth.js");

class UserController {
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(user);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async create(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(422)
          .json({ message: `User ${email} already exists` });
      }

      //encrypt password
      const encryptedPassword = await createPasswordHash(password);
      console.log(encryptedPassword);

      // create user
      const newUser = await User.create({ email, password: encryptedPassword });
      return res.status(201).json(newUser);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json();
      }

      //encrypt password
      const encryptedPassword = await createPasswordHash(password);
      await User.updateOne({ email, password: encryptedPassword });
      return res.status(200).json();
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ id });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await User.deleteOne(user);
      return res.status(200).json({ message: "deletado" });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new UserController();
