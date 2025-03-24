const express = require("express");
const router = express.Router();
const Booking = require("../models/BookingModel");

router.post("/:id", async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        booking.paymentStatus = "Paid";
        await booking.save();

        res.status(200).json({ message: "Payment successful!", booking });
    } catch (err) {
        res.status(500).json({ message: "Payment processing failed", error: err });
    }
});

module.exports = router;
