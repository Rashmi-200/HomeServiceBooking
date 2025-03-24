import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../Styles/ComplaintList.css";
import Nav from './Nav';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:3000/complaints');
        setComplaints(response.data.complaints);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Failed to fetch complaints. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/complaints/${id}`);
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
    } catch (err) {
      console.error("Error deleting complaint:", err);
    }
  };

  return (
    <div>
      <Nav />
      <h2>Complaint List</h2>

      {loading && <p>Loading complaints...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && complaints.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Service Name</th>
              <th>Service Provider</th>
              <th>Date</th>
              <th>Location</th>
              <th>Booking ID</th>
              <th>Contact Number</th>
              <th>Category</th>
              <th>Urgency</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td>{complaint.complaintid}</td>
                <td>{complaint.serviceName}</td>
                <td>{complaint.serviceProvider}</td>
                <td>{new Date(complaint.date).toLocaleDateString()}</td>
                <td>{complaint.location}</td>
                <td>{complaint.bookingId}</td>
                <td>{complaint.contactnumber}</td>
                <td>{complaint.complaintCategory}</td>
                <td>{complaint.urgencyLevel}</td>
                <td>{complaint.Status}</td>
                <td>
                  <button onClick={() => handleDelete(complaint._id)} style={{ marginRight: "10px" }}>
                    Delete
                  </button>
                  <Link to={`/complaintlist/${complaint._id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No complaints found.</p>
      )}
    </div>
  );
};

export default ComplaintList;
