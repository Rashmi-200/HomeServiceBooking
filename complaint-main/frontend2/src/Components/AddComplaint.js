import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/AddComplaint.css";
import ComplaintCard from './ComplaintCard';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import AddEvidance from './AddEvidance';
import EvidanceList from './EvidanceLIst';

const AddComplaint = () => {
  const [complaintid, setComplaintId] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [date, setDate] = useState(new Date().toISOString());
  const [location, setLocation] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [contactnumber, setContactnumber] = useState('');
  const [complaintCategory, setComplaintCategory] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('');
  const [error, setError] = useState('');
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/complaints')
      .then(response => {
        console.log(response.data.complaints); // Check the complaints array

        if (Array.isArray(response.data.complaints)) {
          setComplaints(response.data.complaints); // Set the complaints array
        } else {
          console.error("Fetched data is not an array", response.data);
          setComplaints([]); // Set empty array if data is not valid
        }
      })
      .catch(error => console.error("Error fetching complaints:", error));
  }, []);
  
  // Generate Complaint ID on component mount
  useEffect(() => {
    if (!complaintid) {
      setComplaintId(`C-${Date.now()}`); // Unique ID based on timestamp
    }
  }, [complaintid]); // Add complaintId dependency to prevent infinite updates

  // Reset form when adding a new complaint
  const resetForm = () => {
    setServiceName('');
    setServiceProvider('');
    setDate(new Date().toISOString());
    setLocation('');
    setBookingId('');
    setContactnumber('');
    setComplaintCategory('');
    setUrgencyLevel('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceName) {
      setError('Service Name is required!');
      return;
    }

    const complaintData = {
      complaintid,
      serviceName,
      serviceProvider,
      date,
      location,
      bookingId,
      contactnumber,
      complaintCategory,
      urgencyLevel
    };

    try {
      // Add new complaint
      await axios.post('http://localhost:3000/complaints', complaintData, {
        headers: { 'Content-Type': 'application/json' }
      });

      // Add complaint to the state after successful submission
      setComplaints([...complaints, complaintData]);
      alert('Complaint submitted successfully!');

      // Reset the form after submitting
      resetForm();
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint. Please try again.');
    }
  };

  return (
    <div>
   <Nav/>
     
      <h2>Add Complaint</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <fieldset>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Complaint ID:</label>
            <input type="text" value={complaintid} readOnly />
          </div>

          <div>
            <label>Service Name:</label>
            <select value={serviceName} onChange={(e) => setServiceName(e.target.value)} required>
              <option value="">Select Service</option>
              <option value="cleaning">Cleaning</option>
              <option value="painting">Painting</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="repairing">Repairing</option>
            </select>
          </div>

          <div>
            <label>Service Provider:</label>
            <select value={serviceProvider} onChange={(e) => setServiceProvider(e.target.value)}>
              <option value="">Select Provider</option>
              <option value="provider1">Provider 1</option>
              <option value="provider2">Provider 2</option>
              <option value="provider3">Provider 3</option>
            </select>
          </div>

          <div>
            <label>Date & Time:</label>
            <input type="text" value={new Date(date).toLocaleString()} onChange={(e) => setDate(e.target.value)} readOnly />
          </div>

          <div>
            <label>Location:</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <div>
            <label>Booking ID:</label>
            <input type="text" value={bookingId} onChange={(e) => setBookingId(e.target.value)} required />
          </div>

          <div>
            <label>Contact Number:</label>
            <input type="tel" value={contactnumber} pattern="[0-9]{10}" onChange={(e) => setContactnumber(e.target.value)} required />
          </div>
          <small>Enter a 10-digit number.</small>

          <div>
            <label>Complaint Category:</label>
            <select value={complaintCategory} onChange={(e) => setComplaintCategory(e.target.value)} required>
              <option value="">Select Category</option>
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
            <select value={urgencyLevel} onChange={(e) => setUrgencyLevel(e.target.value)} required>
              <option value="">Select Urgency</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div>
            <button type="submit">Submit Complaint</button>
          </div>

          </form>
          </fieldset>


          <fieldset>
          <div>
            <AddEvidance/>
          
            <ul classname="complaintevi">
                       <li className="Complaintevi">
                         <Link to="/addcomplaint/AddEvidance" className="active complaintevidance">
                       
                         </Link>
                       </li>    
           </ul>
          </div>
          </fieldset>
      

      <div className="complaint-Card">
        {complaints.map((complaint) => (
          <ComplaintCard key={complaint.complaintid} complaint={complaint} />
        ))}
      </div> 

      <fieldset>
          <div>
            <EvidanceList/>
            <ul classname="complaintevilist">
                       <li className="Complaintevilist">
                         <Link to="/Addcomplaint/evidanceList" className="active complaintevidance"></Link>
                         
                       </li>           
           </ul>
          </div>
          </fieldset>
      
    </div>
  );
};

export default AddComplaint;
