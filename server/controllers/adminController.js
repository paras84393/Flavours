import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

// Admin Login
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // For demo purposes, accept hardcoded credentials
    const DEMO_EMAIL = 'admin@lalchutney.com';
    const DEMO_PASSWORD = 'admin123';

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      // Create JWT token
      const token = jwt.sign(
        { id: 'admin-1', email: email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        admin: {
          id: 'admin-1',
          email: email,
          name: 'Admin',
        },
      });
    }

    // Also check database if admin exists
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = await admin.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin Register (for setup only)
export const adminRegister = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = new Admin({
      email,
      password,
      name,
    });

    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Admin Profile
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (error) {
    next(error);
  }
};