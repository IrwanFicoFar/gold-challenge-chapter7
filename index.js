const express = require ('express')
const passport = require('passport')
const apiRouter = require('./routers/api')
const pageRouter = require('./routers/page')
require('./utils/passport')

const app = express()
const port = 4040 

app.use('/js',express.static(__dirname+'/js'))
app.set('view engine','ejs')
app.use(passport.initialize())
app.use(apiRouter)
app.use(pageRouter)

app.listen(port, () => {
    console.log (`App is running at port ${port}`)
})