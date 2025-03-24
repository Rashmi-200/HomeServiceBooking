import React from 'react';
import "../Styles/ComplaintDetails.css";

const ComplaintDetails = ({ complaint }) => {
  return (
    <div className="complaint-details">
      <h2>Complaint Details</h2>
      <p><strong>Complaint ID:</strong> {complaint.complaintid}</p>
      <p><strong>Service Name:</strong> {complaint.serviceName}</p>
      <p><strong>Service Provider:</strong> {complaint.serviceProvider}</p>
      <p><strong>Date:</strong> {new Date(complaint.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {complaint.location}</p>
      <p><strong>Booking ID:</strong> {complaint.bookingId}</p>
      <p><strong>Contact Number:</strong>{complaint.contactnumber}</p>
      <p><strong>Complaint Category:</strong> {complaint.complaintCategory}</p>
      <p><strong>Urgency Level:</strong> {complaint.urgencyLevel}</p>
    </div>
  );
};

export default ComplaintDetails;
