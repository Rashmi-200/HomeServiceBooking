import express from 'express';
import { 
  registerServiceProvider, 
  loginServiceProvider, 
  logoutServiceProvider, 
  uploadCertification,
  verifyCertification 
} from '../controllers/serviceProviderAuthController.js';
import { protect } from '../middlewares/authMiddleware.js';  // Authentication middleware
import upload from '../middlewares/fileUpload.js';  // File upload middleware

const router = express.Router();

// Service Provider routes
router.post('/register', registerServiceProvider);
router.post('/login', loginServiceProvider);
router.post('/logout', logoutServiceProvider);

// Route for uploading certifications (with file upload middleware and protect middleware)
// Route for uploading certifications (with file upload middleware and protect middleware)
router.post('/upload-certifications', protect, upload.single('certification'), uploadCertification);


// Route for verifying certification by admin
router.post('/verify-certification/:id', protect, verifyCertification);

export default router;
