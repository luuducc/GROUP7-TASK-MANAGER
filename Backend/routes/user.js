const userController = require("../controllers/userController");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
  verifyTokenAndUser,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/getAll", verifyToken, userController.getAllUsers);

//GET USER BY ID
router.get("/getUserByID/:id",  verifyTokenAndUser, userController.getUserByID);

//DELETE USER
router.delete("/delete/:id", verifyTokenAndUserAuthorization, userController.deleteUser);

//UPDATE USER INFOR
router.put("/update/:id", verifyTokenAndUser, userController.updateUser);

module.exports = router;