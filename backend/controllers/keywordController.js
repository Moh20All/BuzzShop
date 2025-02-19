// backend/controllers/keywordController.js
import db from '../config/db.js';

export const getKeywords = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT product_name FROM products');
    const keywords = rows.map((row) => row.product_name);
    res.json(keywords);
  } catch (err) {
    console.error('Error fetching keywords:', err);
    res.status(500).json({ message: 'An error occurred while fetching keywords.' });
  }
};