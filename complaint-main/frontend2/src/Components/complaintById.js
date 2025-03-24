import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../Styles/ComplaintDetails.css";

const ComplaintById = () => {
  const { id } = useParams();  // Get complaint ID from URL
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/complaints/${id}`);
        setComplaint(response.data.Complaint);  // ✅ Fix: Access "Complaint" instead of "complaint"
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching complaint details:", err);
        setError("Failed to fetch complaint details.");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  return (
    <div className="complaint-details">
      <h2>Complaint Details</h2>

      {loading && <p>Loading complaint details...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {complaint && (
        <div className="complaint-details-card">
          <p><strong>Complaint ID:</strong> {complaint.complaintid}</p>
          <p><strong>Service Name:</strong> {complaint.serviceName}</p>
          <p><strong>Service Provider:</strong> {complaint.serviceProvider}</p>
          <p><strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {complaint.location}</p>
          <p><strong>Booking ID:</strong> {complaint.bookingId}</p>
          <p><strong>Contact Number:</strong> {complaint.contactnumber}</p>
          <p><strong>Category:</strong> {complaint.complaintCategory}</p>
          <p><strong>Urgency Level:</strong> {complaint.urgencyLevel}</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintById;
