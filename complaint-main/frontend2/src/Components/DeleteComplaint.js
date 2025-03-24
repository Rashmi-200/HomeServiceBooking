import React, { useEffect, useState } from 'react';
import Nav from './Nav';

const DeleteComplaint = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000complaints')  // Fetch complaints from the backend
      .then(response => response.json())
      .then(data => setComplaints(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/complaints/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted complaint from the state (UI update)
        setComplaints(complaints.filter(complaint => complaint.complaintid !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <Nav/>
      <h2>Complaint List</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint.complaintid}>
            {complaint.serviceName} - {complaint.ServiceProvider} - {complaint.date} - {complaint.location} - {complaint.bookingId} - {complaint.contactnumber} - {complaint.complaintCategory} - {complaint.urgencyLevel}
            <button onClick={() => handleDelete(complaint.complaintid)}>Delete</button>
            <button>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteComplaint;
