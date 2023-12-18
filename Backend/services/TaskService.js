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

exports.createTask = async (userId, task) => {
  // return await TaskModel.create({...task, user: userId})
  //   .populate({ path: 'user', select: 'username'});
  const newTask = await TaskModel.create({...task, user: userId})
    return newTask.populate({ path: 'user', select: 'username'});
};

exports.deleteAllTask = async (userId) => {
  return await TaskModel.deleteMany({user: userId})
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
  const findTask = await TaskModel.findById(taskId)
  if(findTask) { // if task exist
    if(findTask.inWorkspace === true) { // if task in workspace
      // user can only edit 'completed' with task in workspace
      const jsonTask = JSON.stringify(task) // convert object to string to compare
      if(jsonTask === '{"completed":"true"}' || jsonTask === '{"completed":"false"}') {
        // only accept changing 'completed' property
        const {completed} = task
        return await TaskModel.findByIdAndUpdate(taskId, {completed}, {new: true})
      } else { 
        return {
          errorCode: true,
          msg: "You can only change 'completed' property in workspace!"
        }
      }
      
    } else { // if task of user
      return await TaskModel.findByIdAndUpdate(taskId, task, {
        new: true, // return the new item
        // runValidators: true // gặp lỗi, khi this lúc nhận từ update, khác this lúc nhận từ create, nên chạy validate lại bị sai
      })
        .populate({ path: 'user', select: 'username'});
    }
    
  } else { // task dont exist
    return {
      errorCode: true,
      msg: ''
    }
  }
  
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

exports.getAllWorkspaceTasks = async () => {
  return await TaskModel.find({ inWorkspace: true })
    .sort('-createdAt')
    .populate({ path: 'user', select: 'username email'})
};

exports.deleteAllTaskForAdmin = async () => {
  return await TaskModel.deleteMany({ inWorkspace: true })
};

exports.updateTaskForAdmin = async (taskId, task) => {
  const findTask = await TaskModel.findById(taskId)
  if(findTask) { // check if already been deleted
    if(findTask.inWorkspace === true) {
      return await TaskModel.findByIdAndUpdate(taskId, task, {
        new: true, // return the new item
      })
        .populate({ path: 'user', select: 'username'});
  
      // thử dùng rest para trong ES6 nhưng chưa thành công
      // return {...findTask, ...task}
    } else {
      return 
    }
  }
  
};

exports.deleteTaskForAdmin = async (taskId) => {
  const findTask = await TaskModel.findById(taskId)
  if(findTask) {
    if(findTask.inWorkspace === true) {
      return await TaskModel.findByIdAndDelete(taskId)
        .populate({ path: 'user', select: 'username'});
    } else {
      return
    }
  } else {
    return
  }
  
  
};
