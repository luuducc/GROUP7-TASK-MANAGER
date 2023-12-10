const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/getAll", verifyToken, userController.getAllUsers);

//DELETE USER
router.delete("/delete/:id", verifyTokenAndUserAuthorization, userController.deleteUser);

//UPDATE USER INFOR
router.put("/update/:id", verifyToken, userController.updateUser);

module.exports = router;