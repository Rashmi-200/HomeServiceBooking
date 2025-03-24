import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "../Styles/EditComplaint.css";
import Nav from './Nav';

const EditStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState({
    complaintid: '',
    Status:'',
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
      const response=await axios.put(`http://localhost:3000/complaints/${id}`, complaint);
      console.log(response.data);
      navigate('/complaintlist');
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
      <h2>Edit Status</h2>

      <form onSubmit={handleUpdate}>
        <div>
          <label>Complaint ID:</label>
          <input type="text" name="complaintid" value={complaint.complaintid} disabled />
        </div>

        <div>
          <label>Status:</label>
          <select name="Status" value={complaint.Status} onChange={handleChange}>
          <option value={complaint.Status}>{complaint.Status}</option>
            <option value="In Progress">In progress</option>
            <option value="Completed">Completed</option>
            
            
            
          </select>
        </div>
        <div>
          <button type="submit">Update Complaint</button>
        </div>
      </form>
    </div>
  );
};

export default EditStatus;