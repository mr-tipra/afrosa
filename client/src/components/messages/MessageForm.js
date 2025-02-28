import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {sendMessage} from "../../actions/message";

const MessageForm = props => {

    const [formData, setFormData] = useState({
        subject:"",
        body:""
    });
    const onChange = e => {
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();

        const data = {...formData};
        if(data.subject === "")
            delete data['subject'];
        props.sendMessage({...data, to:props.to.id});
        
    }
    return (

        <div className="message-form py-1">
            <p className="lead text-primary">Send Message</p>
            <form className="form" onSubmit={onSubmit}>

                <div className="form-group">
                    <input type="text" name="subject" placeholder="subject"
                    onChange ={onChange}/>
                </div>
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

MessageForm.propTypes = {
    submitting: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    submitting: state.auth.submitting,
});

export default connect(mapStateToProps, {sendMessage})(MessageForm);
