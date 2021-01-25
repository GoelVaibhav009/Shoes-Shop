const express = require('express')
const router = express.Router()

const Product = require('../models/Product')

// @desc   Login/Landing page
// @route  GET /
router.get('/', function (req, res) {
    res.send('Welcome To Dashboard')
})

// @desc   Add Product Details
// @route  Post /add
router.post('/add',async (req,res) => {
    const addProduct = new Product({
        productTitle: req.body.productTitle,
        productDescription: req.body.productDescription,
        productMrp: req.body.productMrp,
        productSalePrice: req.body.productSalePrice,
        productCategory: req.body.productCategory,
        productAvailability: req.body.productAvailability,
        productFavorite: req.body.productFavorite,
        productCreatedAt: req.body.productCreatedAt,
    });
    try{
        const savedProduct = await addProduct.save();
        res.json(savedProduct);
    }catch(err){
        res.json({message: err});
    }
     
});

module.exports = router