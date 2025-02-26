import db from '../config/db.js';

// Get All Products with Pagination
export const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 500;
  const offset = (page - 1) * limit;

  try {
    const [products] = await db.query(
      'SELECT product_id, product_name, category, price, supplier_id FROM commerce.products LIMIT ? OFFSET ?',
      [limit, offset]
    );
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Product by ID
export const getProductById = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const [product] = await db.query(
      'SELECT product_id, product_name, category, price, supplier_id FROM commerce.products WHERE product_id = ?',
      [productId]
    );
    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product[0]);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create Product (Admin Only)
export const createProduct = async (req, res) => {
  const { product_name, category, price, supplier_id } = req.body;

  // Basic input validation
  if (!product_name || !category || !price || !supplier_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO commerce.products (product_name, category, price, supplier_id) VALUES (?, ?, ?, ?)',
      [product_name, category, price, supplier_id]
    );
    res.status(201).json({ id: result.insertId, message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const getVocabulary = async (req, res) => {
  try {
    console.log('Fetching product names...');
    const [products] = await db.query(
      'SELECT product_name FROM products'
    );
    console.log('Products fetched:', products);

    const vocabularySet = new Set();
    products.forEach((product) => {
      const words = product.product_name.toLowerCase().split(/\s+/);
      words.forEach((word) => vocabularySet.add(word));
    });

    const vocabulary = Array.from(vocabularySet);
    console.log('Vocabulary:', vocabulary);

    res.json({ vocabulary });
  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    res.status(500).json({ message: 'Server error' });
  }
};