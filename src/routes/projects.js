const asyncHandler = require('express-async-handler')
const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')

router.get('/', asyncHandler(async(req, res) => {
    const projects = await projectController.getProjects()
    res.json(projects)
}))

router.get('/:id/testsets', asyncHandler(async(req, res) => {
    const projects = await projectController.getTestSets(req.params.id)
    res.json(projects)
}))

router.get('/:projectID/testsets/:testsetID/instances/', asyncHandler(async(req, res) => {
    const instances = await projectController.getTestSetInstances(req.params.testsetID,req.params.projectID)
    res.json(instances)
}))

module.exports = router