import React from 'react'
import PropTypes from 'prop-types'
import ProfileImage from "./ProfileImage";

const ProfileTop = props => {
    const profile = props.profile;
    const user = props.profile.user;

    return (
        <div className="profile-top bg-primary p-2">
            <ProfileImage image={profile.display_picture} />
            <h1 className="large">{profile.user.name}</h1>
            <p className="lead">{user.role.toUpperCase()} of batch {profile.batch}, {profile.branch.toUpperCase()}</p>
            {profile.addr &&  profile.addr.state && 
            <div className="address">
                <p className="lead">Address</p>
                {profile.addr.addr_line && <p>{profile.addr.addr_line},</p>}
                {profile.addr.city && <p>{profile.addr.city},</p>}
                {profile.addr.state && <p>{profile.addr.state},</p>}
                {profile.addr.pincode && <p>{profile.addr.pincode},</p>}
                {profile.addr.country && <p>{profile.addr.country}</p>}
            </div>}
            {profile.website && <a target="_blank" href={profile.website}><i className="fas fa-globe"></i></a>}

            {profile.social && 
            <div className="icons my-1">
                <h4>Social Links</h4>
                {profile.social.twitter && <a target="_blank" href={profile.social.twitter}><i className="fab fa-twitter"></i></a>}
                {profile.social.facebook && <a target="_blank" href={profile.social.facebook}><i className="fab fa-facebook"></i></a>}
                {profile.social.youtube && <a target="_blank" href={profile.social.youtube}><i className="fab fa-youtube"></i></a>}
                {profile.social.instagram && <a target="_blank" href={profile.social.instagram}><i className="fab fa-instagram"></i></a>}
                {profile.social.linkedin && <a target="_blank" href={profile.social.twitter}><i className="fab fa-twitter"></i></a>}
            </div>}
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop;
