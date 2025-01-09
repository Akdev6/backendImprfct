const express=require('express') 
const userRegister = require('./controller/userController')
const loginUser = require('./controller/loginController')
const logoutUser = require('./controller/logoutController')
const referalSystem = require('./controller/referalController')
const cookie=require('cookie-parser')
const { leaderBoard } = require('./controller/leaderBoardController')
const cors=require('cors')
const { findUser } = require('./controller/findUserController')

const app=express()
app.use(cookie())
app.use(express.json())
app.use(cors())

const route=express.Router()

route.post('/userregister',userRegister)
route.post('/loginUser',loginUser)
route.post('/logoutUser',logoutUser)
route.post('/referalSystem/:referralCode',referalSystem)
route.get('/leaderBoard',leaderBoard)
route.post('/findUser',findUser)
app.use(route)

module.exports=app