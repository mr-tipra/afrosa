import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Moment from "react-moment";
import {deleteQualification} from "../../actions/profile";


const Qualification = ({qualifications, deleteQualification, submitting}) => {

    const qualificationsList = qualifications.map(qual => (
        <tr key={qual._id}>
            <td>{qual.qualification}</td>
            <td className="hide-sm">{qual.institute}</td>
            <td className="hide-sm">
                <Moment format="YYYY">{qual.from}</Moment> - {
                    qual.to === null ? ('Now'):(<Moment format="YYYY">{qual.to}</Moment>)
                }
            </td>
            <td>{qual.desc && qual.desc !== ""? qual.desc:"None"}</td>
            <td><button className="btn btn-danger" disabled={submitting} onClick={() =>deleteQualification(qual._id)}>Delete</button></td>
        </tr>
    ))

    return (            
        <Fragment>
            <h2 className="my-1"> Qualifications</h2>
            {
            qualifications.length === 0? 
            <p>No Qualifications Added</p>
            :
            <table className="table">
                <thead>
                    <tr>
                        <th>Qualification</th>
                        <th>College/School</th>
                        <th>Years</th>
                        <th>Desc</th>
                        <th/>
                    </tr>
                </thead>

                <tbody>{qualificationsList}</tbody>
            
            </table>
        }
        </Fragment>
    )
}

Qualification.propTypes = {
    qualifications: PropTypes.array,
    deleteQualification: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
    submitting: state.auth.submitting
});


export default connect(mapStateToProps, {deleteQualification})(Qualification);
