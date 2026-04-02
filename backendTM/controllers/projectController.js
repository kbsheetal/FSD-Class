const Project = require('../models/Project');
console.log('Project model:', Project); 

// Create project
exports.createProject = async (req, res) => {
    const { name, description } = req.body;
    try{
        const project = await Project.create({
            name,
            description,
            owner: req.user._id,
            members: [req.user._id]
        });
        res.status(201).json(project);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
}

// Get projects for user
exports.getProjects = async (req, res) => {
    try{
        const projects = await Project.find({ members: req.user._id });
        res.json(projects);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
}