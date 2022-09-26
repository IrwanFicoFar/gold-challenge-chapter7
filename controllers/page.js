// const fetch = require('node-fetch')

exports.login = (req, res) => {
    res.render('login')
}

exports.admin = async (req, res) => {
    res.render('admin')
}

exports.player = (req, res) => {
    res.render('player')
}

exports.roombyId = (req, res) => {
    res.render('roombyId')
}

