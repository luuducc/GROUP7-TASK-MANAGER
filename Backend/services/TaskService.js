const TaskModel = require("../models/Task");

exports.getAllTasks = async (userId) => {
  return await TaskModel.find({user: userId, inWorkspace: false})
    .sort('-createdAt')
    // .populate('user', 'username') // get related informations of it's user
    .populate({ path: 'user', select: 'username email'}) // the same way to populate
    .exec()
    .then(tasks => //sort properties in custom order
      tasks.map(({ 
        title, user, body, completed, customNoti, expiredDate, createdAt, _id, expired, inWorkspace
      }) => ({ 
        title, user, body, completed, customNoti, expiredDate, createdAt, _id, expired, inWorkspace
      }))
    )
    .catch(err => {
      console.error("err in get all tasks:", err)
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

exports.updateTask = async (taskId, task) => {
  return await TaskModel.findByIdAndUpdate(taskId, task, {
    new: true, // return the new item
    // runValidators: true // gặp lỗi, khi this lúc nhận từ update, khác this lúc nhận từ create, nên chạy validate lại bị sai
  })
    .populate({ path: 'user', select: 'username'});
};

exports.deleteTask = async (taskId) => {
  return await TaskModel.findByIdAndDelete(taskId)
    .populate({ path: 'user', select: 'username'});
};

// ADMIN HERE!!
exports.createTaskForAdmin = async (task, userId) => {
  const newTask = await TaskModel.create({...task, user: userId, inWorkspace: true})
    return newTask.populate({ path: 'user', select: 'username'});
};
