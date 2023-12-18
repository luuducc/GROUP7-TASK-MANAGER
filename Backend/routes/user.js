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

// GET USER BY EMAIL
router.get("/getUserByID/:id/email",  verifyTokenAndUser, userController.getUserByEmail);

//DELETE USER
router.delete("/delete/:id", verifyTokenAndUserAuthorization, userController.deleteUser);

//UPDATE USER INFOR
router.put("/update/:id", verifyTokenAndUser, userController.updateUser);

//CHECKPASS
router.post("/checkPass/:id", verifyTokenAndUser, userController.checkPassUser);

module.exports = router;