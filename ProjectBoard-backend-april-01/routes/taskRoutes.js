const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
} = require("../controllers/taskController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createTask);
router.get("/:projectId", auth, getTasks);
router.put("/:id", auth, updateTask);

module.exports = router;