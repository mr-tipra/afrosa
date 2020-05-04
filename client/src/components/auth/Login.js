import React,{Fragment, useState}from 'react'
import {Link, Redirect} from "react-router-dom";
import {login} from "../../actions/auth";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

const Login = (props) => {

    const [formData, setFormData] = useState({
        enroll_no:"",
        password:"",
    });

    const {enroll_no, password} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) =>{
        e.preventDefault();
        props.login({enroll_no, password});
        
    }

    //Redirect if logged in
    if(props.isAuthenticated)
        return <Redirect to="/dashboard" />
    return (
       <section className="container">
            <h1 className="x-large text-primary">Login</h1>
            <form   className="form" onSubmit={e=>onSubmit(e)}>
         
                <div className="form-group">
                    <input type="text" placeholder="Enrollment No." name="enroll_no" 
                    onChange={e=>onChange(e)} value={enroll_no}  required/>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password"
                    value={password} onChange={e=>onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Login" disabled={props.submitting}/>
                </div>
            </form>
            <p className="my-1">No account? <Link to="/register">Sign Up</Link> </p>
            <p className="my-1"><Link to="/forgotpassword">Forgot Password?</Link></p>
       </section>
    )
}


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    submitting: state.auth.submitting
});

export default connect(mapStateToProps,{login})(Login);
