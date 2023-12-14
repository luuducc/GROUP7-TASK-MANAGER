const TaskModel = require("../models/Task");

exports.getAllTasks = async () => {
  return await TaskModel.find()
    .exec()
    .then(tasks => //sort properties in custom order
      tasks.map(({ title, user, body, completed, customNoti, expiredDate, createdAt }) => ({ 
        title, user, body, completed, customNoti, expiredDate, createdAt 
      }))
    )
    .catch(err => {
      console.error("err in get all task:", err)
    })
};

exports.deleteAllTask = async () => {
  return await TaskModel.deleteMany({});
};

exports.createTask = async (task) => {
  return await TaskModel.create(task);
};
exports.getTaskById = async (id) => {
  return await TaskModel.findById(id);
};
exports.getTaskByTitle = async (title) => {
  return await TaskModel.find({ title })
};

exports.getTaskByUser = async (user) => {
  return await TaskModel.find({ user })
};

exports.updateTask = async (id, task) => {
  return await TaskModel.findByIdAndUpdate(id, task, {
    new: true, // return the new item
    runValidators: true
  });
};

exports.deleteTask = async (id) => {
  return await TaskModel.findByIdAndDelete(id);
};


