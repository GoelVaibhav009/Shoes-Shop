const express = require('express')
const router = express.Router()

const Product = require('../models/Product')

// @desc   Admin Page
// @route  GET /
router.get('/', (req, res) => {
  res.send('Welcome To Admin Page')
})

// @desc   Add Product Details
// @route  Post /add
router.post('/add', async (req, res) => {
    try {
    //   req.body.user = req.user.id //Validation for checking user is login or not
      await Product.create(req.body)
      res.redirect('/')
    } catch (err) {
      console.error(err)
    }
})

module.exports = router