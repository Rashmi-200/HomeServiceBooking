import serviceProviderModel from '../models/serProModel.js';

// Verify Certification (Admin Only)
export const verifyCertification = async (req, res) => {
    const { providerId } = req.params;
    const { isVerified } = req.body;  // Boolean input from Admin

    try {
        const serviceProvider = await serviceProviderModel.findById(providerId);

        if (!serviceProvider) {
            return res.status(404).json({ success: false, message: 'Service provider not found' });
        }

        serviceProvider.isCertificationVerified = isVerified;  // ✅ Corrected Field Name
        await serviceProvider.save();

        return res.status(200).json({ success: true, message: 'Certification verification updated successfully' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
