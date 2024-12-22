const express = require("express");
const UserController = require("../Controllers/UserController");
const authenticateJWT=require("../Midleware/Athonticatjwt")
const router = express.Router();
router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
