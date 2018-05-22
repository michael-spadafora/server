const asyncHandler = require('express-async-handler')
const express = require('express')
const router = express.Router()
const testSetController = require('../controllers/workerController')

router.post('/', asyncHandler(async(req, res) => {
    const testsets = await testSetController.getTestSets()
    res.json(testsets)
}))

router.get('/:testSetID/instances/:projectID', asyncHandler(async(req, res) => {
    const instances = await testSetController.getTestSetInstances(req.params.testSetID,req.params.projectID)
    res.json(instances)
}))

module.exports = router