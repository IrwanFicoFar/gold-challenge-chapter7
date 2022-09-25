const express = require('express')
const router = express.Router()
const pageControllers = require('../controllers/page')
const passport = require('passport')
const costumMiddleware = require('../utils/costumMiddleware')

router.get('/login', pageControllers.login)
router.get('/admin', pageControllers.admin)
router.get('/player', pageControllers.player)
router.get('/fight', pageControllers.fight)

module.exports = router


