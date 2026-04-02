// controllers/taskController.js
const Task = require('../models/Task');

const createTask = async (req, res) => {
    // your code to create a task
    res.status(201).json({ message: 'Task created' });
};

const getTasks = async (req, res) => {
    // your code to fetch tasks
    res.json({ tasks: [] });
};

module.exports = { createTask, getTasks };  // ✅ make sure you export BOTH