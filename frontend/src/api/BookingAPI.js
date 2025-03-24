import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

// Get all bookings (Admin View)
export const getAllBookings = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get a single booking by ID
export const getBookingById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Get provider availability
export const getProviderAvailability = async (provider, serviceType) => {
    const response = await axios.get(`${API_URL}/availability?provider=${provider}&serviceType=${serviceType}`);
    return response.data;
};

// Create a new booking
export const createBooking = async (bookingData) => {
    const response = await axios.post(API_URL, bookingData);
    return response.data;
};

// Update a booking
export const updateBooking = async (id, bookingData) => {
    const response = await axios.put(`${API_URL}/${id}`, bookingData);
    return response.data;
};

// Delete a booking
export const deleteBooking = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
