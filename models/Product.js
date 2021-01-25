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
    type: Float32Array,
    required: true,
  },
  productSalePrice: {
    type: Float32Array,
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Products', ProductSchema)