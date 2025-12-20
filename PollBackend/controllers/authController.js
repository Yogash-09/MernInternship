// controllers/authController.js
const User = require('../models/User');

// Simple in-memory storage for testing - make it global
global.users = global.users || [];

const register = async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Try MongoDB first, fallback to in-memory
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = new User({
        name,
        email,
        password,
        role: role || 'USER'
      });

      await user.save();
      console.log('User saved to MongoDB');

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (dbError) {
      console.log('MongoDB failed, using in-memory storage:', dbError.message);
      
      // Check if user exists in memory
      const existingUser = global.users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Add to in-memory storage
      const user = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role: role || 'USER'
      };
      global.users.push(user);
      console.log('User saved to memory:', user);

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    // Try MongoDB first, fallback to in-memory
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found in MongoDB, checking in-memory');
        throw new Error('Not found in DB');
      }

      if (password !== user.password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      console.log('Login successful via MongoDB');
      res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (dbError) {
      console.log('Checking in-memory storage. Users:', global.users);
      // Check in-memory storage
      const user = global.users.find(u => u.email === email);
      if (!user) {
        console.log('User not found in memory either');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      if (user.password !== password) {
        console.log('Password mismatch');
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      console.log('Login successful via in-memory storage');
      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUsers = (req, res) => {
  res.json({
    mongoUsers: 'Check MongoDB',
    memoryUsers: global.users
  });
};

module.exports = {
  register,
  login,
  getUsers
};