const express = require('express')
const router = express.Router()
const projects = require('./projects')

//Setup API routs
router.use('/projects', projects)

module.exports = router