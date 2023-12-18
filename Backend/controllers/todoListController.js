const TodoList = require("../models/TodoList");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
  verifyTokenAndUser,
} = require("../controllers/verifyToken");

const todoListController = {

  // CREATE TODOLIST
  createTodoList: async (req, res) => {
    try {
      //Create new todo
      console.log("check")
      console.log(req.body);
      const newTodoList = await new TodoList({
        user: req.body.user,
        title: req.body.title,
        body: req.body.body,
      });

      //Save todoList to DB
      const todoList = await newTodoList.save();
      res.status(200).json(todoList);

    } catch (err) {
      res.status(500).json(err);
      console.log(err.message)
    }
  },

  // GET ALL TODOLIST
  getAllTodoList: async (req, res) => {
    try {
      const todoList = await TodoList.find({ user: req.params.id });
      res.status(200).json(todoList);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE TODOLIST BY ID
  deleteTodoList: async (req, res) => {
    try {
      await TodoList.findByIdAndDelete(req.params.idTodo);
      res.status(200).json("TodoList deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATETODO
  updateTodoList: async (req, res) => {
    try {
      const change = await TodoList.findByIdAndUpdate(
        req.params.idTodo,
        {
          title: req.body.title,
          body: req.body.body,
          completed: req.body.completed
        },
        { new: true }
      );

      if (!change) {
        return res.status(404).json({ error: "TodoList not found" });
      }
      res.status(200).json(change);
    } catch (err) {
      res.status(500).json(err);
    }
  },


};

module.exports = todoListController;
