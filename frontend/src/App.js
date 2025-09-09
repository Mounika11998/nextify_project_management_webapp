import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ListProducts from './pages/products/ListProducts';
import EditProduct from './pages/products/EditProduct';
import ListCategories from './pages/categories/ListCategories';
import EditCategory from './pages/categories/EditCategory';
import { apiGet, apiPost, apiPut, apiDelete } from './services/api';

function App() {
  const [categories, setCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    Promise.all([apiGet('/api/categories'), apiGet('/api/products')])
      .then((res) => {
        if (!isMounted) return;
        const cats = Array.isArray(res?.[0]?.data) ? res[0].data : [];
        const prods = Array.isArray(res?.[1]?.data) ? res[1].data : [];
        setCategories(cats);
        setProducts(prods);
      })
      .catch(() => {})
      .finally(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Query products with optional search/sort
  const handleQueryProducts = async ({ search = '', sortBy = 'createdAt', order = 'desc' } = {}) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (sortBy) params.append('sortBy', sortBy);
    if (order) params.append('order', order);
    const res = await apiGet(`/api/products?${params.toString()}`);
    const items = Array.isArray(res?.data) ? res.data : [];
    setProducts(items);
  };

  // Product handlers
  const handleCreateProduct = async (data) => {
    const saved = await apiPost('/api/products', data);
    if (saved?.data) setProducts((prev) => [...prev, saved.data]);
  };

  const handleUpdateProduct = async (id, data) => {
    const saved = await apiPut(`/api/products/${id}`, data);
    if (saved?.data) setProducts((prev) => prev.map((p) => (p._id === id ? saved.data : p)));
  };

  const handleDeleteProduct = async (id) => {
    await apiDelete(`/api/products/${id}`);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  // Category handlers
  const handleCreateCategory = async (data) => {
    const saved = await apiPost('/api/categories', data);
    if (saved?.data) setCategories((prev) => [...prev, saved.data]);
  };

  const handleUpdateCategory = async (id, data) => {
    const saved = await apiPut(`/api/categories/${id}`, data);
    if (saved?.data) setCategories((prev) => prev.map((c) => (c._id === id ? saved.data : c)));
  };

  const handleDeleteCategory = async (id) => {
    await apiDelete(`/api/categories/${id}`);
    setCategories((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ListProducts products={products} onDeleteProduct={handleDeleteProduct} onQueryProducts={handleQueryProducts} />} />
        <Route path="/products/:id/edit" element={<EditProduct categories={categories} products={products} onCreate={handleCreateProduct} onUpdate={handleUpdateProduct} />} />
        <Route path="/products/new" element={<EditProduct categories={categories} products={products} onCreate={handleCreateProduct} onUpdate={handleUpdateProduct} />} />
        <Route path="/categories" element={<ListCategories categories={categories} onDeleteCategory={handleDeleteCategory} />} />
        <Route path="/categories/:id/edit" element={<EditCategory onCreate={handleCreateCategory} onUpdate={handleUpdateCategory} categories={categories} />} />
        <Route path="/categories/new" element={<EditCategory onCreate={handleCreateCategory} onUpdate={handleUpdateCategory} categories={categories} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
