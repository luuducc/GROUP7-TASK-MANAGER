const authController = require("../controllers/authController");

const router = require("express").Router();

//REGISTER
router.post("/register", authController.registerUser);
//LOG IN
router.post("/login", authController.loginUser);
//LOG OUT
router.post("/logout", authController.logOut);

module.exports = router;