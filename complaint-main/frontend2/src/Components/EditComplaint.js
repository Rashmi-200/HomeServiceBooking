import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../Styles/EditComplaint.css";
import Nav from './Nav';

const EditComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState({
    complaintid: '',
    serviceName: '',
    serviceProvider: '',
    date: '',
    location: '',
    bookingId: '',
    contactnumber:'',
    complaintCategory: '',
    urgencyLevel: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/complaints/${id}`);
  
        
        const data = response.data.Complaint; 
  
       
        if (data.date) {
          data.date = new Date(data.date).toISOString().slice(0, 16);
        }
  
        setComplaint(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching complaint:", err);
        setError("Failed to fetch complaint. Please try again.");
        setLoading(false);
      }
    };
  
    fetchComplaint();
  }, [id]);
  

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/complaints/${id}`, complaint);
      alert("Update Successfull")
      navigate('/addcomplaint');
    } catch (err) {
      console.error("Error updating complaint:", err);
      setError("Failed to update complaint. Please try again.");
    }
  };

  if (loading) return <p>Loading complaint details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <Nav />
      <h2>Edit Complaint</h2>

      <form onSubmit={handleUpdate}>
        <div>
          <label>Complaint ID:</label>
          <input type="text" name="complaintid" value={complaint.complaintid} disabled />
        </div>

        <div>
          <label>Service Name:</label>
          <select name="serviceName" value={complaint.serviceName} onChange={handleChange}>
            <option value="cleaning">Cleaning</option>
            <option value="painting">Painting</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="repairing">Repairing</option>
          </select>
        </div>

        <div>
          <label>Service Provider:</label>
          <select value={complaint.serviceProvider} onChange={handleChange}>
              <option value="">Select Provider</option>
              <option value="provider1">Provider 1</option>
              <option value="provider2">Provider 2</option>
              <option value="provider3">Provider 3</option>
            </select>
          {/* <input type="text" name="serviceProvider" value={complaint.serviceProvider} onChange={handleChange} /> */}
        </div>

        <div>
          <label>Date & Time:</label>
          <input type="text" name="date" value={complaint.date} disabled  />
        </div>

        <div>
          <label>Location:</label>
          <input type="text" name="location" value={complaint.location} onChange={handleChange} />
        </div>

        <div>
          <label>Booking ID:</label>
          <input type="text" name="bookingId" value={complaint.bookingId} onChange={handleChange} />
        </div>

        <div>
            <label>Contact Number:</label>
            <input type="Number" value={complaint.contactnumber}  pattern="[0-9]{10}" onChange={handleChange} required />
          </div>

        <div>
          <label>Complaint Category:</label>
          <select name="complaintCategory" value={complaint.complaintCategory} onChange={handleChange}>
            <option value="booking issues">Booking Issues</option>
            <option value="payment issues">Payment Issues</option>
            <option value="service quality issues">Service Quality Issues</option>
            <option value="notification error issues">Notification Error Issues</option>
            <option value="technical issues">Technical Issues</option>
            <option value="other issues">Other Issues</option>
          </select>
        </div>

        <div>
          <label>Urgency Level:</label>
          <select name="urgencyLevel" value={complaint.urgencyLevel} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div>
          <button type="submit">Update Complaint</button>
        </div>
      </form>
    </div>
  );
};

export default EditComplaint;