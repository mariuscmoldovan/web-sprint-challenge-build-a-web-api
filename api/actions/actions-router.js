// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')

const { validateActionsId, validateActions } = require('./actions-middlware')

const router = express.Router()

router.get ('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.get ('/:id', validateActionsId, (req, res) => {
    res.json(req.action)
})

router.post ('/', validateActions, (req, res, next) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put ('/:id', validateActionsId, validateActions, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(() => {
            return Actions.get(req.params.id)
        })
        .then(action => {
            res.json(action)
        })
        .catch(next)
})

router.delete ('/:id', validateActionsId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.json(req.action)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        customMessage: err.message,
        stack: err.stack,
    })
})

module.exports = router