import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [user, cartItems, navigate]);

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        cartItems,
        shippingAddress
      };
      
      await axios.post('/api/v1/orders', orderData);
      
      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <h2 className="mb-4 fw-bold">Checkout</h2>
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h4 className="card-title mb-4">Shipping Address</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <form id="checkout-form" onSubmit={handlePlaceOrder}>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">City</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Postal Code</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Country</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="col-md-4">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h4 className="card-title mb-4">Order Summary</h4>
            {cartItems.map((item, index) => (
              <div key={index} className="d-flex justify-content-between mb-2">
                <span className="text-truncate" style={{ maxWidth: '200px' }}>
                  {item.quantity} x {item.product.name}
                </span>
                <span>${(item.quantity * item.product.price).toFixed(2)}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <span className="fs-5 fw-bold">Total</span>
              <span className="fs-5 fw-bold text-primary">${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              type="submit" 
              form="checkout-form"
              className="btn btn-primary btn-lg w-100"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
