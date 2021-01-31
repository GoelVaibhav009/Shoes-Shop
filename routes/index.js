const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middlewares/auth')

// @desc   Login/Landing page
// @route  GET /
router.get('/',ensureGuest, function (req, res) {
    res.send('Login Page')
})

// @desc   Register page
// @route  GET /register
router.get('/register', ensureGuest, (req, res) => res.send('Register Page'));

// @desc   Dashboard
// @route  GET /dashboard
router.get('/dashboard',ensureAuth, (req, res) => {
    res.send('Welcome To Dashboard')
})

module.exports = router