import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CustomerBookings.css";

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Simulated email (in real app, this would come from logged-in user)
  useEffect(() => {
    const storedEmail = localStorage.getItem("customerEmail") || "janidu@example.com";
    setEmail(storedEmail);
  }, []);

  // Fetch all bookings and filter by customer email
  useEffect(() => {
    if (email) {
      axios.get("http://localhost:5000/api/bookings").then((res) => {
        const filtered = res.data.filter((b) => b.email === email);
        setBookings(filtered);
      });
    }
  }, [email]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    await axios.delete(`http://localhost:5000/api/bookings/${id}`);
    setBookings((prev) => prev.filter((b) => b._id !== id));
    alert("Booking cancelled.");
  };

  const handleEdit = (booking) => {
    setEditingId(booking._id);
    setEditData({ date: booking.date, startTime: booking.startTime, endTime: booking.endTime });
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:5000/api/bookings/${id}`, editData);
    setEditingId(null);
    const updated = await axios.get("http://localhost:5000/api/bookings");
    const filtered = updated.data.filter((b) => b.email === email);
    setBookings(filtered);
    alert("Booking updated.");
  };

  return (
    <div className="customer-bookings">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Provider</th>
              <th>Date</th>
              <th>Time</th>
              <th>Hours</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.serviceType}</td>
                <td>{b.provider}</td>
                <td>
                  {editingId === b._id ? (
                    <input
                      type="date"
                      value={editData.date}
                      onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                    />
                  ) : (
                    b.date
                  )}
                </td>
                <td>
                  {editingId === b._id ? (
                    <>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        style={{ width: "45px" }}
                        value={editData.startTime}
                        onChange={(e) => setEditData({ ...editData, startTime: parseInt(e.target.value) })}
                      />
                      -
                      <input
                        type="number"
                        min="1"
                        max="24"
                        style={{ width: "45px" }}
                        value={editData.endTime}
                        onChange={(e) => setEditData({ ...editData, endTime: parseInt(e.target.value) })}
                      />
                    </>
                  ) : (
                    `${b.startTime}:00 - ${b.endTime}:00`
                  )}
                </td>
                <td>{b.totalHours}</td>
                <td>LKR {b.price}</td>
                <td>{b.paymentStatus}</td>
                <td>
                  {editingId === b._id ? (
                    <>
                      <button onClick={() => handleUpdate(b._id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(b)}>Update</button>
                      <button onClick={() => handleCancel(b._id)}>Cancel</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerBookings;
