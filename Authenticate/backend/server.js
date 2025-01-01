const express = require('express')
const connectToMongoDB = require('./database/database')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./routes/AuthRoute')

const app = express()
require('dotenv').config()

const PORT  = process.env.PORT || 8000

app.get('/user', (req,res) =>{
    res.send("User data ")
})

app.use(bodyParser.json());
app.use(cors())
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(AuthRouter)

app.listen(PORT , ()=>{
    console.log('Server is running on Port : '+PORT)
})

connectToMongoDB()