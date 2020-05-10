import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {verifyUser, deleteUser} from "../../actions/admin";

const ProfileItemAdmin = ({user, verifyUser, deleteUser}) => {

    const onClickDelete = e => {
        const del = window.confirm("Are you sure about deleting this account?");
        if(del)
            deleteUser(user.enroll_no);
        
    }
    return (
        <div className="profile-admin bg-light">            
            
            <h1 className="large text-primary">{user.name}</h1>

            {
            user.college_verified?
            <h4 className="text-success"> College Verified</h4>:
            <h4 className="text-danger">Not College Verified</h4>
            }

            <h2>{user.role}</h2>
            <h2>{user.enroll_no}</h2>
            <Link className="btn btn-primary" to={`/profile/${user._id}`}>View Profile</Link>
            <button className="btn btn-danger my-1" onClick={onClickDelete}>Delete</button>
            {!user.college_verified && <button className="btn btn-danger my-1" onClick={e => verifyUser(user.enroll_no)}>Verify User</button> }

        </div>
    )
}

ProfileItemAdmin.propTypes = {
    user: PropTypes.object.isRequired,
    verifyUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
}

export default connect(null, {verifyUser, deleteUser})(ProfileItemAdmin);
