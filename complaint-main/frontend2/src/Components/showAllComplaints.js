import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Styles/ComplaintList.css";

const ShowAllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();  

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

  // Function to navigate to the complaint details page
  const handleSelectComplaint = (id) => {
    navigate(`/ShowAllComplaints/${id}`);
  };

  return (
    <div className="complaint-list-container">
      <h2>All Complaints</h2>

      {loading && <p>Loading complaints...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && complaints.length > 0 ? (
        <div className="complaint-cards">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="complaint-card"
              onClick={() => handleSelectComplaint(complaint._id)}
            >
              <h3>{complaint.serviceName}</h3>
              <p>{new Date(complaint.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No complaints found.</p>
      )}
    </div>
  );
};

export default ShowAllComplaints;
