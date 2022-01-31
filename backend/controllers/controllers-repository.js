const User = require("../models/User");
const Repository = require("../models/Repository");

class RepositoryController {
  async index(req, res) {
    try {
      const { user_id } = req.params;
      const {q} = req.query;

      if (user_id.match(/^[0-9a-fA-F]{24}$/)) {
        const users = await User.findById(user_id);
        if (!users) {
          return res.status(404).json({ message: "User not found" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }

      let query = {}
      if(q){
        query = {url:{$regex:q}}
      }
      const repositories = await Repository.find({ user_id,...query });

      return res.json(repositories);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req, res) {
    try {
      const { user_id } = req.params;
      console.log(user_id);
      const { name, url } = req.body;
      // Look for user
      if (user_id.match(/^[0-9a-fA-F]{24}$/)) {
        const users = await User.findById(user_id);
        if (!users) {
          return res.status(404).json({ message: "User not found" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }

      const repository = await Repository.findOne({
        userId: user_id,
        name,
      });

      if (repository) {
        return res.status(422).json({ message: "Repository already exists" });
      }

      const newRepository = await Repository.create({
        name,
        url,
        userId: user_id,
      });

      return res.status(201).json(newRepository);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async destroy(req, res) {
    try {
      console.log("aqq");
      const { user_id, id } = req.params;
      // Look for user
      console.log("aqq");
      console.log("destroy user" + user_id + " " + "id");
      if (user_id.match(/^[0-9a-fA-F]{24}$/)) {
        const users = await User.findById(user_id);
        if (!users) {
          return res.status(404).json({ message: "User not found" });
        }
      } else {
        return res.status(404).json({ message: "User not found" });
      }

      const repositories = await Repository.findOne({
        userId: user_id,
        id,
      });

      if (!repositories) {
        return res.status(404).json({ message: "Repository not found" });
      }

      await repositories.deleteOne();
      return res.status(200).json();
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new RepositoryController();
