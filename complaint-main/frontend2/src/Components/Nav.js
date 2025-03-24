import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Nav.css';


function Nav() {
  return (
    <div>
        <ul className="complaintmng">
        <div className="first-row">
        <div className="first-column">
            <li className="ComplaintManagement">
                <Link to="/complaintlist" className="active complaintmanagement">
                <h1>Complaint List</h1>
                </Link>
            </li>   
            </div>

            <div className="second-column">
            <li className="ComplaintManagement">
            <Link to="/ShowAllComplaints" className="active complaintmanagement">
                <h1>Show All complaints</h1>
                </Link>
            </li>
            </div>
        </div>
        <div className="second-row">
             <li className="ComplaintManagement">
            <Link to="/Usernav" className="active complaintmanagement">
                <h1>User Complaint adding part</h1>
                </Link>
            </li>
            </div>
        </ul>
   </div>);
 
  
};

export default Nav;