import React from 'react'
import PropTypes from 'prop-types'

import defaultImage from "../../assests/default.png";

const ProfileImage = ({image}) => {
    return (
            <img className="round-image my-1" src={image === "default" ? defaultImage:image } width="200px" alt="profile"/>            
    )
}

ProfileImage.propTypes = {
    image: PropTypes.string.isRequired
}

export default ProfileImage
