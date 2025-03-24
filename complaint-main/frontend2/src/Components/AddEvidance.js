import React, { useState } from 'react';
import axios from 'axios';

const EvidenceUploader = () => {
    const [newEvidence, setNewEvidence] = useState({
        complaintId: '',
        photo: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', newEvidence.photo);
        formData.append('complaintId', newEvidence.complaintId);

        try {
            const res = await axios.post('http://localhost:3000/evidences/add/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log(res.data);
            alert("Image successfully added!");
            setNewEvidence({ complaintId: '', photo: null }); // Reset form
        } catch (err) {
            console.error(err);
            alert("Error uploading image!");
        }
    };

    const handleChange = (e) => {
        setNewEvidence({ ...newEvidence, [e.target.name]: e.target.value });
    };

    const handlePhoto = (e) => {
        setNewEvidence({ ...newEvidence, photo: e.target.files[0] });
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
              <h3>If you have any Evidance? upload it below </h3>
            <input 
                type="text"
                placeholder="Complaint ID"
                name="complaintId"
                value={newEvidence.complaintId}
                onChange={handleChange}
                required
            />

            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto}
                required
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default EvidenceUploader;
