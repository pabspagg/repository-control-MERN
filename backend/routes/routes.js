const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/controllers-user");
const RepositoriesController = require("../controllers/controllers-repository");
const SessionController = require("../controllers/controllers-session");
const auth = require("../middlewares/auth");

// Cliente <---> Node.js -> Express -> Middleware -> Controller

// Controles publicos

router.post("/sessions", SessionController.create);
//middleware

router.use(auth);
// RESTFull

// Controles privados
router.get("/users", UsersController.index);
router.get("/users/:id", UsersController.show);
router.post("/users", UsersController.create);
router.put("/users/:id", UsersController.update);
router.delete("/users/:id", UsersController.destroy);

router.get("/users/:user_id/repositories", RepositoriesController.index);
router.post("/users/:user_id/repositories", RepositoriesController.create);
router.delete("/users/:user_id/repositories/:id", RepositoriesController.destroy);

module.exports = router;
