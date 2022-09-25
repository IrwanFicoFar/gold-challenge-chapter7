const { hashSync, compareSync } = require("bcrypt")
const jwt  = require('jsonwebtoken')
const { User, Server } = require("../models")

exports.protected = (req, res) => {
  console.log(req.user)

  res.send({
    message: 'ok'
  })
}

exports.register = async (req, res) => {
  try {
    const data = await User.create({
      username: req.body.username,
      password: hashSync(req.body.password, 10),
      role: req.body.role
    })
  
    res.status(201).send({
      message: 'User created successfully',
      user: {
        id: data.id,
        username: data.username,
        role: data.role
      }
    })
  } catch (error) {
    res.status(422).send({
      message: 'Failed to create user'
    })
  }
}

exports.login = async (req, res) => {
  // query user ke db
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
    include: Server
  })

  // kalau usernya ga exist, kasih response user not found
  if (!user){
    return res.status(404).send({
      message: 'User not found'
    })
  }
  
  // kalau passwordnya salah
  // if( hashSync(req.body.password) !== userData.password ){
  if( !compareSync(req.body.password, user.password) ){
    return res.status(401).send({
      message: 'Incorrect Password'
    })
  }

  let serverData = null
  if (user.ServerId !== null) {
    serverData = user.Server
  }
  
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    serverData: serverData
  }

  const token = jwt.sign(payload, "secretkey", { expiresIn: '1d' });

  res.send({
    message: 'Login Success',
    token: `Bearer ${token}`,
    user: payload
  })
}

exports.creatServer = async (req, res) => {
  try {
    const data = await Server.create({
      name: req.body.name
    })

    res.status(201).send({
      message: 'Server created succesfully',
      user: data
    })

  } catch (error) {
    res.status(422).send({
      message: 'Failed to Create Server'
    })
  }
}

exports.getServer = async (req, res) => {
  const data = await Server.findAll()
  res.send(data)
  include: User
}

exports.chooseServer = async (req, res) => {
  const user = await User.findByPk(req.user.id)
  if(user.ServerId !== null){
    return res.status(403).send('User has already picked his server')
  }
  user.ServerId = req.body.ServerId
  user.choose1 = req.body.chooose1
  user.choose2 = req.body.chooose2
  user.choose3 = req.body.chooose3
  user.save()
  res.status(202).send('User has picked his server')
}

exports.roombyId =  async (req, res) => {
  const data = await Server.findByPk(req.params.id, {
      include: User
  }) 
  res.send(data)
}