const express = require('express');
const cors = require('cors');
const products = require('./data/products'); // Ensure your file in /data is named products.js

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// GET all products from JSON
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  // Convert req.params.id to a Number to match the JSON data
  const product = products.find(p => p.id === Number(req.params.id));
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});