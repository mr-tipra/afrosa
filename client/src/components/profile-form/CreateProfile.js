import React,{useState, Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import Experience from "./Experience";
import {createProfile} from "../../actions/profile";
import {Link, withRouter} from "react-router-dom";
import Spinner from '../layout/Spinner';


const CreateProfile = props => {
    const [formData, setFormData] = useState({
        branch:"cse",
        college:"Ujjain Engineering College",
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
        instagram:"",
        experience:{}
    });
    const {
        branch,
        qualification,
        college,
        batch,
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
        experience
    } = formData;

    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const [enableSubmit, setEnableSubmit] = useState(true);

    useEffect(() => {
        setEnableSubmit(true);
        if(experience.addr && experience.addr.addr_line && experience.addr.addr_line === "")
            setEnableSubmit(true);
        if(formData.batch === "")
            setEnableSubmit(false);
            
    },[experience.addr,formData.batch]);
    
    const onChange = e => {
        setFormData({...formData, [e.target.name]:e.target.value})
    };
  
    const onAddrChange = e => {
        setFormData({...formData, addr: {...formData.addr, [e.target.name]:e.target.value}});
    }
    
    const onSubmit = e =>{
        e.preventDefault();
        props.createProfile(formData, props.history);
    }

    //loading
    if(!props.user) return <Spinner />
    return (
        <section className="container">
            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">Let's get some information to stand out your profile</p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">    
                    <select name="branch" id="branch" value={branch} onChange={e=>onChange(e)}>
                        <option value="cse">CSE</option>
                        <option value="me">ME</option>
                        <option value="ee">EE</option>
                        <option value="ec">EC</option>
                        <option value="ce">CE</option>
                        <option value="che">CHE</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="College" name="college" 
                    onChange={e=>onChange(e)} value={college} disabled/>
                </div>
                <div className="form-group">    
                    <select name="qualification" id="qualification" value={qualification} onChange={e=>onChange(e)}>
                        <option value="be">BE</option>
                        <option value="btech">BTECH</option>
                        <option value="mtech">MTECH</option>
                        <option value="ms">MS</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="number" placeholder="*Batch Year" name="batch"
                    value={batch} onChange={e=>onChange(e)} required/>
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Your website" name="website" 
                    value={website} onChange={e=>onChange(e)}/>
                </div>

                <div className="form-group">
                    <label className="form-text lead my-2">Address Information</label>
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
                    <button className="btn btn-light" onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button"
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
                    <input type="submit" className="btn btn-primary"value="Create Profile" disabled={ !(props.user && props.user.role === "student") && !enableSubmit}/>
                </div>
                
            </form>
        </section>
    )
}

CreateProfile.propTypes = {
    user: PropTypes.object,
    createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user:state.auth.user
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
