const todoListController = require("../controllers/todoListController");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
  verifyTokenAndUser,
} = require("../controllers/verifyToken");

const router = require("express").Router();

//CREATE TODOLIST
router.post("/create", verifyToken, todoListController.createTodoList);

//GET ALL TODOLIST
router.get("/getAll/:id", verifyTokenAndUser, todoListController.getAllTodoList);

//DELETE TODOLIST
router.delete("/delete/:id&:idTodo", verifyTokenAndUser, todoListController.deleteTodoList);

//CHANGE
router.put("/change/:id&:idTodo", verifyTokenAndUser, todoListController.updateTodoList);


module.exports = router;