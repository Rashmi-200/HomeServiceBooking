const express = require("express");
const {
    createBooking,
    getAllBookings,
    getBookingById,
    getProviderAvailability,
    updateBooking,
    deleteBooking
} = require("../controllers/bookingControllers");

const { providerList } = require("../helpers/pricingHelper");

const router = express.Router();

//Create a new booking
router.post("/", createBooking);

//Get all bookings
router.get("/", getAllBookings);

//Get a single booking by ID
router.get("/:id", getBookingById);

//Get provider availability
router.get("/availability", getProviderAvailability);

//Get provider list based on service type
router.get("/providers/:serviceType", (req, res) => {
    const serviceType = req.params.serviceType;
    if (!providerList[serviceType]) {
        return res.status(400).json({ error: "Invalid service type" });
    }
    res.json(providerList[serviceType]);
});

//Update a booking
router.put("/:id", updateBooking);

//Delete a booking
router.delete("/:id", deleteBooking);

module.exports = router;
