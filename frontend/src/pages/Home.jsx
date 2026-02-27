import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '../utils/formatPrice'; // NEW: Import the currency helper

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setTimeout(() => setLoading(false), 800); 
      })
      .catch(err => console.error("Error loading products:", err));
  }, []);

  // Combined logic for Search, Category, and Sorting
  const processedProducts = products
    .filter(p => (category === 'All' || p.category === category))
    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  if (loading) {
    return (
      <div className="main-layout">
        <div className="sidebar skeleton" style={{ height: '400px' }}></div>
        <div className="product-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="skeleton" style={{ height: '380px' }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="main-layout">
      <aside className="sidebar">
        {/* Search Input */}
        <div className="filter-group">
          <h4>Search Products</h4>
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="All">All Categories</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>

        <div className="filter-group">
          <h4>Sort By</h4>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="relevance">Relevance</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </aside>

      <motion.div layout className="product-grid">
        <AnimatePresence>
          {processedProducts.length > 0 ? (
            processedProducts.map(product => (
              <motion.div 
                layout 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                whileHover={{ y: -5 }} 
                key={product.id} 
                className="product-card"
              >
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="image-container">
                    <motion.img 
                      whileHover={{ scale: 1.08 }} 
                      src={product.thumbnail} //
                      alt={product.title} 
                    />
                  </div>
                  <div className="rating-badge">{product.rating} ★</div>
                  <div className="product-title">{product.title}</div>
                  {/* UPDATED: Price now uses Indian Rupee formatting */}
                  <div className="product-price">{formatPrice(product.price)}</div>
                </Link>
                <button 
                  className="add-cart-btn" 
                  onClick={(e) => {
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    addToCart(product); 
                  }}
                >
                  Add to Cart
                </button>
              </motion.div>
            ))
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', width: '100%' }}>
              No products match your search.
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Home;