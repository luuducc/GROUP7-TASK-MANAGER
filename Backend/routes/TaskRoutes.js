const express = require("express");
const router = express.Router();

const {
  getAllTasks, createTask, getTaskById, updateTask, deleteTask, getTaskByTitle, deleteAllTask,
} = require("../controllers/TaskController");

const {verifyTokenAndUser} = require("../controllers/verifyToken");

router.route("/user/:id")
  .get(verifyTokenAndUser, getAllTasks)
  .post(verifyTokenAndUser, createTask)
  .delete(verifyTokenAndUser, deleteAllTask); 

router.route("/title/:id&:title").get(verifyTokenAndUser, getTaskByTitle)

router.route("/:taskId/user/:id")
  .get(verifyTokenAndUser, getTaskById)
  .put(verifyTokenAndUser, updateTask)
  .delete(verifyTokenAndUser, deleteTask);

module.exports = router;
