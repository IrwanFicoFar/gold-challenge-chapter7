const express = require('express')
const jsonParser = require('body-parser').json()
const router = express.Router()
const apiControllers = require('../controllers/api')
const passport = require('passport')
const costumMiddleware = require('../utils/costumMiddleware')

router.get('/protected',  passport.authenticate('jwt', { session: false}),  apiControllers.protected)
router.post('/register', jsonParser , apiControllers.register)
router.post('/login', jsonParser,apiControllers.login )


// Server
router.post('/server', jsonParser, passport.authenticate('jwt', { session: false}), costumMiddleware.validateAdmin, apiControllers.creatServer)
router.get('/server', passport.authenticate('jwt', { session: false}), apiControllers.getServer)

// Choose Server
router.put('/choose', jsonParser, passport.authenticate('jwt', { session: false}), costumMiddleware.validatePlayer, apiControllers.chooseServer)

module.exports = router

router.get('/room/:id', jsonParser, passport.authenticate('jwt', { session: false}), apiControllers.roombyId )

