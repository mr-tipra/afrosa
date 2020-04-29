import React,{Fragment, useEffect, useState} from 'react'
import {Link, useLocation} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";
import Spinner from './Spinner';
import { useRef } from 'react';

import logo from "../../assests/logo.png";

const Navbar = (props) => {
    const navRef = useRef();
    const iconRef = useRef();

    const [navbarDown, setNavbarDown] = useState(false);

    const toggleNav = e => {
        if(!navRef.current) return;
        
        
        if(navRef.current.classList.contains("show")){
            navRef.current.classList.remove("show");
            setNavbarDown(false);
        }
        else{
            navRef.current.classList.add("show");
            setNavbarDown(true);
        }
    }

    function setIconColor(){

        if(window.pageYOffset > 52){
            if(!iconRef.current.classList.contains("dark"))
            iconRef.current.classList.add("dark");
        }
        else{
            if(iconRef.current.classList.contains("dark"))
                iconRef.current.classList.remove("dark");
        }
    }

    useEffect(() => {
        iconRef.current.classList.remove("dark");
        if(!navbarDown)
            setIconColor();
    }, [navbarDown])
    
 
    useEffect(() => {
        window.addEventListener("scroll", e => {
            setIconColor();
          
        });
    }, [])
    const authLinks = (
        <ul ref={navRef}>
            <li><Link to="/dashboard" onClick={toggleNav}><i className="fas fa-user"></i>Dashboard</Link></li>
            <li><Link to="/profiles" onClick={toggleNav}><i className="fas fa-list"></i>Profiles</Link></li>
            <li><Link to="/maps/companies" onClick={toggleNav}><i className="fas fa-map-marker"></i>Alumni on Map</Link></li>
            <li><Link to="/posts" onClick={toggleNav}><i className="fas fa-newspaper"></i>Posts</Link></li>
            <li><Link to="/messages" onClick={toggleNav}><i className="fas fa-envelope"></i>Messages</Link></li>

            {//admin only
            !props.auth.loading && props.auth.user && props.auth.user.role === "admin" && 
            <li><Link to="/admin/userslist" onClick={toggleNav}><i className="fas fa-user-cog"></i>All Users</Link></li>
            }
            <li><Link onClick={e=> { toggleNav(); props.logout(); }} to="/"><i className="fas fa-sign-out-alt"></i>
            <span className="hide-sm">Logout</span></Link></li>
        </ul>
    );

    const guestLinks = (
        <ul ref = {navRef}>
            <li><Link to="/team" onClick={toggleNav}><i className="fas fa-users"></i>Our Team</Link></li>
            <li><Link to="/register" onClick={toggleNav}><i className="fas fa-user-plus"></i>Sign Up</Link></li>
            <li><Link to="/login" onClick={toggleNav}><i className="fas fa-sign-in-alt"></i>Log in</Link></li>
        </ul>
    );


    return (
        <nav className="navbar bg-dark">
                <Link to="/" className="logo">
                        <img src={logo} alt="logo"/></Link>
            <div ref={iconRef} onClick={toggleNav} className="navbar-icon"><i className="fas fa-bars"></i></div>

            
            { !props.auth.loading && (<Fragment>{props.auth.isAuthenticated?authLinks:guestLinks}</Fragment>)}
            
        </nav>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {logout})(Navbar);