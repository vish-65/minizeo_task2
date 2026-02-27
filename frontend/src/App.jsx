import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);

  // TASK 2: Improved Cart Logic to prevent duplicates
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => item.id === product.id);
      if (exist) {
        // If already present -> increase quantity
        return prevItems.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
        );
      }
      // If new -> add to cart with qty 1
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Router>
      <header style={{ background: '#2874f0', width: '100%', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>MyStore</Link>
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <span style={{ fontSize: '18px' }}>🛒 Cart</span>
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: '-12px', right: '-15px', background: '#ff9f00', border: '1px solid white', borderRadius: '50%', minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;