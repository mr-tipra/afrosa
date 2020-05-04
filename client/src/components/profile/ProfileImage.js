import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";

import defaultImage from "../../assests/default.png";

const ProfileImage = ({image, check}) => {
    return (
            <div className="profile-image">
                {check &&  <i className="far fa-check-circle"></i> }
                <img className="round-image my-1" src={image === "default" ? defaultImage:image } width="200px" alt="profile"/>            
            </div>
    )
}

ProfileImage.propTypes = {
    image: PropTypes.string.isRequired,
    check: PropTypes.bool

}


export default ProfileImage;
