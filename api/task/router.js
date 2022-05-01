// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')

router.get('/', (req, res, next) => {
    Task.getAll()
        .then(proj => {
            res.status(200).json(proj)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Task.add(req.body)
        .then(newTask => {
            res.status(201).json(newTask)
        })
        .catch(next)
})

module.exports = router