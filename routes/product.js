const express = require('express')
const router = express.Router()

const Product = require('../models/Product')

// @desc    Show all Products
// @route   GET /admin
router.get('/', async (req, res) => {
    try {
      const product = await Product.find();
      res.send(product);
  
      res.send('Welcome to admin Page')
  
    } catch (err) {
      console.error(err)
    }
})

// @desc    Search Product
// @route   GET /admin/:id
router.get('/:id', async (req, res) => {
    try {
      let product = await Product.findById(req.params.id)
        
      if (!product) {
        return res.send('error/404')
      }
  
      if (!product.productAvailability) {
        res.send('Stock Over')
      } else {
        res.send(product)
      }
    } catch (err) {
      console.error(err)
      res.send('error/404')
    }
  })

  module.exports = router

