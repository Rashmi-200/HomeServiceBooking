import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import serviceProviderModel from '../models/serProModel.js';
import upload from '../middlewares/fileUpload.js';

// Register a new service provider
export const registerServiceProvider = async (req, res) => {
    const { fullName, email, password, phone, address, serviceType, experience } = req.body;

    if (!fullName || !email || !password || !phone || !address || !serviceType || !experience) {
        return res.status(400).json({ success: false, message: 'Missing details' });
    }

    try {
        const existingServiceProvider = await serviceProviderModel.findOne({ email });

        if (existingServiceProvider) {
            return res.status(409).json({ success: false, message: 'Service provider already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const serviceProvider = new serviceProviderModel({
            fullName,
            email,
            phone,
            address,
            serviceType,
            experience,
            password: hashedPassword,
        });

        await serviceProvider.save();

        const token = jwt.sign({ id: serviceProvider._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
        });

        return res.status(201).json({ success: true, message: 'Service provider registered successfully', token });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Login for a service provider
export const loginServiceProvider = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const serviceProvider = await serviceProviderModel.findOne({ email });

        if (!serviceProvider) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, serviceProvider.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: serviceProvider._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
        });

        return res.status(200).json({ success: true, message: 'Login successful', token });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Logout for a service provider
export const logoutServiceProvider = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.status(200).json({ success: true, message: 'Logged out successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


// Controller for uploading certifications
export const uploadCertification = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        // Assuming that req.user._id is set by the protect middleware
        const serviceProvider = await serviceProviderModel.findById(req.user._id);

        if (!serviceProvider) {
            return res.status(404).json({ success: false, message: 'Service provider not found' });
        }

        // Add the file URL to the certificationProofs array
        serviceProvider.certificationProofs.push(`/uploads/certifications/${req.file.filename}`);
        
        // Set the certification verification status to false initially
        serviceProvider.isCertificationVerified = false;

        // Set the certificationPending to true since the certification is awaiting approval
        serviceProvider.certificationPending = true;

        await serviceProvider.save();

        return res.status(200).json({
            success: true,
            message: 'Certification uploaded successfully. Awaiting verification.',
            certificationUrl: `/uploads/certifications/${req.file.filename}`,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



// Controller for verifying certifications
export const verifyCertification = async (req, res) => {
    try {
        const serviceProvider = await serviceProviderModel.findById(req.params.id);

        if (!serviceProvider) {
            return res.status(404).json({ success: false, message: 'Service provider not found' });
        }

        // Set certification as verified and set the certificationPending flag to false
        serviceProvider.isCertificationVerified = true;
        serviceProvider.certificationPending = false;

        await serviceProvider.save();

        return res.status(200).json({
            success: true,
            message: 'Certification verified successfully',
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

  