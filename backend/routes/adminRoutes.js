import express from 'express';
import { getCustomers, getShipments,getOrdersByClientId } from '../controllers/adminController.js';

const router = express.Router();

// Fetch Customers Information
router.get('/customers', getCustomers);

// Fetch Shipments Information
router.get('/shipments', getShipments);
// Fetch orders by client 
router.get('/orders/:clientId', getOrdersByClientId);

export default router;