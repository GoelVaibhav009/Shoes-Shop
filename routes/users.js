const express = require('express')
const router = express.Router()

const User = require('../models/User')
const { ensureAuth } = require('../middlewares/auth')

// @desc    Show all Users
// @route   GET /users
router.get('/',ensureAuth, async (req, res) => {
    try {
      const user = await User.find();
      res.send(user);  
    } catch (err) {
      console.error(err)
    }
})

// @desc    Search User
// @route   GET /users/:id
router.get('/:id',ensureAuth, async (req, res) => {
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

// @desc    Show edit page
// @route   GET /users/edit/:id
router.get('/edit/:id',ensureAuth, async (req, res) => {
    try {
      const user = await User.findOne({
        _id: req.params.id,
      })
      
      if (!user) {
        return res.send('error/404')
      } else {
        res.send(user)
      }
      
    } catch (err) {
      console.error(err)
      return res.send('error/500')
    }
  })
  
  // @desc   Add user
  // @route  Post /users/add
  router.post('/add',ensureAuth, async (req, res) => {
      try {
      //   req.body.user = req.user.id //Validation for checking user is login or not
        await User.create(req.body)
        res.redirect('/')
      } catch (err) {
        console.error(err)
      }
  })
  
  // @desc    Update user
  // @route   PUT /users/:id
  router.put('/:id',ensureAuth, async (req, res) => {
    try {
      let user = await User.findById(req.params.id)
      
      if (!user) {
        return res.send('error/404')
      } else {
        user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })
  
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.send('error/500')
    }
  })
  
  // @desc    Delete user
  // @route   DELETE /users/:id
  router.delete('/:id',ensureAuth, async (req, res) => {
    try {
      let user = await User.findById(req.params.id)
  
      if (!user) {
        return res.send('error/404')
      } else {
        await User.remove({ _id: req.params.id })
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.send('error/500')
    }
  })
  

  module.exports = router

