import express from 'express';
import { getProducts, getProductById, createProduct ,getVocabulary} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/vocabulary', getVocabulary);
router.get('/:id', getProductById);
router.post('/', protect, admin, createProduct);

export default router;