const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');


const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ success: false, message: 'User already exists' });
      }

      user = new User({ username, email, password });
      await user.save();

      res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
        const token = jwt.sign(payload, 'secretToken', { expiresIn: '1h' });

        res.json({ success: true, token, isAdmin: user.isAdmin });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


module.exports = router;
