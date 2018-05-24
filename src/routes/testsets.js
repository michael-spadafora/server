const asyncHandler = require('express-async-handler')
const express = require('express')
const router = express.Router()
const testSetController = require('../controllers/testSetController')


//todo move this to project controller
router.get('/:projectID', asyncHandler(async(req, res) => {
    const testsets = await testSetController.getTestSets(req.params.projectID)
    res.json(testsets)
}))

///:projectID/testsets/:testsetid/instances/
router.get('/:projectID/instances/:testSetID', asyncHandler(async(req, res) => {
    const instances = await testSetController.getTestSetInstances(req.params.testSetID,req.params.projectID)
    res.json(instances)
}))

module.exports = router