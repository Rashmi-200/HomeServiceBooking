const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const Evidance = require('../Model/evidanceModel'); // ✅ Import corrected

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../images')); // Ensure directory exists
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({ storage, fileFilter });

// ✅ Route to Add a New Evidence Record
router.post('/add', upload.single('photo'), async (req, res) => {
    try {
        const { complaintId } = req.body;
        const photo = req.file ? req.file.filename : null;

        const newEvidance = new Evidance({ complaintId, photo });

        await newEvidance.save();
        res.json({ message: 'Evidence Added', evidance: newEvidance });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ Route to Get All Evidence Records with Image URLs
router.get('/', async (req, res) => {
    try {
        const evidences = await Evidance.find();
        const evidencesWithImages = evidences.map(evidence => ({
            ...evidence._doc,
            photoUrl: evidence.photo ? `http://localhost:3000/images/${evidence.photo}` : null
        }));

        res.json(evidencesWithImages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
