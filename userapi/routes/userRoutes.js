const router = require("express").Router();
const userController = require("../controllers/userControllers");

// Define the routes for user registration and login
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;