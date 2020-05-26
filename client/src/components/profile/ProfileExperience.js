import React from 'react'
import PropTypes from 'prop-types'
import Moment from "react-moment";

const ProfileExperience = props => {
    const exp = props.experience;
    console.log(exp);
    return (
        <div>
            <h3>{exp.company_name || exp.company.name}</h3>
            <p><Moment format="YYYY">{exp.from}</Moment> - {!exp.to?"Now":<Moment format="YYYY">{exp.to}</Moment>}</p>
            <p>
                <strong>Position:</strong> {exp.title}
            </p>
            {exp.desc &&  <p> <strong>Description:</strong> {exp.desc}</p>}
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
}

export default ProfileExperience
