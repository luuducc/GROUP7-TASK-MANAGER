const express = require('express')
const router = express.Router();

const {
  getAllTodoLists, createTodoList, deleteTodoList, updateTodoList
} = require("../controllers/TodoListController");

const {verifyTokenAndUser} = require("../controllers/verifyToken");

router.route("/user/:id")
  .get(verifyTokenAndUser, getAllTodoLists)
  .post(verifyTokenAndUser, createTodoList)

router.route("/:todoListId/user/:id")
  .put(verifyTokenAndUser, updateTodoList)
  .delete(verifyTokenAndUser, deleteTodoList);

module.exports = router;