// reviewRoutes.js
import express from 'express';
import { getReviewsByProductId } from '../controllers/reviewController.js';

const router = express.Router();

// GET /api/reviews/:product_id
router.get('/:product_id', getReviewsByProductId);

export default router;