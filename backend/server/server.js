const express = require("express");
const cors = require("cors");
const router = require("../routes/routes.js");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors()); // permite requições externas
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.server.use(router);
   this.server.use("/*", (req, res) =>
     res.status(404).json({ error: "not found" })
   );
  }
}

module.exports = new App().server;
