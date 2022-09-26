const { hashSync, compareSync } = require("bcrypt")
const jwt  = require('jsonwebtoken')
const { User, Server , userHistory } = require("../models")
const user = require("../models/user")

// example testing awal
exports.protected = (req, res) => {
  console.log(req.user)

  res.send({
    message: 'ok'
  })
}

// register user
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

// login user
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

// lihat user yang ada
exports.getUser = async (req, res) => {
  const data = await User.findAll()
  res.send(data)
}

// membuat room server untuk role admin
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

// melihat room server
exports.getServer = async (req, res) => {
  const data = await Server.findAll()
  res.send(data)
}

// choose room server, sekaligus memilih gunting batu kertas
// saya belum berhasil membuat coding limitasi jumlah player yang bisa masuk di room server
exports.chooseServer = async (req, res) => {
  const user = await User.findByPk(req.user.id)
  // const server = await Server.findByPk(req.server.id) // < - saya comment aja soalnya error
  if(user.ServerId !== null && user.id.length > 2){
    return res.status(403).send('User has already picked his server')
  }

  // if(server.Users.length > 2){
  //   return res.status(403).send('the server has maximum user join') // < - saya comment aja soalnya error
  // }

  user.ServerId = req.body.ServerId
  user.choose1 = req.body.choose1
  user.choose2 = req.body.choose2
  user.choose3 = req.body.choose3
  user.save()
  res.status(202).send('User has picked his server')
}

// api untuk cek room server di isi oleh player mana saja 
exports.roombyId =  async (req, res) => {
  const data = await Server.findByPk(req.params.id, {
      include: User
  }) 
      res.send(data)
}



