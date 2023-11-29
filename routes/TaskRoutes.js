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

router.route("/home").get(getAllTasks).post(createTask); 
router.route("/:title").get(getTaskByTitle)
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
