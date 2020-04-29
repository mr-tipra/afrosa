import React from 'react'
import {Link} from "react-router-dom";

const DashboardActions = props => {
    return (
        <div className="dash-buttons">
            <Link className="btn btn-primary" to="/editprofile"><i className="fas fa-user-circle"></i>Edit Profile</Link>            
            <Link className="btn btn-primary" to="/addexperience"><i className="fab fa-black-tie"></i> Add experience</Link>
            <Link className="btn btn-primary" to="/addqualification"><i className="fas fa-graduation-cap"> </i>Add qualification</Link>
        </div>
    )
}



export default DashboardActions
