import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const ComplaintCard = ({ complaint }) => {
  const navigate = useNavigate(); // Create the navigate function

  const handleEdit = () => {
    // Navigate to the edit page with the complaint id as a URL parameter
    navigate(`/edit-complaint/${complaint._id}`);
  };

  return (
    <div className="complaint-card">
      
      <h3>Complaint ID: {complaint.complaintid}</h3>
      <p><strong>Service:</strong> {complaint.serviceName}</p>
      <p><strong>Provider:</strong> {complaint.serviceProvider}</p>
      <p><strong>Date:</strong> {new Date(complaint.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {complaint.location}</p>
      <p><strong>Booking ID:</strong>{complaint.bookingId}</p>
      <p><strong>Contact Number:</strong>{complaint.contactnumber}</p>
      <p><strong>Category:</strong> {complaint.complaintCategory}</p>
      <p><strong>Urgency:</strong> {complaint.urgencyLevel}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default ComplaintCard;
