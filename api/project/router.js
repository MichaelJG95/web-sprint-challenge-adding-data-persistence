// build your `/api/projects` router here
const router = require('express').Router()
const Projects =  require('./model')

router.get('/', (req, res, next) => {
    Projects.getAll()
        .then(proj => {
            res.status(200).json(proj)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    Projects.add(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

module.exports = router