import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/v1/products');
        setProducts(res.data.data);
      } catch (err) {
        console.error('Error fetching products', err);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'products') {
      fetchProducts();
    }
  }, [user, navigate, activeTab]);

  const handleCreateDummyProduct = async () => {
    try {
      const dummyProduct = {
        name: 'New Premium Product',
        description: 'A newly created product from the admin dashboard.',
        category: 'Electronics',
        brand: 'ShopEZ Brand',
        price: 99.99,
        stock: 10,
      };
      await axios.post('/api/v1/products', dummyProduct);
      
      // Refetch
      const res = await axios.get('/api/v1/products');
      setProducts(res.data.data);
      alert('Product created successfully!');
    } catch (err) {
      console.error('Error creating product', err);
      alert('Failed to create product');
    }
  };

  return (
    <div className="mt-4">
      <h2 className="mb-4 fw-bold">Admin Dashboard</h2>
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'products' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'orders' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'users' ? 'active fw-bold' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === 'products' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Product Catalog</h4>
              <button className="btn btn-success" onClick={handleCreateDummyProduct}>
                + Create Dummy Product
              </button>
            </div>
            
            {loading ? (
              <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover shadow-sm rounded overflow-hidden">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>{product.stock}</td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-4">No products found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="alert alert-secondary">
            <h4 className="alert-heading">Order Management</h4>
            <p>This tab will display all orders placed across the platform. Admins can update order statuses (e.g., mark as Shipped or Delivered) from here.</p>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="alert alert-secondary">
            <h4 className="alert-heading">User Management</h4>
            <p>This tab will display all registered users. Admins can view user details, ban accounts, or elevate user roles.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
