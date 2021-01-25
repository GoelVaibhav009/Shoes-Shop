const express = require('express')
const router = express.Router()

// @desc   Login/Landing page
// @route  GET /
router.get('/', function (req, res) {
    res.send('Welcome To HariOm FootWear')
})

module.exports = router