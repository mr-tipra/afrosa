import React,{Fragment, useState, useEffect}from 'react'
import {Link, Redirect} from "react-router-dom";
import {verifyResetToken} from "../../actions/auth";
import {setAlert} from "../../actions/alert";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

const ResetPassword = (props) => {

    const [formData, setFormData] = useState({
        password:"",
        confirm_password: ""
    });

    const {password, confirm_password} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) =>{
        e.preventDefault();
        if(password !== confirm_password){
            props.setAlert("Passwords Do not match", "danger");
            return;
        }

        props.verifyResetToken(props.match.params.token, {password:formData.password});
        props.history.push("/login");
    }

    //Redirect if logged in
    if(props.isAuthenticated)
        return <Redirect to="/dashboard" />
    
    return (
       <section className="container">
            <h1 className="x-large text-primary">Reset Password</h1>
            <form   className="form" onSubmit={e=>onSubmit(e)}>
         
                <div className="form-group">
                    <input type="password" placeholder="New Password" name="password" 
                    onChange={e=>onChange(e)} value={password}  required/>
                </div>

                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" name="confirm_password" 
                    onChange={e=>onChange(e)} value={confirm_password}  required/>
                </div>

                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Submit" disabled={props.submitting}/>
                </div>
            </form>
       </section>
    )
}


ResetPassword.propTypes = {
    isAuthenticated:PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    submitting: state.auth.submitting
});

export default connect(mapStateToProps,{setAlert, verifyResetToken})(ResetPassword);
