import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/v1/orders/myorders');
        setOrders(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <div className="row mt-4">
      <div className="col-md-3">
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body">
            <h4 className="card-title text-primary">Profile</h4>
            <hr />
            <p className="mb-1"><strong>Name:</strong> {user?.name}</p>
            <p className="mb-1"><strong>Email:</strong> {user?.email}</p>
            <p className="mb-1"><strong>Role:</strong> <span className="badge bg-secondary">{user?.role}</span></p>
          </div>
        </div>
      </div>
      
      <div className="col-md-9">
        <h2 className="mb-4 fw-bold">My Orders</h2>
        
        {loading ? (
          <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : orders.length === 0 ? (
          <div className="alert alert-info">
            You have no past orders. <Link to="/products" className="alert-link">Start shopping!</Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover shadow-sm rounded overflow-hidden">
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${order.paymentStatus === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${order.orderStatus === 'Delivered' ? 'bg-success' : 'bg-info'}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
