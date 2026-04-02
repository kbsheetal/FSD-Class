const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
};

// Get Tasks by Project
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
};

// Update Task Status
exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
};