import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import {setAlert} from "../../actions/alert";

const PrivateRouteAdmin = ({component:Component, setAlert,auth,...rest}) => {

    if(auth.user && !auth.user.college_verified)
        setAlert("Not College Verified");
    const allowedRoles = ['admin', 'student_relations','alumni_relations'];
    const isAllowed = auth.user && allowedRoles.includes(auth.user.role); 
    if(auth.user && !isAllowed)
        setAlert("Admin Only");
        
    return (
        <Route {...rest} render={props=>!auth.isAuthenticated ||
            auth.loading ||
            (auth.user && !auth.user.college_verified && !isAllowed) ? (<Redirect to="/dashboard"/>):
        (<Component {...props} />)} />
    );
}

PrivateRouteAdmin.propTypes = {
    auth: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth:state.auth
});
export default connect(mapStateToProps, {setAlert})(PrivateRouteAdmin);
