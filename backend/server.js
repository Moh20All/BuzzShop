import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Import authRoutes
import keywordRoutes from './routes/keywordRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes); // Use authRoutes
app.use('/api/keywords', keywordRoutes);
app.use('/api/admin', adminRoutes);

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));