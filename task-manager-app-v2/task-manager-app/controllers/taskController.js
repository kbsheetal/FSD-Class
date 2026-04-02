const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
 try {
   const task = await Task.create(req.body);
   res.status(201).json(task);
 } catch (err) {
   res.status(400).json({ error: err.message });
 }
};

// Get All Tasks with User Info
exports.getTasks = async (req, res) => {
 const tasks = await Task.find().populate("user");
 res.json(tasks);
};

// Update Task
exports.updateTask = async (req, res) => {
 const task = await Task.findByIdAndUpdate(
   req.params.id,
   req.body,
   { new: true }
 );
 res.json(task);
};

// Delete Task
exports.deleteTask = async (req, res) => {
 await Task.findByIdAndDelete(req.params.id);
 res.json({ message: "Task deleted" });
};
