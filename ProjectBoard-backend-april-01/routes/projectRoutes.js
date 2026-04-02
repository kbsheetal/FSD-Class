const express = require("express");
const {
  createProject,
  getProjects,
  addMember,
} = require("../controllers/projectController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.post("/add-member", auth, addMember);

module.exports = router;