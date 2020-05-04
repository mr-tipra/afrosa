import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import ProfileImage from "../profile/ProfileImage";


const ProfileItem = props => {
    const profile = props.profile;
    const user = props.profile.user;
    const isAdmin = ['admin', 'student_relations','alumni_relations'].includes(user.role);

    return (
        <div className="profile bg-light">
            <div>
                <ProfileImage image={profile.display_picture} check={isAdmin}/>
            </div>
            <div>
                <h2>{user.name}</h2>
                <h2>{user.role}</h2>
                <p>Branch <span>{profile.branch}</span>, Batch of {new Date(profile.batch).getFullYear()}</p>
                <Link className="btn btn-primary" to={`profile/${user._id}`}>View Profile</Link>
            </div>
            
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem
