const todoListService = require('../services/TodoListService')

exports.createTodoList = async (req, res) => {
  try {
    console.log("check")
    console.log(req.body)
    const todoList = await todoListService.createTodoList(req.params.id, req.body);
    res.json({ status: "success", data: todoList });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTodoLists = async (req, res) => {
  try {
    const todoLists = await todoListService.getAllTodoLists(req.params.id);
    res.json({ status: "success", count: todoLists.length, data: todoLists });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTodoList = async (req, res) => {
  try {
    const todoList = await todoListService.updateTodoList(req.params.todoListId, req.body);
    if (todoList) {
      res.json({ status: "success", data: todoList });
    } else {
      return res.status(404).json({ msg: `No todoList with id ${req.params.todoListId}` })
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
exports.deleteTodoList = async (req, res) => {
  try {
    const todoList = await todoListService.deleteTodoList(req.params.todoListId);
    if (todoList) {
      res.json({ status: "success", data: todoList });
    } else {
      return res.status(404).json({ msg: `No todoList with id ${req.params.todoListId}` })
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

