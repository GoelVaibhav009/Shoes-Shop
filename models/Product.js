const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: true,
    trim: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productMrp: {
    type: Number,
    required: true,
  },
  productSalePrice: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: String,
    default: 'sleepers',
    enum: ['sleepers', 'shoes'],
  },
  productAvailability: {
    type: Boolean,
    default: true,
  },
  productFavorite: {
    type: Boolean,
    default: false,
  },
  productCreatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Products', ProductSchema)