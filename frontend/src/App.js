import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import AdminBookings from "./components/AdminBookings";
import CustomerBookings from "./components/CustomerBookings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingForm />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/customer/bookings" element={<CustomerBookings />} /> 
      </Routes>
    </Router>
  );
}

export default App;
