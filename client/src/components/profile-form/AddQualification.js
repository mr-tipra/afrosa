import React,{Fragment, useState}from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {addQualification} from "../../actions/profile";
import {Link, withRouter} from "react-router-dom";
import Qualification from "./Qualification";
import { useEffect } from 'react';

const AddQualification = props => {
    const [formData, setFormData] = useState({});
    const [enableSubmit, setEnableSubmit] = useState(false);

    const handleQualification = (res) => {   
        setFormData({...formData, ...res.fields});
        setEnableSubmit(res.isFilled);
    };

    const onSubmit = e => {
        e.preventDefault();
        props.addQualification(formData, props.history);
    }
    return (
        <section className="container">
            <h2 className="large text-primary">Add Qualification</h2>
            <form className="form" onSubmit = {onSubmit}>
                <Qualification onChange={handleQualification}/>

                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Add Qualification" disabled={!enableSubmit || props.submitting}/>
                </div>
            </form>
        </section>
    )
}

AddQualification.propTypes = {
    addQualification: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    submitting: state.auth.submitting
});

export default connect(mapStateToProps, {addQualification})(withRouter(AddQualification));
