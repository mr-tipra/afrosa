import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";

import {getCurrentProfile, deleteAccount} from "../../actions/profile";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Qualification from "./Qualification";

import ProfileImage from "../profile/ProfileImage";

const Dashboard = props => {

    useEffect(() => {
       props.getCurrentProfile();
    }, []);
    const user = props.auth.user || {};

    const isAdmin = ['admin', 'student_relations','alumni_relations'].includes(user.role);
    return props.profile.loading && props.profile.profile === null ?<Spinner />:

    <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">Welcome {props.auth.user && props.auth.user.name}</p>
        {props.profile.profile !== null?
        <Fragment>
            {props.auth.user && !props.auth.user.college_verified && <p className="lead bg-danger p-1">Not college Verified</p>}
            
            <div className="dash-image bg-light">
                <ProfileImage image = {props.profile.profile.display_picture} check={isAdmin} />
                <DashboardActions/>
            </div>
            <Experience experiences={props.profile.profile.experiences}/>
            <Qualification qualifications={props.profile.profile.qualifications}/>
        </Fragment>:
        <Fragment>
            <p>You have not created a profile, please make one</p>
            <Link to="/createprofile">Create Profile</Link>
        </Fragment>}
    </section>
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps =  state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
