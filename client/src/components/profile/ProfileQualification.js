import React from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment";

const ProfileQualification = props => {
    const qual = props.qualification;

    return (
        <div>
            <h3>{qual.qualification}</h3>
            <p><Moment format="YYYY">{qual.from}</Moment> - {!qual.to?"Now":<Moment format="YYYY">{qual.to}</Moment>}</p>
            <p>
                <strong>College/School:</strong>{qual.institute}
            </p>
            {qual.desc &&  <p><strong>Description:</strong> {qual.desc}</p>}
        </div>
    )
}

ProfileQualification.propTypes = {
    qualification: PropTypes.object.isRequired
}

export default ProfileQualification
