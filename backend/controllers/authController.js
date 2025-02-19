// backend/controllers/authController.js
import db from '../config/db.js'; // Ensure this is the correct path to your database configuration

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if the email exists in the customers table
    const [rows] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);

    console.log('Query Result:', rows); // Log the rows

    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: 'Email not found.' });
    }

    const customer = rows[0];

    // For testing purposes, the password is always "admin"
    if (password !== 'admin') {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    // Login successful
    res.status(200).json({ message: 'Login successful.', customer });
  } catch (err) {
    console.error('Error during login:', err); // Log the error
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};