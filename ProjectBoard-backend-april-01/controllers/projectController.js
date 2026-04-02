const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    owner: req.user,
    members: [req.user],
  });

  res.json(project);
};

// Get Projects
exports.getProjects = async (req, res) => {
  const projects = await Project.find({
    members: req.user,
  });

  res.json(projects);
};

// Add Member
exports.addMember = async (req, res) => {
  const { projectId, userId } = req.body;

  const project = await Project.findById(projectId);
  project.members.push(userId);
  await project.save();

  res.json(project);
};