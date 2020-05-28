import React from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";

import ProfileImage from "../profile/ProfileImage";

const CompanyMember = ({member}) => {
    const exp = member.experience;
    const history = useHistory();
    return (
        <div onClick={e => history.push(`/profile/${member._id}`)} className="member bg-light">
            <ProfileImage image={member.profile.display_picture} />
            <p><span className="text-primary">{member.name} </span>as {exp.title}</p>
            <p>{member.role === "student"?"Student":"Alumnus"}</p>
            <p>{new Date(exp.from).getFullYear()}-{exp.to?new Date(exp.to).getFullYear():"now"}</p>
        </div>
    )
}

CompanyMember.propTypes = {
    member: PropTypes.object.isRequired
}

export default CompanyMember;
