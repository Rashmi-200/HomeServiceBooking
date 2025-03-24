const { Booking, ProviderAvailability } = require("../models/BookingModel");
const { sendEmail } = require("../helpers/emailHelper");
const { calculatePrice } = require("../helpers/pricingHelper");

//Function to mask card number
const maskCardNumber = (cardNumber) => {
    return cardNumber.replace(/\d{4}(?=\d{8})/g, "**** ****");
};

//Create a new booking
const createBooking = async (req, res) => {
    try {
        const { customerName, email, phone, address, startTime, endTime, serviceType, provider, date, cardNumber } = req.body;

        if (startTime >= endTime) {
            return res.status(400).json({ error: "Invalid time range. End time must be after start time." });
        }

        const totalHours = endTime - startTime;

        //Check if provider is already booked
        const existingBooking = await ProviderAvailability.findOne({
            provider,
            serviceType,
            "bookedSlots.date": date,
            "bookedSlots.startTime": { $lt: endTime },
            "bookedSlots.endTime": { $gt: startTime }
        });

        if (existingBooking) {
            return res.status(400).json({ error: "Provider is already booked for this time slot." });
        }

        //Calculate price
        const totalPrice = calculatePrice(serviceType, provider, totalHours);
        const maskedCard = cardNumber ? maskCardNumber(cardNumber) : "";

        const booking = new Booking({
            customerName,
            email,
            phone,
            address,
            serviceType,
            provider,
            date,
            startTime,
            endTime,
            totalHours,
            price: totalPrice,
            cardNumberMasked: maskedCard,
            paymentStatus: "Paid"
        });

        await booking.save();

        // Update provider availability
        await ProviderAvailability.findOneAndUpdate(
            { provider, serviceType },
            { $push: { bookedSlots: { date, startTime, endTime } } },
            { upsert: true }
        );

        await sendEmail(email, "Booking Confirmation", `
            <h2>Booking Confirmed</h2>
            <p>Your booking for <strong>${serviceType}</strong> with <strong>${provider}</strong> is confirmed.</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${startTime}:00 - ${endTime}:00 (${totalHours} hours)</p>
            <p><strong>Total Price:</strong> LKR ${totalPrice}</p>
        `);

        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get a single booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get provider availability for a specific date only
const getProviderAvailability = async (req, res) => {
    try {
        const { provider, serviceType, date } = req.query;

        const availability = await ProviderAvailability.findOne({ provider, serviceType });
        if (!availability) return res.json([]);

        //Filter booked slots for the selected date
        const slotsForDate = availability.bookedSlots.filter(slot => slot.date === date);
        res.json(slotsForDate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Update a booking
const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const { startTime, endTime, serviceType, provider, email, date } = req.body;

        if (startTime >= endTime) {
            return res.status(400).json({ error: "Invalid time range. End time must be after start time." });
        }

        const totalHours = endTime - startTime;
        const newPrice = calculatePrice(serviceType, provider, totalHours);

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { ...req.body, totalHours, price: newPrice },
            { new: true }
        );

        await sendEmail(email, "Booking Updated", `
            <h2>Booking Updated</h2>
            <p>Your booking has been updated successfully.</p>
            <p><strong>New Date:</strong> ${date}</p>
            <p><strong>New Time:</strong> ${startTime}:00 - ${endTime}:00 (${totalHours} hours)</p>
            <p><strong>Total Price:</strong> LKR ${newPrice}</p>
        `);

        res.json({ message: "Booking updated successfully", updatedBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Delete a booking and free the time slot
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        await ProviderAvailability.findOneAndUpdate(
            { provider: booking.provider, serviceType: booking.serviceType },
            {
                $pull: {
                    bookedSlots: {
                        date: booking.date,
                        startTime: booking.startTime,
                        endTime: booking.endTime
                    }
                }
            }
        );

        await sendEmail(
            booking.email,
            "Booking Cancelled",
            `<h2>Your Booking Has Been Cancelled</h2>
             <p><strong>${booking.serviceType}</strong> with <strong>${booking.provider}</strong></p>
             <p><strong>Date:</strong> ${booking.date}</p>
             <p><strong>Time:</strong> ${booking.startTime}:00 to ${booking.endTime}:00</p>`
        );

        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    getProviderAvailability,
    updateBooking,
    deleteBooking
};
