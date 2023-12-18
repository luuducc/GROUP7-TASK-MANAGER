const express = require("express");
const router = express.Router();

const {
  getAllTasks, createTask, getTaskById, updateTask, deleteTask, getTaskByTitle, deleteAllTask,
  createTaskForAdmin, getAllWorkspaceTasks, deleteAllTaskForAdmin, updateTaskForAdmin, deleteTaskForAdmin
} = require("../controllers/TaskController");

const {verifyToken, verifyTokenAndUser, verifyTokenAndAdmin} = require("../controllers/verifyToken");

const {getUserByEmail} = require('../controllers/userController')

router.route("/user/:id")
  .post(verifyTokenAndUser, createTask)
  .get(verifyTokenAndUser, getAllTasks)
  .delete(verifyTokenAndUser, deleteAllTask); 

router.route("/title/:id&:title").get(verifyTokenAndUser, getTaskByTitle)

router.route("/:taskId/user/:id")
  .get(verifyTokenAndUser, getTaskById)
  .put(verifyTokenAndUser, updateTask)
  .delete(verifyTokenAndUser, deleteTask);

// ADMIN HERE!!
router.route('/admin') // id ở đây là userId
  .post(verifyTokenAndAdmin, getUserByEmail, createTaskForAdmin)
  .get(verifyToken, getAllWorkspaceTasks) // both user and admin can do
  .delete(verifyTokenAndAdmin, deleteAllTaskForAdmin) // no need user id

router.route('/:taskId/admin/')
  .put(verifyTokenAndAdmin, updateTaskForAdmin) // only admin use this api, user has its own api
  .delete(verifyTokenAndAdmin, deleteTaskForAdmin);
module.exports = router;
