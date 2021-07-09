// add middlewares here related to actions
const Actions = require('./actions-model')

//  get action id 
async function validateActionsId (req, res, next) {
  
    try {
        const action = await Actions.get(req.params.id)
        if (!action) {
            res.status(404).json({message: "actions  id not found"})
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        next(err)
    }
}

// validate required notes and description 
function validateActions (req, res, next) {
    const { description, notes, project_id} = req.body
    if (!notes || !notes.trim() || !description || !description.trim() || !project_id) {
        res.status(400).json({
            message: "missing required field notes or description or project ID"
        })
    } else {
        req.notes = notes.trim()
        req.description = description.trim()
        req.project_id = project_id
        next()
    }
}

module.exports = {
    validateActionsId,
    validateActions
}