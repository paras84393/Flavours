import Reservation from '../models/Reservation.js';

// Get all reservations (Admin)
export const getAllReservations = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const reservations = await Reservation.find(filter).sort({ date: -1 });
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

// Get single reservation
export const getReservationById = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

// Create reservation (User)
export const createReservation = async (req, res, next) => {
  try {
    const { name, email, phone, date, time, guests, message } = req.body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const reservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
      message,
    });

    await reservation.save();

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};

// Update reservation status (Admin)
export const updateReservationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json({
      success: true,
      message: 'Reservation updated',
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};

// Delete reservation (Admin)
export const deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json({
      success: true,
      message: 'Reservation deleted',
    });
  } catch (error) {
    next(error);
  }
};