const taskService = require("../services/TaskService");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks(req.params.id);
    res.json({ status: "success", count: tasks.length, data: tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAllTask = async (req, res) => {
  try {
    const task = await taskService.deleteAllTask(req.params.id);
    res.json({ status: "success", data: task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.params.id, req.body);
    res.json({ status: "success", data: task });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if(task) {
      res.json({ status: "success", data: task });
    } else {
      return res.status(404).json({ msg: `No task with id ${req.params.id}`})
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getTaskByTitle = async (req, res) => {
  try {
    const task = await taskService.getTaskByTitle(req.params.title);
    if(task.length > 0) {
      res.json({ status: "success", data: task });
    } else {
      return res.status(404).json({ msg: `No task with title ${req.params.title}`})
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.taskId, req.body);
    if(task) {
      res.json({ status: "success", data: task });
    } else {
      return res.status(404).json({ msg: `No task with id ${req.params.taskId}`})
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message }); 
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.taskId);
    if(task) {
      res.json({ status: "success", data: task });
    } else {
      return res.status(404).json({ msg: `No task with id ${req.params.taskId}`})
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADMIN HERE!!
exports.createTaskForAdmin = async (req, res) => {
  try {
    console.log("hello", req.userId)
    const task = await taskService.createTaskForAdmin(req.body, req.userId);
    res.json({ status: "success", data: task });
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
};