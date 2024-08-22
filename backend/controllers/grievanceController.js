const multer = require('multer');
const Grievance = require('../models/Grievance');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
exports.submitGrievance = [
  upload.single('document'), // Middleware to handle file upload
  async (req, res) => {
    const { email, title, description, type } = req.body;

    // Log the received body for debugging
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    if (!email || !title || !description || !type) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const grievance = new Grievance({
        email,
        title,
        description,
        type,
        document: req.file ? req.file.path : null // Save document path if uploaded
      });

      await grievance.save();
      res.status(201).json(grievance);
    } catch (err) {
      console.error('Error submitting grievance:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
];


exports.getGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find();
    res.status(200).json(grievances);
  } catch (err) {
    console.error('Error fetching grievances:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateGrievanceStatus = async (req, res) => {
  try {
    const grievanceId = req.params.id;
    const status = req.body.status;

    console.log(`Received request to update grievance ID: ${grievanceId} with status: ${status}`); // Debugging

    const grievance = await Grievance.findByIdAndUpdate(grievanceId, { status }, { new: true });

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    res.json(grievance);
  } catch (err) {
    console.error('Error updating grievance status:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


