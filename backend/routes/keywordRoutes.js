// backend/routes/keywordRoutes.js
import express from 'express';
import { getKeywords } from '../controllers/keywordController.js';

const router = express.Router();

// GET /api/keywords
router.get('/', getKeywords);

export default router;