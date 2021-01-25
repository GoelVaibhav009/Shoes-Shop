const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

const connectDB = require('./config/db')

//Load config
dotenv.config({ path: 'config/config.env'})

// Connecting DB
connectDB()

// Make app
const app = express()

// Static folder
app.use(express.static(path.join(__dirname, 'public'))) 

// Routes
app.use('/', require('./routes/index'))


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))