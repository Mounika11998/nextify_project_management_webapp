// models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    }
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model('Category', categorySchema);
