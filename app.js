const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo') (session)

const connectDB = require('./config/db')

//Load config
dotenv.config({ path: 'config/config.env'})

//Passport Config
require('./config/passport')(passport)

// Connecting DB

connectDB()
// Make app
const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Sessions
app.use(session({
    secret: 'Hello',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection})
}))

//Passport middlewares
app.use(passport.initialize())
app.use(passport.session())

//Auth Middleware
// const { adminAccess } = require('./middlewares/admin')

// Static folder
app.use(express.static(path.join(__dirname, 'public'))) 

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/register', require('./routes/register'))
app.use('/admin', require('./routes/admin'))
app.use('/products',require('./routes/product'))


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))