import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import ComplaintManagement from "./ComplaintManagement";
import AddComplaint from './Components/AddComplaint';
import DeleteComplaint from './Components/DeleteComplaint';
import EditComplaint from './Components/EditComplaint';
import ComplaintList from './Components/ComplaintList';
import ShowComplaints from './Components/showComplaint'
import ShowAllComplaints from './Components/showAllComplaints';
import ComplaintById from './Components/complaintById';
import Usernav from "./Usernav";
import EditStatus from "./Components/EditStatus";
import AddEvidance from "./Components/AddEvidance";
import EvidanceLIst from "./Components/EvidanceLIst"

function App() {
  return (
    <div>
      
    <h1> Smart Home Care Complaint Management System </h1>
    
    <Router>
      <React.Fragment>
      <Routes>
            <Route path="/" element={<ComplaintManagement/>}/> 
            <Route path="/maincomplaintmng" element={<ComplaintManagement/>}/>
            <Route path="/addcomplaint" element={<AddComplaint/>}/>
            <Route path="/deletecomplaint" element={<DeleteComplaint/>}/>
            <Route path="/edit-complaint/:id" element={<EditComplaint/>}/>
            <Route path="/complaintlist" element={<ComplaintList/>}/>
            <Route path="/showcomplaints" element={<ShowComplaints/>}/>
            <Route path="/ShowAllComplaints" element={<ShowAllComplaints/>}/>
            <Route path="/ShowAllComplaints/:id" element={<ComplaintById/>}/> 
            <Route path="/Usernav" element={<Usernav/>}/>
            <Route path="/complaintlist/:id" element={<EditStatus/>}/>
            <Route path="/addcomplaint/AddEvidance" element={<AddEvidance/>}/>
            <Route path="/addcomplaint/evidanceList" element={<EvidanceLIst/>}/>
      </Routes>
      </React.Fragment>
    </Router>

    </div>
  );
}

export default App;
