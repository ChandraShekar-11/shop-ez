import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/v1/products');
        setProducts(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="mb-4 fw-bold">Latest Products</h1>
      {loading ? (
        <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : products.length === 0 ? (
        <div className="alert alert-info">No products found.</div>
      ) : (
        <div className="row g-4">
          {products.map(product => (
            <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
