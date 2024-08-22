const express = require('express');
const router = express.Router();
const Grievance = require('../models/Grievance');
const User = require('../models/User');
const HelpArticle = require('../models/HelpArticle');


router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;

        const grievances = await Grievance.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { type: { $regex: query, $options: 'i' } }
            ]
        });

        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        });

        const helpArticles = await HelpArticle.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        });

        res.json({
            grievances,
            users,
            helpArticles
        });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
