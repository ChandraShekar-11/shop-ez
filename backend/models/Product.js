const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0.0
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock count'],
    default: 0
  },
  images: {
    type: [String],
    default: []
  },
  rating: {
    type: Number,
    default: 0.0
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
