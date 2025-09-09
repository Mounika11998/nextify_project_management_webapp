# Project Management Application

A full-stack web application for managing products and categories with a React frontend and Node.js/Express backend.

## Features

- **Product Management**: Create, read, update, and delete products
- **Category Management**: Create, read, update, and delete categories
- **Search & Sort**: Search products by name and sort by various fields
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Real-time Updates**: Toast notifications for user actions

## Tech Stack

### Frontend
- React 19.1.1
- React Router DOM 6.30.1
- React Toastify 10.0.6
- CSS3 for styling

### Backend
- Node.js
- Express.js 5.1.0
- MongoDB with Mongoose 8.18.0
- CORS for cross-origin requests
- Body-parser for request parsing

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local installation) or MongoDB Atlas account
- [Git](https://git-scm.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ProjectManagement
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

#### Environment Configuration

Create a `.env` file in the backend directory:

```bash
# Backend/.env
MONGODB_URI=mongodb://localhost:27017/productmanagement
PORT=8000
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```bash
# Backend/.env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/productmanagement?retryWrites=true&w=majority
PORT=8000
NODE_ENV=development
```

#### Start the Backend Server

```bash
# Development mode with auto-restart
npm run dev

# Or start normally
node server.js
```

The backend server will start on `http://localhost:8000`

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

#### Start the Frontend Development Server

```bash
npm start
```

The frontend application will start on `http://localhost:3000`

## Running the Application

### Option 1: Run Both Servers Separately

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm start
   ```

### Option 2: Using npm scripts (if configured)

You can add scripts to the root package.json to run both servers:

```bash
# Install concurrently for running both servers
npm install -g concurrently

# Run both frontend and backend
concurrently "cd backend && npm run dev" "cd frontend && npm start"
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (supports query parameters: `sortBy`, `order`, `search`)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories (supports query parameters: `sortBy`, `order`, `search`)
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Example API Usage

```bash
# Get all products
curl http://localhost:8000/api/products

# Get products sorted by price (ascending)
curl http://localhost:8000/api/products?sortBy=price&order=asc

# Search products by name
curl http://localhost:8000/api/products?search=laptop

# Create a new product
curl -X POST http://localhost:8000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro",
    "price": 1999.99,
    "description": "Apple MacBook Pro 13-inch",
    "category": "Electronics"
  }'
```

## Database Schema

### Product Model
```javascript
{
  name: String (required),
  price: Number (required),
  description: String (required),
  category: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  name: String (required),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
ProjectManagement/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── Product.js           # Product schema
│   │   └── Category.js          # Category schema
│   ├── server.js                # Express server setup
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js        # Navigation component
│   │   ├── pages/
│   │   │   ├── Dashboard.js     # Main dashboard
│   │   │   ├── products/
│   │   │   │   ├── ListProducts.js
│   │   │   │   └── EditProduct.js
│   │   │   └── categories/
│   │   │       ├── ListCategories.js
│   │   │       └── EditCategory.js
│   │   ├── services/
│   │   │   └── api.js           # API service functions
│   │   ├── App.js               # Main App component
│   │   └── index.js             # Entry point
│   └── package.json
└── README.md
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or check your Atlas connection string
   - Verify the MONGODB_URI in your .env file

2. **Port Already in Use**
   - Backend runs on port 8000, frontend on port 3000
   - Change the PORT in .env file if 8000 is occupied
   - For frontend, it will automatically suggest using a different port

3. **CORS Issues**
   - The backend is configured with CORS to allow requests from localhost:3000
   - If you change the frontend port, update the CORS configuration

4. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`, then run `npm install` again
   - Ensure you're using Node.js version 14 or higher

### Development Tips

- Use `npm run dev` for backend development (auto-restart on changes)
- The frontend will auto-reload when you make changes
- Check browser console and terminal for error messages
- Use Postman or curl to test API endpoints directly

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue in the repository or contact the development team.
