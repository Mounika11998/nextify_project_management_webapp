const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database connection and model
const connectDB = require('./config/database');
const Product = require('./models/Product');
const Category = require('./models/category');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes

// GET /api/products - Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { sortBy = 'createdAt', order = 'desc', search } = req.query;
    
    let query = {};
    
    // Search functionality (optional)
    if (search) {
      query = {
        name: { $regex: search, $options: 'i' }
      };
    }
    
    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;
    
    const products = await Product.find(query).sort(sortOptions);
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// GET /api/products/:id - Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
});

// POST /api/products - Add new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    
    // Basic validation
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, price, description, category'
      });
    }
    
    const product = new Product({
      name,
      price: parseFloat(price),
      description,
      category
    });
    
    const savedProduct = await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
});

// PUT /api/products/:id - Update product (Nice to have)
app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price: parseFloat(price),
        description,
        category
      },
      {
        new: true, // Return updated document
        runValidators: true // Run schema validations
      }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
});

// DELETE /api/products/:id - Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: product
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
});

// ================= CATEGORY ROUTES =================

// GET /api/categories - Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const { sortBy = 'createdAt', order = 'desc', search } = req.query;

    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: 'i' } };
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    const categories = await Category.find(query).sort(sortOptions);

    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories', error: error.message });
  }
});

// GET /api/categories/:id - Get single category
app.get('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch category', error: error.message });
  }
});

// POST /api/categories - Create new category
app.post('/api/categories', async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const category = new Category({ name, description });
    const savedCategory = await category.save();

    res.status(201).json({ success: true, message: 'Category created successfully', data: savedCategory });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ success: false, message: 'Failed to create category', error: error.message });
  }
});

// PUT /api/categories/:id - Update category
app.put('/api/categories/:id', async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, message: 'Category updated successfully', data: category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ success: false, message: 'Failed to update category', error: error.message });
  }
});

// DELETE /api/categories/:id - Delete category
app.delete('/api/categories/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Optionally: delete all products under this category
    // await Product.deleteMany({ category: category._id });

    res.json({ success: true, message: 'Category deleted successfully', data: category });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ success: false, message: 'Failed to delete category', error: error.message });
  }
});


// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Product Management API is running!',
    endpoints: {
      'GET /api/products': 'Get all products (supports ?sortBy=price&order=asc&search=name)',
      'GET /api/products/:id': 'Get single product',
      'POST /api/products': 'Create new product',
      'PUT /api/products/:id': 'Update product',
      'DELETE /api/products/:id': 'Delete product'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Connect to MongoDB and start server
const startServer = async () => {
  await connectDB();
  
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}`);
  });
};

// Start the application
startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});