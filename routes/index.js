const express = require('express')
const router = express.Router()

// @desc   Login/Landing page
// @route  GET /
router.get('/', function (req, res) {
    res.send('hello world')
  })
  
module.exports = router