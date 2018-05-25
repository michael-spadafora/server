const asyncHandler = require('express-async-handler')
const express = require('express')
const router = express.Router()
const workerController = require('../controllers/workerController')

router.get('/', asyncHandler(async(req, res) => {
    const workers = workerController.getAllWorkers()
    let tests = []

    for (let i = 0; i < workers.length; i++){
        tests.push(workers[i].)
    }

    const projects = await projectController.getProjects()
    res.json(projects)
}))



module.exports = router