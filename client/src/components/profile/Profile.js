import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import {getProfileById} from "../../actions/profile";
import { Link } from 'react-router-dom';
import ProfileTop from "./ProfileTop.js";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience.js";
import ProfileQualification from "./ProfileQualification";

import MessageForm from "../messages/MessageForm";

const Profile = props => {

    const profile = props.profile;
    const auth = props.auth;

    const [sendMessage, setSendMessage] = useState(false);
    const handleMessage = e => {
        setSendMessage(!sendMessage);
    }

    useEffect(()=>{
        props.getProfileById(props.match.params.id);
    }, [props.getProfileById]);

    return (
        <section className="container">
            <Link className="btn btn-primary" to="/profiles">Back to profiles</Link>
            {profile.loading?<Spinner/>:
                profile.profile === null ? <h4 className="large text-primary">No profile found</h4>:
            <Fragment>

                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.profile.user._id &&  
                (<Link className="btn" to="/editprofile">Edit Profile</Link>)}

                {/* Related to messaging */}
                {auth.isAuthenticated && auth.loading === false && auth.user._id !== profile.profile.user._id &&
                <button className="btn btn-primary my-1" onClick={handleMessage}>Send Message</button>}
                {/* check if sending message, if yes show form */
                sendMessage && <MessageForm to={ {name:profile.profile.user.name, id: profile.profile.user._id}}/>
                }

                <div className="profile-grid my-1">
                    <ProfileTop profile={profile.profile}/>
                    <ProfileAbout profile={profile.profile} />

                    <div className="profile-exp bg-light p-2">
                        <h2 className="text-primary">Experiences</h2>
                        {profile.profile.experiences.length > 0 ? (<Fragment>
                            {profile.profile.experiences.map(exp => (
                                <ProfileExperience key={exp._id} experience={exp}/>
                            ))}
                        </Fragment>): <h4>No Experiences</h4>}
                    </div>
                    <div className="profile-edu bg-light p-2">
                        <h2 className="text-primary">Qualifications</h2>
                        {profile.profile.qualifications.length > 0 ? (<Fragment>
                            {profile.profile.qualifications.map(qual => (
                                <ProfileQualification key={qual._id} qualification={qual}/>
                            ))}
                        </Fragment>): <h4>No Qualifications</h4>}
                    </div>
                </div>
            </Fragment>
        }
        </section>
    )
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth:state.auth
});

export default connect(mapStateToProps,{getProfileById})(Profile);
