import React,{Fragment, useState}from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {addExperience} from "../../actions/profile";
import {Link, withRouter} from "react-router-dom";
import Experience from "./Experience";
import { useEffect } from 'react';

const AddExperience = props => {
    const [formData, setFormData] = useState({});
    const [enableSumit, setEnableSubmit] = useState(false);

    const handleExperience = (res) => {   
        setFormData({...formData, ...res});
    };

    useEffect(() => {
        if(formData.addr && formData.addr.addr_line && formData.addr.addr_line !== "")
            setEnableSubmit(true);
    },[formData]);

    const onSubmit = e => {
        e.preventDefault();
        props.addExperience(formData, props.history);
    }
    return (
        <section className="container">
            <h2 className="large text-primary">Add Experience</h2>
            <form className="form" onSubmit = {onSubmit}>
                <Experience onChange={handleExperience}/>

                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Add Experience" disabled={!enableSumit}/>
                </div>
            </form>
        </section>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, {addExperience})(withRouter(AddExperience));
