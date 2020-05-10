import React,{useState, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import { withRouter, Redirect} from "react-router-dom";
import Spinner from '../layout/Spinner';
import {getCurrentProfile,createProfile, updateProfilePicture} from "../../actions/profile";
import ProfileImage from '../profile/ProfileImage';
import {setAlert} from "../../actions/alert";


const EditProfile = props => {
    const [formData, setFormData] = useState({
        brach:"",
        batch:"",
        website: "",
        addr:{
            addr_line:"",
            city:"",
            state:"",
            pincode:"",
            country:""
        },
        bio:"",
        youtube:"",
        twitter:"",
        facebook:"",
        linkedin:"",
        instagram:""
    });
    const {
        website,
        addr:{
            addr_line,
            city,
            state,
            pincode,
            country
        },
        bio,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
    } = formData;

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
   

    //fill the fields
    useEffect(()=>{
        if(!props.profile.profile)
            getCurrentProfile();
        const {loading, profile} = props.profile;
        setFormData({
            branch:loading || !profile.branch?"":profile.branch,
            batch: loading || !profile.batch?"": new Date(profile.batch).getFullYear(),
            website: loading || !profile.website?"":profile.website,
            addr:{
                addr_line: loading || !profile.addr.addr_line?"":profile.addr.addr_line,
                city:loading || !profile.addr.city?"":profile.addr.city,
                state:loading || !profile.addr.state?"":profile.addr.state,
                pincode:loading || !profile.addr.pincode?"":profile.addr.pincode,
                country:loading || !profile.addr.country?"":profile.addr.country
            },
            bio:loading || !profile.bio?"":profile.bio,
            youtube:loading || !profile.social?"":profile.social.youtube,
            twitter:loading || !profile.social?"":profile.social.twitter,
            facebook:loading || !profile.social?"":profile.social.facebook,
            linkedin:loading || !profile.social?"":profile.social.linkedin,
            instagram:loading || !profile.social?"":profile.social.instagram
        });
    }, [props.loading, props.profile    , props.user]);

    
    const onChange = e => {
        setFormData({...formData, [e.target.name]:e.target.value})
    };

    const onAddrChange = e => {
        setFormData({...formData, addr: {...formData.addr, [e.target.name]:e.target.value}});
    }
    
    const onSubmit = e =>{
        e.preventDefault();
        props.createProfile(formData, props.history, true);
    }

    //state for image
    const [file, setFile] = useState("");
    const [uploadPercent, setUploadPercent] = useState(0);

    const onFileChange = e => {
        setFile(e.target.files[0]);
    };
    const submitFile = e => {
        e.preventDefault();
        if(file === "" )
            props.setAlert("No file selected");
        else if(!file.type.startsWith("image"))
            props.setAlert("Invalid file selected");
        else if(file.size > 1000000)
            props.setAlert("File size should not exceed 1MB");
        else{
            setUploadPercent(0);
            props.updateProfilePicture(file, setUploadPercent);
        }
    }

    useEffect(() => {
        if(uploadPercent === 100)
            props.setAlert("Upload Done");
    }, [uploadPercent])
    //loading
    if(!props.user) return <Spinner />
    //refresh
    if(!props.profile.profile) return <Redirect to="/dashboard" />
    return (
        <section className="container">
            <h1 className="large text-primary">Update Your Profile</h1>
            <p className="lead">Change whatever you like</p>
            
            <form className="form" onSubmit={e => onSubmit(e)}>

                <div className="form-group">

                    <ProfileImage image={props.profile.profile.display_picture} />
                    <input className="btn" type="file" onChange={onFileChange}/>
                    <button className="btn btn-primary my-1"  onClick={submitFile}>Update Image </button>
                    <small>Max size allowed 1MB</small>
                    {uploadPercent > 0 && <p>Upload %: {uploadPercent}</p>}
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Your website" name="website" 
                    value={website} onChange={e=>onChange(e)}/>
                </div>

                <label>Address Information</label> <br/>
                <div className="form-group">
                    <input type="text" placeholder="Address line" name="addr_line"
                    value={addr_line} onChange={e=>onAddrChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="City" name="city"
                    value={city} onChange={e=>onAddrChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="State" name="state" 
                    value={state} onChange={e=>onAddrChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="pincode" name="pincode"
                    value={pincode} onChange={e=>onAddrChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Country" name="country"
                    value={country} default="India" onChange={e=>onAddrChange(e)} />
                </div>

                <div className="form-group">
                    <textarea  placeholder="Your Bio" name="bio"
                    value={bio} onChange={e=>onChange(e)} />
                </div>

                <div>
                    <button className="btn" onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button"
                    >Add Social Network Links</button>
                    <span>Optional</span>
                </div>
                {displaySocialInputs && 
                <Fragment>
                        <div className="form-group social-input">
                        <i className="fab fa-facebook"></i>
                        <input type="text" placeholder="youtube" name="youtube" 
                        value={youtube} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter"></i>
                        <input type="text" placeholder="twitter" name="twitter" 
                        value={twitter} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group social-input">
                        <i className="fab fa-facebook"></i>
                        <input type="text" placeholder="facebook" name="facebook" 
                        value={facebook} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group  social-input">
                        <i className="fab fa-linkedin"></i>
                        <input type="text" placeholder="linkedin" name="linkedin" 
                        value={linkedin} onChange={e => onChange(e)}/>
                    </div>
                    <div className="form-group  social-input">
                        <i className="fab fa-instagram"></i>
                        <input type="text" placeholder="instagram" name="instagram" 
                        value={instagram} onChange={e => onChange(e)}/>
                    </div>
                </Fragment>}
                
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" disabled={props.submitting} value="Update"/>
                </div>
                
            </form>
        </section>
    )
}

EditProfile.propTypes = {
    user: PropTypes.object,
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user:state.auth.user,
    profile:state.profile,
    submitting: state.auth.submitting   
});

export default connect(mapStateToProps, {setAlert,createProfile, getCurrentProfile, updateProfilePicture})(withRouter(EditProfile));
