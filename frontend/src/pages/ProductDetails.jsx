import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { formatPrice } from '../utils/formatPrice'; // NEW: Import the currency helper

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch individual product details from the backend
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
      <div className="skeleton" style={{ width: '300px', height: '300px' }}></div>
    </div>
  );

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation back to Home */}
      <Link to="/" style={{ color: '#2874f0', textDecoration: 'none', fontWeight: 'bold' }}>
        ← Back to Results
      </Link>

      <div style={{ display: 'flex', gap: '60px', marginTop: '30px', flexWrap: 'wrap' }}>
        {/* Product Image Section */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img 
            src={product.images ? product.images[0] : product.thumbnail} 
            alt={product.title} 
            style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
          />
        </div>

        {/* Product Information Section */}
        <div style={{ flex: '1.5', minWidth: '300px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>{product.title}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <span style={{ background: '#388e3c', color: 'white', padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
              {product.rating} ★
            </span>
            <span style={{ color: '#878787' }}>{product.brand}</span>
          </div>

          {/* UPDATED: Price now uses Indian Rupee formatting */}
          <h2 style={{ color: '#212121', fontSize: '32px', marginBottom: '20px' }}>
            {formatPrice(product.price)}
          </h2>

          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
            <h4 style={{ marginBottom: '10px' }}>Description</h4>
            <p style={{ lineHeight: '1.6', color: '#444' }}>{product.description}</p>
          </div>

          <div style={{ marginTop: '30px' }}>
            <button 
              className="add-cart-btn" 
              style={{ padding: '15px 40px', fontSize: '16px', maxWidth: '300px' }}
              onClick={() => addToCart(product)} // Passes full object to state
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