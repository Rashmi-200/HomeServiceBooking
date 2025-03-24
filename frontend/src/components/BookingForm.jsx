import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BookingForm.css";

const BookingForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [provider, setProvider] = useState("");
  const [providers, setProviders] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [price, setPrice] = useState(0);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (serviceType) {
      axios
        .get(`http://localhost:5000/api/bookings/providers/${serviceType}`)
        .then((res) => setProviders(res.data))
        .catch((err) => console.error("Error fetching providers:", err));
    }
  }, [serviceType]);

  useEffect(() => {
    if (startTime !== null && endTime !== null && startTime < endTime) {
      const hours = endTime - startTime;
      setTotalHours(hours);
      const providerInfo = providers.find((p) => p.name === provider);
      if (providerInfo) {
        setPrice(providerInfo.price * hours);
      }
    }
  }, [startTime, endTime, serviceType, provider, providers]);

  useEffect(() => {
    if (provider && serviceType && date) {
      axios
        .get(`http://localhost:5000/api/bookings/availability?provider=${provider}&serviceType=${serviceType}&date=${date}`)
        .then((res) => setBookedSlots(res.data))
        .catch((err) => console.error("Error fetching availability:", err));
    }
  }, [provider, serviceType, date]);

  const isSlotBooked = (hour) => {
    return bookedSlots.some((slot) => {
      const s = parseInt(slot.startTime);
      const e = parseInt(slot.endTime);
      return slot.date === date && hour >= s && hour <= e;
    });
  };

  const handleSlotClick = (hour) => {
    if (isSlotBooked(hour)) return;

    if (startTime === null || (startTime !== null && endTime !== null)) {
      setStartTime(hour);
      setEndTime(null);
    } else if (hour > startTime) {
      setEndTime(hour);
    } else {
      setStartTime(hour);
      setEndTime(null);
    }
  };
  //validations
  const validateInputs = () => {
    const phoneRegex = /^07\d{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;

    if (!customerName || !email || !phone || !address || !provider || !date || startTime === null || endTime === null || !cardNumber || !expiry || !cvv) {
      alert("Please complete all fields.");
      return false;
    }
    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      alert("Phone must be in Sri Lankan format: 07XXXXXXXX");
      return false;
    }
    if (!cardRegex.test(cardNumber.replace(/\s+/g, ''))) {
      alert("Card number must be 16 digits.");
      return false;
    }
    if (!expiryRegex.test(expiry)) {
      alert("Expiry must be in MM/YY format.");
      return false;
    }
    if (!cvvRegex.test(cvv)) {
      alert("CVV must be 3 digits.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const bookingData = {
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
      price,
      cardNumber,
      expiry,
      cvv,
    };

    try {
      await axios.post("http://localhost:5000/api/bookings", bookingData);
      alert("Booking successful!");
      window.location.reload();
    } catch (error) {
      console.error("Booking failed", error);
      alert("Booking failed");
    }
  };

  return (
    <div className="booking-form">
      <h2>Book a Service</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input placeholder="e.g., John Doe" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />

        <label>Email</label>
        <input type="email" placeholder="e.g., someone@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Phone</label>
        <input placeholder="e.g., 0771234567" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <label>Address</label>
        <input placeholder="e.g., No. 123, Galle Road, Colombo" value={address} onChange={(e) => setAddress(e.target.value)} required />

        <label>Service Type</label>
        <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} required>
          <option value="">Select</option>
          {['cleaning', 'painting', 'repair', 'electric', 'plumbing'].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label>Provider</label>
        <select value={provider} onChange={(e) => setProvider(e.target.value)} required>
          <option value="">Select</option>
          {providers.map((p, idx) => (
            <option key={idx} value={p.name}>{p.name}</option>
          ))}
        </select>

        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Select Time Slots</label>
        <div className="time-slots">
          {[...Array(24).keys()].map((hour) => {
            const isBooked = isSlotBooked(hour);
            const isInRange = startTime !== null && endTime !== null && hour >= startTime && hour <= endTime;
            const isSelectedStart = startTime === hour && endTime === null;
            const btnClass = isBooked
              ? "slot booked"
              : isInRange || isSelectedStart
              ? "slot selected"
              : "slot available";

            return (
              <button
                type="button"
                key={hour}
                className={btnClass}
                disabled={isBooked}
                onClick={() => handleSlotClick(hour)}
              >
                {hour}:00
              </button>
            );
          })}
        </div>

        <p>Total Hours: {totalHours}</p>
        <p>Total Price: LKR {price}</p>

        <h3>Payment Details</h3>
        <label>Card Number</label>
        <input placeholder="e.g., 1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />

        <label>Expiry (MM/YY)</label>
        <input placeholder="e.g., 08/26" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />

        <label>CVV</label>
        <input placeholder="e.g., 123" value={cvv} onChange={(e) => setCvv(e.target.value)} required />

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
