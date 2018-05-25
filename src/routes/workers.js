const asyncHandler = require('express-async-handler')
const express = require('express')
const router = express.Router()
const workerController = require('../controllers/workerController')

router.post('/', asyncHandler(async(req, res) => {
    const info = req.body.capabilities
    console.log(info)
    const os = req.body.os
    let idnum = workerController.addWorker(os,info)
    const worker = workerController.getWorker(idnum)
    console.log("new worker with idnum of " + worker.id + ", os of : " + worker.os + ", capabilities of : " + workerController.getWorker(idnum).capabilities)
    idnum = {
        id:idnum
    }
    res.json(idnum)
}))

router.get('/', asyncHandler(async(req, res) => {
    const allWorkers = workerController.getAllWorkers()
    res.json(allWorkers)
}))

router.get('/available', asyncHandler(async(req, res) => {
    const allWorkers = workerController.getAllAvailableWorkers()
    res.json(allWorkers)
}))

//he sends post
//we make sure the test set id from post is valid
//we make sure worker is valid and available
//we return the new test run id

router.get('/:idnum', asyncHandler(async(req, res) => {
    const worker = workerController.getWorker(req.params.idnum)
    res.json(worker)
}))

module.exports = router