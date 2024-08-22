const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Grievance = require('../models/Grievance');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin'); // Add this line to include the middleware

// Import the middleware


// Multer configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = function(req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb(new Error('Only images and PDFs are allowed'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

// Fetch grievances by user's email
router.get('/grievances', auth, async (req, res) => {
    try {
        const email = req.user.email; // Assuming req.user contains the authenticated user's info
        const grievances = await Grievance.find({ user: email });
        res.json(grievances);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch grievances' });
    }
});


// Grievance submission route
router.post('/grievances', auth, upload.single('supportingDocument'), async (req, res) => {
    try {
        const { grievance } = req.body;

        if (!grievance) {
            return res.status(400).json({ success: false, message: 'Grievance description is required' });
        }

        const newGrievance = new Grievance({
            user: req.user.id,
            grievance,
            supportingDocument: req.file ? req.file.filename : null
        });

        await newGrievance.save();

        res.status(201).json({ success: true, message: 'Grievance submitted successfully' });
    } catch (err) {
        console.error('Error submitting grievance:', err);
        res.status(500).json({ success: false, message: err.message || 'Server error' });
    }
});

// routes/grievance.js
router.get('/user-grievances', auth, async (req, res) => {
    try {
        const grievances = await Grievance.find({ user: req.user.id });
        res.status(200).json({ success: true, grievances });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


router.get('/grievances', authAdmin, async (req, res) => {
    try {
        const grievances = await Grievance.find().populate('user', 'email _id'); // Populating user details
        res.json(grievances);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
