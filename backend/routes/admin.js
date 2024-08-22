const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Grievance = require('../models/Grievance');
const authAdmin = require('../middleware/authAdmin'); // Make sure this middleware is properly set up

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        // Check for existing admin
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Sign token
        const token = jwt.sign({ id: admin._id }, 'yourSecretKey', { expiresIn: 3600 });
        res.json({ token, message: 'Login successful' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Fetch all grievances (Only accessible by admins)
router.get('/grievances', auth, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const grievances = await Grievance.find().populate('user', 'email');
        res.json(grievances);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch grievances' });
    }
});



// Mark a grievance as resolved (Only accessible by admins)
router.patch('/grievance/:id/status', authAdmin, async (req, res) => {
    console.log(`Request to update grievance ${req.params.id} with status ${req.body.status}`);
    try {
        const grievance = await Grievance.findById(req.params.id);
        if (!grievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }

        grievance.status = req.body.status;
        await grievance.save();

        res.json({ message: 'Status updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
