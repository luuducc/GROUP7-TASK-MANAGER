const TodoListModel = require("../models/TodoList");

exports.getAllTodoLists = async (userId) => {
  return await TodoListModel.find({user: userId})
    .populate({ path: 'user', select: 'username'})
    .exec()
    .then(todolists => //sort properties in custom order
      todolists.map(({ title, completed, _id }) => ({ title, completed, _id }))
    )
    .catch(err => {
      console.error("err in get all todolists:", err)
    })
};

exports.createTodoList = async (userId, todolist) => {
  const newTodoList = await TodoListModel.create({...todolist, user: userId})
    return newTodoList.populate({ path: 'user', select: 'username'});
};

exports.updateTodoList = async (todoListId, todoList) => {
  return await TodoListModel.findByIdAndUpdate(todoListId, todoList, {
    new: true, // return the new item
  })
    .populate({ path: 'user', select: 'username'});
};

exports.deleteTodoList = async (todoListId) => {
  return await TodoListModel.findByIdAndDelete(todoListId)
    .populate({ path: 'user', select: 'username'});
};




