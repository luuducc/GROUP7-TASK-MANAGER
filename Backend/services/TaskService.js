const TaskModel = require("../models/Task");

exports.getAllTasks = async (userId) => {
  return await TaskModel.find({user: userId})
    .sort('-createdAt')
    .exec()
    .then(tasks => //sort properties in custom order
      tasks.map(({ title, user, body, completed, customNoti, expiredDate, createdAt, _id }) => ({ 
        title, user, body, completed, customNoti, expiredDate, createdAt, _id
      }))
    )
    .catch(err => {
      console.error("err in get all task:", err)
    })
};

exports.deleteAllTask = async (userId) => {
  return await TaskModel.deleteMany({user: userId});
};

exports.createTask = async (userId, task) => {
  return await TaskModel.create({...task, user: userId});
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

exports.updateTask = async (taskId, task) => {
  return await TaskModel.findByIdAndUpdate(taskId, task, {
    new: true, // return the new item
    runValidators: true
  });
};

exports.deleteTask = async (taskId) => {
  return await TaskModel.findByIdAndDelete(taskId);
};


