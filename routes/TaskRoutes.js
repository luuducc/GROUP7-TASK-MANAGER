const express = require("express");
const {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskByTitle
} = require("../controllers/TaskController");

const router = express.Router();

router.route("/").get(getAllTasks).post(createTask).delete(deleteAllTask); 
router.route("/title/:title").get(getTaskByTitle)
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;
