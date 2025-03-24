import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Usernav.css';

function Usernav() {
  return (
    <div>
        <ul classname="complaintf">
             <li className="ComplaintMan">
                      <Link to="/addcomplaint" className="active complaintman">
                          <h1>Add Complaint with Evidance</h1>
                      </Link>
             </li> 
       </ul>
    </div>
  )
}

export default Usernav