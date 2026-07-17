import express from 'express';
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menuController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);

// Admin routes
router.post('/', authMiddleware, createMenuItem);
router.put('/:id', authMiddleware, updateMenuItem);
router.delete('/:id', authMiddleware, deleteMenuItem);

export default router;