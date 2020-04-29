import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = props => {
    const profile = props.profile;

    return (
        <Fragment>
        {profile.bio &&  
            <div className="profile-about bg-light p-2">
                <h2 className="text-primary">{profile.user.name}'s Bio:</h2>
                <p>{profile.bio}</p>
                <div className="line"></div>
                </div>
        }
        </Fragment>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
