import React,{Fragment, useState, useEffect}from 'react'
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {setAlert} from "../../actions/alert";
import {register, startSubmit} from "../../actions/auth";
import PropTypes from "prop-types";



const Register = (props) => {

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        password2:"",
        enroll_no:"",
        role:"student",
        emptyField: false
    });    

    const {name, email, password, password2, enroll_no, role, emptyField} = formData;
    
    useEffect(()=>{
        const emptyField = name.length === 0 || email.length === 0 || 
        password.length===0||password2.length===0||enroll_no.length===0;
        setFormData({...formData, emptyField});
    },[name, email,password, password2,enroll_no]);

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
      
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        if(password !== password2){
            props.setAlert("Passwords do not match","danger");
        }else{
            props.register({name, email, password, enroll_no, role});   
           
        }
    }

    if(props.isAuthenticated)
        return <Redirect to="/dashboard"/>
    return (
       <section className="container">
           <h1 className="large text-primary">Sign Up</h1>
           <p className="lead"><i className="fas fa-user"></i>Create Your Account</p>

            <form  className="form" onSubmit={e=>onSubmit(e)}>

                <div className="form-group">
                    <input type="text" placeholder="Name" name="name"  value={name} onChange={e=>onChange(e)} required/>
                </div>

                <div className="form-group">
                    <input type="email" placeholder="Email address" name="email" 
                    onChange={e=>onChange(e)} value={email}  required/>
                </div>

                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" minLength="6" 
                    value={password} onChange={e=>onChange(e)} required/>
                </div>

                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" name="password2" minLength="6" 
                    value={password2} onChange={e=>onChange(e)} required/>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Enrollment No" name="enroll_no" 
                    value={enroll_no} onChange={e=>onChange(e)} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="role" className="form-text">Account Type:</label>
                    <select name="role" id="role" value={role} onChange={e=>onChange(e)}>
                        <option value="student">Student</option>
                        <option value="alumnus">Alumnus</option>
                    </select>
                </div>

                <div className="form-group">
                    <input className="btn btn-primary" type="submit" value="Register" disabled={emptyField || props.submitting}/>
                </div>
            </form>
            <p className="my-1">Already have an account?<Link to="/login">Login</Link>
            </p>
       </section>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    submitting:state.auth.submitting,
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, {setAlert, register, startSubmit})(Register);
