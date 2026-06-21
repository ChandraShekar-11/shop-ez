import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2 className="mb-4">Your Shopping Cart is Empty</h2>
        <Link to="/products" className="btn btn-primary btn-lg">Browse Products</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 fw-bold">Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div key={item.product._id} className="card mb-3 shadow-sm border-0">
              <div className="row g-0 align-items-center p-3">
                <div className="col-md-2">
                  <img 
                    src={item.product.images?.[0] || 'https://via.placeholder.com/150'} 
                    alt={item.product.name} 
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-md-4 px-3">
                  <Link to={`/product/${item.product._id}`} className="text-decoration-none text-dark fw-bold">
                    {item.product.name}
                  </Link>
                </div>
                <div className="col-md-2 text-primary fw-bold">
                  ${item.product.price.toFixed(2)}
                </div>
                <div className="col-md-2">
                  <select 
                    className="form-select form-select-sm" 
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product._id, e.target.value)}
                  >
                    {[...Array(item.product.stock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2 text-end">
                  <button 
                    type="button" 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="card-title mb-4">Order Summary</h4>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="fw-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fs-5 fw-bold">Total</span>
                <span className="fs-5 fw-bold text-primary">${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                type="button" 
                className="btn btn-primary btn-lg w-100"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
