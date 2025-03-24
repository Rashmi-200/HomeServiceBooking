import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EvidenceList = () => {
    const [evidences, setEvidences] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/evidences')
            .then(response => {
                setEvidences(response.data);
            })
            .catch(error => {
                console.error('Error fetching evidences:', error);
            });
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Evidence List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {evidences.map(evidence => (
                    <div key={evidence._id} className="bg-white p-4 rounded-lg shadow-lg">
                        <img 
                            src={evidence.photoUrl || 'https://via.placeholder.com/150'}
                            alt={`Evidence for Complaint ID: ${evidence.complaintId}`}
                            className="w-full h-40 object-cover rounded-md"
                        />
                        <h2 className="text-xl font-semibold mt-2">Complaint ID: {evidence.complaintId}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EvidenceList;
