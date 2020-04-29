import React,{Fragment}from 'react'
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Stats from "./Stats";
import showcase from "../../assests/showcase.mp4";
import landing_backdrop from "../../assests/landing_back.png"
import About from "./About";
import CompanyShowcase from "./CompanyShowcase";

const Landing = (props) => {
    if(props.isAuthenticated)
        return <Redirect to="/dashboard" />
    
 
    return (
        <Fragment>
        <section className="landing">
            <div className="dark-overlay">
                <div className="video-container">
                    <video src={showcase} autoPlay muted loop> </video>
                </div>
                <div className="landing-inner">
                    <p className="lead">
                        Connect with alumni and students
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn">Login</Link>
                    </div>
                </div>
                <div className="backdrop">
                    <img src={landing_backdrop} alt="back" onLoad={props.onLoad}/>
                </div>
            </div>
        </section>
        <About />        
        <Stats />
        <CompanyShowcase />
        </Fragment>
    )
}


const mapStateToProps =  state =>({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
