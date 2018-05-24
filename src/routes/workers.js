const asyncHandler = require('express-async-handler')
const express = require('express')
const router = express.Router()
const workerController = require('../controllers/workerController')




router.post('/', asyncHandler(async(req, res) => {
    const info = req.body.capabilities
    console.log(info)
    const os = req.body.os
    const idnum = workerController.addWorker(os,info)
    const worker = workerController.getWorker(idnum)
    console.log("new worker with idnum of " + worker.id + ", os of : " + worker.os + ", capabilities of : " + workerController.getWorker(idnum).capabilities)
    res.json(idnum)
}))

router.get('/', asyncHandler(async(req, res) => {
    const allWorkers = workerController.workers
    res.json(allWorkers)
}))

router.get('/:idnum', asyncHandler(async(req, res) => {
    const worker = workerController.getWorker(req.params.idnum)
    res.json(worker)
}))

module.exports = router