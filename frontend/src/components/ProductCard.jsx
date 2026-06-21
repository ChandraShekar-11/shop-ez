import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img 
        src={product?.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'} 
        className="card-img-top" 
        alt={product?.name || 'Product'} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{product?.name || 'Product Name'}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{product?.brand || 'Brand'}</h6>
        <p className="card-text text-truncate">{product?.description || 'No description available'}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fs-5 fw-bold text-primary">${product?.price?.toFixed(2) || '0.00'}</span>
          <Link to={`/product/${product?._id}`} className="btn btn-outline-primary btn-sm">View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
