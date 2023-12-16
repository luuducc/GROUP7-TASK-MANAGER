const workspaceController = require("../controllers/workspaceController");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
  verifyTokenAndUser,
} = require("../controllers/verifyToken");

const router = require("express").Router();

//CREATE WORKSPACE
router.get("/create", verifyTokenAndAdmin, workspaceController.createWorkspace);

//GET ALL WORKSPACE
router.get("/getAll", verifyToken, workspaceController.getAllWorkspace);

//DELETE WORKSPACE
router.delete("/delete/:id&:idWorkspace", verifyTokenAndAdmin, workspaceController.deleteWorkspace);

//CHANGE
router.put("/change/:id&:idWorkspace", verifyTokenAndAdmin, workspaceController.updateWorkspace);


module.exports = router;