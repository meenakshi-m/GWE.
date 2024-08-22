const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin'); // Adjust path as needed

mongoose.connect('mongodb://localhost:27017/grievance_app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const existingAdmin = await Admin.findOne({ username: 'admin' });
        
        if (existingAdmin) {
            console.log('Admin already exists');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('adminpassword', salt);
            const newAdmin = new Admin({
                username: 'admin',
                password: hashedPassword
            });
            await newAdmin.save();
            console.log('Admin created');
        }

        mongoose.connection.close();
    })
    .catch(err => console.error('Error:', err));
