import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Moment from "react-moment";
import {deleteExperience} from "../../actions/profile";

const Experience = ({experiences, deleteExperience, submitting}) => {

    const epxeriencesList = experiences.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company_name || exp.company.name}</td>
            <td className="hide-sm">{exp.title}</td>
            <td className="hide-sm">
                <Moment format="YYYY">{exp.from}</Moment> - {
                    exp.to === null ? ('Now'):(<Moment format="YYYY">{exp.to}</Moment>)
                }
            </td>
            <td className="hide-sm">{exp.desc && exp.desc !== ""? exp.desc:"None"}</td>
            <td><button className="btn btn-danger" disabled={submitting} onClick={() => deleteExperience(exp._id)}>Delete</button></td>
        </tr>
    ))
    return (       
        <Fragment>
            <h2 className="my-1">Experiences</h2>
            {experiences.length === 0 ? <p>No Experience</p>:<Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm"> Years</th>
                        <th className="hide-sm">Desc</th>
                        <th/>
                    </tr>
                </thead>

                <tbody>{epxeriencesList}</tbody>
            
            </table>
            </Fragment>}
        </Fragment>
    )
}

Experience.propTypes = {
    experiences: PropTypes.array,
    deleteExperience: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    submitting: state.auth.submitting
});

export default connect(mapStateToProps, {deleteExperience})(Experience);
