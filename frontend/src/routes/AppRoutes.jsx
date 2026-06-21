import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import AdminDashboard from '../pages/AdminDashboard';
import UserDashboard from '../pages/UserDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      
      {/* Protected Routes (Placeholders) */}
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<UserDashboard />} />
      <Route path="/orders" element={<UserDashboard />} />

      {/* Admin Routes (Placeholders) */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminDashboard />} />
      <Route path="/admin/orders" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
