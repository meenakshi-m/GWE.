const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming there's a User model
        required: true
    },
    grievance: { type: String, required: true },
    supportingDocument: { type: String },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grievance', grievanceSchema);

