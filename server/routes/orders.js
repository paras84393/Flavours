import express from 'express';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getDashboardStats,
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', createOrder);

// Admin routes
router.get('/', authMiddleware, getAllOrders);
router.get('/stats/dashboard', authMiddleware, getDashboardStats);
router.get('/:id', authMiddleware, getOrderById);
router.put('/:id', authMiddleware, updateOrderStatus);
router.delete('/:id', authMiddleware, deleteOrder);

export default router;