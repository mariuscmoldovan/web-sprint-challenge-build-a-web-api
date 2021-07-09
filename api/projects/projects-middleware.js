// add middlewares here related to projects
const Project = require('./projects-model')

//get project id from projects database
async function validateProjectId (req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            res.status(404).json({message: "project not found"})
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        next(err)
    }
}

// validate  name and description fields for projects
function validateProject (req, res, next) {
    const { name, description } = req.body
    if (!name || !name.trim() || !description || !description.trim()) {
        res.status(400).json({
            message: "missing required field (name or description)"
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        next()
    }
}


module.exports = {
    validateProjectId,
    validateProject,
}