const express = require('express')
const router = express.Router()
const projects = require('./projects')
const testsets = require('./testsets')
const workers = require('./workers')

//Setup API routs
router.use('/projects', projects)
router.use('/testsets', testsets)
router.use('/workers', workers)

module.exports = router