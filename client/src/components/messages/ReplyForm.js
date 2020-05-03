import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {sendReply} from "../../actions/message";

const ReplyForm = props => {

    const [formData, setFormData] = useState({
        body:""
    });
    const onChange = e => {
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        const data = {...formData};
        props.sendReply(props.msg._id,data);
        
    }
    return (

        <div className="message-form py-1">
            <p className="lead text-primary">Send Reply</p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <textarea type="text" name="body" rows="5" cols="30" value={formData.body} 
                    placeholder="Your message..."
                    onChange={onChange}
                    required/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" disabled={props.submitting} value="Send Message"/>
                </div>
            </form>
        </div>
    )
}

ReplyForm.propTypes = {
    submitting: PropTypes.bool.isRequired,
    msg: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    submitting: state.auth.submitting
});

export default connect(mapStateToProps, {sendReply})(ReplyForm);
