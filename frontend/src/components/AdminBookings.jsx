import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminBookings.css";

const serviceTypes = ["cleaning", "painting", "repair", "electric", "plumbing"];

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [providersList, setProvidersList] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      fetchBookings();
      alert("Booking deleted.");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = async (booking) => {
    setEditing(booking._id);
    setEditData({ ...booking });
    const res = await axios.get(`http://localhost:5000/api/bookings/providers/${booking.serviceType}`);
    setProvidersList(res.data);
  };

  const handleUpdate = async (id) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^07\d{8}$/;

    if (
      !editData.customerName ||
      !editData.email ||
      !editData.phone ||
      !editData.address ||
      !editData.provider ||
      !editData.date ||
      editData.startTime === null ||
      editData.endTime === null
    ) {
      alert("Please complete all required fields.");
      return;
    }
    if (!emailRegex.test(editData.email)) {
      alert("Invalid email format.");
      return;
    }
    if (!phoneRegex.test(editData.phone)) {
      alert("Phone must be in Sri Lankan format: 07XXXXXXXX");
      return;
    }

    try {
      const totalHours = editData.endTime - editData.startTime;
      const selectedProvider = providersList.find((p) => p.name === editData.provider);
      const newPrice = selectedProvider ? selectedProvider.price * totalHours : 0;

      const updated = {
        ...editData,
        totalHours,
        price: newPrice
      };

      await axios.put(`http://localhost:5000/api/bookings/${id}`, updated);
      setEditing(null);
      fetchBookings();
      alert("Booking updated.");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDownload = (type) => {
    axios
      .get(`http://localhost:5000/api/reports/${type}`, { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `financial_report.${type === "pdf" ? "pdf" : "xlsx"}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.error("Download error", err));
  };

  const filtered = bookings.filter((b) => b._id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="admin-bookings">
      <h2>Admin Booking Management</h2>

      <div className="actions">
        <input
          type="text"
          placeholder="Search by Booking ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="download-popup-wrapper">
          <button className="download-btn" onClick={() => setShowPopup(!showPopup)}>
            Download Report
          </button>
          {showPopup && (
            <div className="download-popup">
              <button onClick={() => { handleDownload("pdf"); setShowPopup(false); }}>Download PDF</button>
              <button onClick={() => { handleDownload("excel"); setShowPopup(false); }}>Download Excel</button>
            </div>
          )}
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Service</th>
              <th>Provider</th>
              <th>Date</th>
              <th>Time</th>
              <th>Hours</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b._id}>
                <td>{b._id}</td>
                <td>
                  {editing === b._id ? (
                    <input value={editData.customerName} onChange={(e) => setEditData({ ...editData, customerName: e.target.value })} />
                  ) : (
                    b.customerName
                  )}
                </td>
                <td>
                  {editing === b._id ? (
                    <input value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                  ) : (
                    b.email
                  )}
                </td>
                <td>
                  {editing === b._id ? (
                    <input value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
                  ) : (
                    b.phone
                  )}
                </td>
                <td>
                  {editing === b._id ? (
                    <input value={editData.address} onChange={(e) => setEditData({ ...editData, address: e.target.value })} />
                  ) : (
                    b.address
                  )}
                </td>
                <td>
                  {editing === b._id ? (
                    <select
                      value={editData.serviceType}
                      onChange={async (e) => {
                        const type = e.target.value;
                        const res = await axios.get(`http://localhost:5000/api/bookings/providers/${type}`);
                        setProvidersList(res.data);
                        setEditData({ ...editData, serviceType: type, provider: "" });
                      }}
                    >
                      <option value="">Select</option>
                      {serviceTypes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  ) : (
                    b.serviceType
                  )}
                </td>
                <td>
                  {editing === b._id ? (
                    <select
                      value={editData.provider}
                      onChange={(e) => setEditData({ ...editData, provider: e.target.value })}
                    >
                      <option value="">Select</option>
                      {providersList.map((p, i) => (
                        <option key={i} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  ) : (
                    b.provider
                  )}
                </td>
                <td>
                  {editing === b._id ? (
                    <input type="date" value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} />
                  ) : (
                    b.date
                  )}
                </td>
                <td>
                  {editing === b._id ? (
                    <>
                      <input
                        type="number"
                        style={{ width: "40px" }}
                        value={editData.startTime}
                        onChange={(e) => setEditData({ ...editData, startTime: parseInt(e.target.value) })}
                      /> -
                      <input
                        type="number"
                        style={{ width: "40px" }}
                        value={editData.endTime}
                        onChange={(e) => setEditData({ ...editData, endTime: parseInt(e.target.value) })}
                      />
                    </>
                  ) : (
                    `${b.startTime}:00 - ${b.endTime}:00`
                  )}
                </td>
                <td>{b.totalHours}</td>
                <td>{b.price}</td>
                <td>{b.paymentStatus}</td>
                <td>
                  {editing === b._id ? (
                    <>
                      <button onClick={() => handleUpdate(b._id)}>Save</button>
                      <button onClick={() => setEditing(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(b)}>Update</button>
                      <button onClick={() => handleDelete(b._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
