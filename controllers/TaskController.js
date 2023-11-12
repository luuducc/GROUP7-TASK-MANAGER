const taskService = require("../services/TaskService");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json({ data: tasks, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.json({ data: task, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json({ data: task, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getTaskByTitle = async (req, res) => {
  try {
    const task = await taskService.getTaskByTitle(req.params.title);
    res.json({ data: task, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.json({ data: task, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    res.json({ data: task, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
