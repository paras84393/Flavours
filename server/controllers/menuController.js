import MenuItem from '../models/MenuItem.js';

// Get all menu items
export const getAllMenuItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// Get single menu item
export const getMenuItemById = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Create menu item (Admin only)
export const createMenuItem = async (req, res, next) => {
  try {
    const { name, category, price, description, image, status } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Name, category, and price are required' });
    }

    const menuItem = new MenuItem({
      name,
      category,
      price,
      description,
      image,
      status,
    });

    await menuItem.save();
    res.status(201).json({
      success: true,
      message: 'Menu item created',
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

// Update menu item (Admin only)
export const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const menuItem = await MenuItem.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({
      success: true,
      message: 'Menu item updated',
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

// Delete menu item (Admin only)
export const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({
      success: true,
      message: 'Menu item deleted',
    });
  } catch (error) {
    next(error);
  }
};