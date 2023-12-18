const express = require("express");
const router = express.Router();

const {
  getAllTasks, createTask, getTaskById, updateTask, deleteTask, getTaskByTitle, deleteAllTask,
  createTaskForAdmin
} = require("../controllers/TaskController");

const {verifyTokenAndUser, verifyTokenAndAdmin} = require("../controllers/verifyToken");

const {getUserByEmail} = require('../controllers/userController')

router.route("/user/:id")
  .get(verifyTokenAndUser, getAllTasks)
  .post(verifyTokenAndUser, createTask)
  .delete(verifyTokenAndUser, deleteAllTask); 

router.route("/title/:id&:title").get(verifyTokenAndUser, getTaskByTitle)

router.route("/:taskId/user/:id")
  .get(verifyTokenAndUser, getTaskById)
  .put(verifyTokenAndUser, updateTask)
  .delete(verifyTokenAndUser, deleteTask);

// ADMIN HERE!!
router.route('/admin/:id')
  .post(verifyTokenAndUser, verifyTokenAndAdmin, getUserByEmail, createTaskForAdmin)

module.exports = router;
