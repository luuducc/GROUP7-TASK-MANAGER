const TaskModel = require("../models/Task");

exports.getAllTasks = async (userId) => {
  return await TaskModel.find({user: userId})
    .sort('-createdAt')
    // .populate('user', 'username') // get related informations of it's user
    .populate({ path: 'user', select: 'username'}) // the same way to populate
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
  return await TaskModel.deleteMany({user: userId})
};

exports.createTask = async (userId, task) => {
  // return await TaskModel.create({...task, user: userId})
  //   .populate({ path: 'user', select: 'username'});
  const newTask = await TaskModel.create({...task, user: userId})
    return newTask.populate({ path: 'user', select: 'username'});
};
exports.getTaskById = async (id) => {
  return await TaskModel.findById(id)
    .populate({ path: 'user', select: 'username'});
};
exports.getTaskByTitle = async (title) => {
  return await TaskModel.find({ title })
    .populate({ path: 'user', select: 'username'})
};

exports.getTaskByUser = async (user) => {
  return await TaskModel.find({ user })
    .populate({ path: 'user', select: 'username'})
};

exports.updateTask = async (taskId, task) => {
  return await TaskModel.findByIdAndUpdate(taskId, task, {
    new: true, // return the new item
    runValidators: true
  })
    .populate({ path: 'user', select: 'username'});
};

exports.deleteTask = async (taskId) => {
  return await TaskModel.findByIdAndDelete(taskId)
    .populate({ path: 'user', select: 'username'});
};


