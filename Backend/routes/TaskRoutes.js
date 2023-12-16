const express = require("express");
const {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskByTitle, 
  deleteAllTask,
  getTaskByUser
} = require("../controllers/TaskController");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
  verifyTokenAndUser,
} = require("../controllers/verifyToken");

const router = express.Router();

router.route("/user/:id")
  .get(verifyTokenAndUser, getAllTasks)
  .post(verifyTokenAndUser, createTask)
  .delete(verifyTokenAndUser, deleteAllTask); 

router.route("/title/:id&:title").get(verifyTokenAndUser, getTaskByTitle)

router.route("/:taskId/user/:id")
  .get(verifyTokenAndUser, getTaskById)
  .put(verifyTokenAndUser, updateTask)
  .delete(verifyTokenAndUser, deleteTask);


router.route("/user/:user").get(getTaskByUser); // temporary API

module.exports = router;
