const express = require("express");
const route = express.Router();

const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const contatoController = require("./src/controllers/contatoController");

const { loginRequired } = require("./src/middlewares/middleware");

// Rotas da home
route.get("/home", homeController.home);
route.get("/", homeController.index);

// Rotas de Login
route.get("/auth", loginController.index);
route.post("/register", loginController.register);
route.post("/login", loginController.login);
route.get("/logout", loginController.logout);

//Rotas de Contato
route.get("/criaContato", loginRequired, contatoController.index);
route.get("/:id", loginRequired, contatoController.editIndex);
route.post("/cadastraContato", loginRequired, contatoController.register);
route.post("/edit/:id", loginRequired, contatoController.edit);
route.get("/delete/:id", loginRequired, contatoController.delete);

module.exports = route;
