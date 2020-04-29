import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {verifyEmail} from "../../actions/auth";
import {Redirect} from "react-router-dom";

const VerifyEmail = props => {

    useEffect(() => {
        const token = props.match.params.token;
        props.verifyEmail(token);
    },[]);

    return (
        <Redirect to="/login" />
    )
};

VerifyEmail.propTypes = {
    verifyEmail: PropTypes.func.isRequired
};

export default connect(null, {verifyEmail})(VerifyEmail);
