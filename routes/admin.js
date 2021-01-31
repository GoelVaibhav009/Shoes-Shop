const express = require('express')
const router = express.Router()

const Product = require('../models/Product')
const { adminAccess } = require('../middlewares/admin')

// @desc    Show all Products
// @route   GET /admin
router.get('/', async (req, res) => {
  try {
    const product = await Product.find()

    res.send('Welcome to admin Page', product)

  } catch (err) {
    console.error(err)
  }
})


// @desc   Add Product
// @route  Post /admin/add
router.post('/add', adminAccess, async (req, res) => {
    try {
    //   req.body.user = req.user.id //Validation for checking user is login or not
      await Product.create(req.body)
      res.redirect('/')
    } catch (err) {
      console.error(err)
    }
})


// @desc    Search Product
// @route   GET /admin/:id
router.get('/:id', adminAccess, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)

    if (!product) {
      return res.send('error/404')
    }

    if (!req.product.productAvailability) {
      res.render('Stock Over')
    } else {
      res.send('product', product)
    }
  } catch (err) {
    console.error(err)
    res.send('error/404')
  }
})

// @desc    Show edit page
// @route   GET /admin/edit/:id
router.get('/edit/:id', adminAccess, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    })

    if (!product) {
      return res.send('error/404')
    } else {
      res.send(product)
    }

  } catch (err) {
    console.error(err)
    return res.send('error/500')
  }
})

// @desc    Update Product
// @route   PUT /admin/:id
router.put('/:id', adminAccess, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)

    if (!product) {
      return res.send('error/404')
    } else {
      product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
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

// @desc    Delete Product
// @route   DELETE /admin/:id
router.delete('/:id', adminAccess, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)

    if (!product) {
      return res.send('error/404')
    } else {
      await Product.remove({ _id: req.params.id })
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.send('error/500')
  }
})


module.exports = router