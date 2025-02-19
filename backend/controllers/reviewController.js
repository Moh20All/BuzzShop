// reviewController.js
import db from '../config/db.js';

// Get Reviews by Product ID
export const getReviewsByProductId = async (req, res) => {
  const { product_id } = req.params;

  try {
    // Query to fetch reviews for the given product_id
    const [reviews] = await db.query(
      `
      SELECT 
        review_id,
        product_id,
        customer_id,
        rating,
        review_text,
        DATE_FORMAT(review_date, '%Y-%m-%d') AS review_date
      FROM reviews
      WHERE product_id = ?
      `,
      [product_id]
    );

    // Return the reviews
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};