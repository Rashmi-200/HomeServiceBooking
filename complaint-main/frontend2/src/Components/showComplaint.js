import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ComplaintDetails from './ComplaintDetails';
import "../Styles/showComplaint.css";

const ShowComplaints = () => {  // ✅ Corrected component name
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

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

  return (
    <div className="complaint-list-container">
      <h2>Complaint List</h2>

      {loading && <p>Loading complaints...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && complaints.length > 0 ? (
        <div className="complaint-cards">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="complaint-card"
              onClick={() => setSelectedComplaint(complaint)}
            >
              <h3>{complaint.serviceName}</h3>
              <p>{new Date(complaint.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No complaints found.</p>
      )}

      {selectedComplaint && <ComplaintDetails complaint={selectedComplaint} />}
    </div>
  );
};

export default ShowComplaints;  // ✅ Corrected export
