const express = require('express')
const jsonParser = require('body-parser').json()
const router = express.Router()
const apiControllers = require('../controllers/api')
const passport = require('passport')
const costumMiddleware = require('../utils/costumMiddleware')

// sampel test awal
router.get('/protected',  passport.authenticate('jwt', { session: false}),  apiControllers.protected)

// register user
router.post('/register', jsonParser , apiControllers.register)

// login user
router.post('/login', jsonParser,apiControllers.login )

// melihat user 
router.get('/getUser', passport.authenticate('jwt', { session: false}),  apiControllers.getUser)

// membuat rooom server untuk admin
router.post('/server', jsonParser, passport.authenticate('jwt', { session: false}), costumMiddleware.validateAdmin, apiControllers.creatServer)

// melihat room server
router.get('/server', passport.authenticate('jwt', { session: false}), apiControllers.getServer)

// memilihi room server, sekaligus memilih gunting batu kertas, masih belum berhasil limitasi usernya
router.put('/choose', jsonParser, passport.authenticate('jwt', { session: false}), costumMiddleware.validatePlayer, apiControllers.chooseServer)

// untuk melihat server beserta user yang masuk di dalamnya
router.get('/room/:id', passport.authenticate('jwt', { session: false}), apiControllers.roombyId )

module.exports = router



