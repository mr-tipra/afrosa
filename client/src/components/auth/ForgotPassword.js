import React,{Fragment, useState, useEffect}from 'react'
import {Link, Redirect} from "react-router-dom";
import {resetPassword} from "../../actions/auth";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

const ForgotPassword = (props) => {

    useEffect(() => {
        if(props.match.params.token){
            //verifying reset token
            
        }

    }, []);
    const [formData, setFormData] = useState({
        email:"",
    });

    const {email} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) =>{
        e.preventDefault();
        props.resetPassword(formData);
    }

    //Redirect if logged in
    if(props.isAuthenticated)
        return <Redirect to="/dashboard" />
    return (
       <section className="container">
            <h1 className="x-large text-primary">Reset Password</h1>
            <form   className="form" onSubmit={e=>onSubmit(e)}>
         
                <div className="form-group">
                    <input type="email" placeholder="Email" name="email" 
                    onChange={e=>onChange(e)} value={email}  required/>
                </div>
 
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Submit" disabled={props.submitting}/>
                </div>
            </form>
       </section>
    )
}


ForgotPassword.propTypes = {
    isAuthenticated:PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    submitting: state.auth.submitting
});

export default connect(mapStateToProps,{resetPassword})(ForgotPassword);
