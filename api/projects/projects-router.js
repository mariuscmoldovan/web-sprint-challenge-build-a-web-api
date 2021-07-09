// Write your "projects" router here!
const express = require('express')
const { 
    validateProjectId, 
    validateProject, 
} = require('./projects-middleware')
const Project = require('./projects-model')

const router = express.Router()


router.get ('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})





router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        customMessage: err.message,
    })
})
module.exports = router