import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/v1/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <div className="alert alert-info">Product not found.</div>;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-4">&larr; Back to Products</Link>
      <div className="row">
        <div className="col-md-6 mb-4">
          <img 
            src={product.images?.[0] || 'https://via.placeholder.com/600x400?text=No+Image'} 
            alt={product.name} 
            className="img-fluid rounded shadow-sm w-100" 
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <h5 className="text-muted mb-3">{product.brand} | {product.category}</h5>
          
          <div className="d-flex align-items-center mb-3">
            <h3 className="text-primary me-3 fw-bold">${product.price.toFixed(2)}</h3>
            <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p className="lead">{product.description}</p>
          
          {product.stock > 0 && (
            <div className="mb-4">
              <label htmlFor="quantity" className="form-label fw-bold">Quantity:</label>
              <select 
                id="quantity" 
                className="form-select w-25" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(product.stock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>
          )}

          <hr className="my-4" />

          <div className="d-grid gap-2 col-md-6">
            <button 
              className="btn btn-primary btn-lg" 
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
