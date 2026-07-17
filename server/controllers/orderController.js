import Order from '../models/Order.js';

// Get all orders (Admin)
export const getAllOrders = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Get single order
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

// Create order (User)
export const createOrder = async (req, res, next) => {
  try {
    const { customerName, customerEmail, customerPhone, items, totalAmount, deliveryAddress, notes } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !items || !totalAmount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      items,
      totalAmount,
      deliveryAddress,
      notes,
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Processing', 'Ready', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      success: true,
      message: 'Order updated',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// Delete order (Admin)
export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      success: true,
      message: 'Order deleted',
    });
  } catch (error) {
    next(error);
  }
};

// Get dashboard stats (Admin)
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalReservations = await Reservation.countDocuments();
    const totalMenuItems = await MenuItem.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    res.json({
      totalOrders,
      totalReservations,
      totalMenuItems,
      totalRevenue: totalRevenue?.total || 0,
    });
  } catch (error) {
    next(error);
  }
};