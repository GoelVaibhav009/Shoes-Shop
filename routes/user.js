const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load User model
const User = require('../models/User');
const { ensureGuest } = require('../middlewares/auth')

// @desc   Register
// @route  post /user/register
router.post('/register', (req, res) => {
  // const user = await User.create(req.body)
  
  const { displayName,firstName,lastName, email, password, password2 } = req.body;

  if (!displayName || !email || !password || !password2) {
    res.send('Fill all fields')
  }

  if (password != password2) {
    res.send('password incorrect')
  }

  if (password.length < 6) {
    res.send('password length should be greater than 6')
  }

  User.findOne({ email: email }).then(user => {
    if (user) {
      res.send('Email already exists')
    } else {
      const newUser = new User({
        displayName,
        firstName,
        lastName,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.send('You are now registered and can log in');
              res.redirect('/');
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @desc   callback
// @route  Post /user
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;