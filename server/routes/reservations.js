import express from 'express';
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservationStatus,
  deleteReservation,
} from '../controllers/reservationController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', createReservation);

// Admin routes
router.get('/', authMiddleware, getAllReservations);
router.get('/:id', authMiddleware, getReservationById);
router.put('/:id', authMiddleware, updateReservationStatus);
router.delete('/:id', authMiddleware, deleteReservation);

export default router;