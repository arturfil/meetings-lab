// imports 
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()


// db connetion
mongoose
.connect(proccess.env.MONGODB_URL)
.then(() => console.log('DB connected...'))
.catch(() => console.log('Could not connect to DB'))


//middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


// routes
app.use('/api/auth', require('./routes/user.js'))
app.use('/api/meetings', require('./routes/meeting.js'))


// listen to port
app.listen(5000, () => {
    console.log("Server up and running...")
})