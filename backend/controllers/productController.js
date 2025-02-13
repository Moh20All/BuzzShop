import db from '../config/db.js';

// Get All Products
export const getProducts = async (req, res) => {
    console.log(true)
  try {
    const [products] = await db.query('SELECT * FROM products LIMIT 300');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Product by ID
export const getProductById = async (req, res) => {
  try {
    const [product] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log(product[0])
    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create Product (Admin Only)
export const createProduct = async (req, res) => {
  const { url, name, size, category, price, color, sku, description, image, stock } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO products (url, name, size, category, price, color, sku, description, image, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [url, name, size, category, price, color, sku, description, image, stock]
    );
    res.status(201).json({ id: result.insertId, message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};