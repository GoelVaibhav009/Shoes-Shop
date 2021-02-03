const express = require('express')
const router = express.Router()

const User = require('../models/User')

// @desc    Show all Users
// @route   GET /users
router.get('/', async (req, res) => {
    try {
      const user = await User.find();
      res.send(user);  
    } catch (err) {
      console.error(err)
    }
})

// @desc    Search User
// @route   GET /users/:id
router.get('/:id', async (req, res) => {
    try {
      let user = await User.findById(req.params.id)
        
      if (!user) {
        return res.send('error/404')
      } else {
        res.send(user)
      }
    } catch (err) {
      console.error(err)
      res.send('error/404')
    }
  })

  module.exports = router

