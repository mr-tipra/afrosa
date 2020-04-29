import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import {setAlert} from "../../actions/alert";
import profile from '../../reducers/profile';

const PrivateRouteVerified = ({component:Component, setAlert,auth,profile,...rest}) => {

    if(auth.user && !auth.user.college_verified)
        setAlert("Not College Verified", "danger");
    
    
    // if(!profile.loading && profile.profile === null){
    //     //check if own
        
    //     setAlert("Please Create Profile", "danger")
    //     return <Redirect to="/dashboard" />;
    // }
        
    return (
        <Route {...rest} render={props=>!auth.isAuthenticated ||
            auth.loading ||
            (auth.user && !auth.user.college_verified) ? (<Redirect to="/dashboard"/>):
        (<Component {...props} />)} />
    );
}

PrivateRouteVerified.propTypes = {
    auth: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth:state.auth,
    profile: state.profile
});
export default connect(mapStateToProps, {setAlert})(PrivateRouteVerified);
