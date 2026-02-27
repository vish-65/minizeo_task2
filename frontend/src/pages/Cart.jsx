import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice'; // NEW: Import the currency helper

const Cart = ({ cartItems, setCartItems }) => {
  // Logic to change quantity
  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  // Logic to remove an item
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculate total price using numeric values
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = Number(item.price) || 0;
    const itemQty = Number(item.qty) || 0;
    return acc + (itemPrice * itemQty);
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Your Cart is Empty</h2>
        <p style={{ margin: '10px 0 20px' }}>Looks like you haven't added anything yet.</p>
        <Link to="/" style={{ color: '#2874f0', fontWeight: 'bold', textDecoration: 'none' }}>Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="main-layout" style={{ flexWrap: 'wrap' }}>
      {/* List of Cart Items */}
      <div style={{ flex: 2, background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
        <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>Shopping Cart</h2>
        
        {cartItems.map(item => (
          <div key={item.id} style={{ display: 'flex', gap: '20px', padding: '20px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
            {/* Using .thumbnail to match your backend data structure */}
            <img src={item.thumbnail} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
            
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{item.title}</h4>
              <p style={{ color: '#388e3c', fontSize: '14px', fontWeight: '500' }}>In Stock</p>
              
              {/* UPDATED: Individual item price in Rupee format */}
              <p style={{ fontWeight: 'bold', marginTop: '5px' }}>{formatPrice(item.price)}</p>
              
              <button 
                onClick={() => removeItem(item.id)} 
                style={{ background: 'none', border: 'none', color: '#2874f0', cursor: 'pointer', padding: '10px 0 0 0', fontSize: '14px' }}
              >
                Delete
              </button>
            </div>

            {/* Quantity Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f0f2f2', padding: '5px 10px', borderRadius: '8px', border: '1px solid #d5d9d9' }}>
              <button onClick={() => updateQty(item.id, -1)} style={{ border: 'none', cursor: 'pointer', background: 'none', fontWeight: 'bold' }}>-</button>
              <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
              <button onClick={() => updateQty(item.id, 1)} style={{ border: 'none', cursor: 'pointer', background: 'none', fontWeight: 'bold' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary Section */}
      <div style={{ flex: 1, minWidth: '300px', background: 'white', padding: '20px', borderRadius: '8px', height: 'fit-content', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Subtotal ({cartItems.length} items):</h3>
        
        {/* UPDATED: Total subtotal in Rupee format */}
        <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#B12704' }}>
          {formatPrice(subtotal)}
        </p>
        
        <button 
          className="add-cart-btn" 
          style={{ background: '#FFD814', color: 'black', border: '1px solid #FCD200', padding: '12px' }}
          onClick={() => alert('Proceeding to payment gateway...')}
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
};

export default Cart;