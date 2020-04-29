import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {addPost} from "../../actions/post";

const PostForm = ({addPost, submitting}) => {

    const [formData, setFormData] = useState({
        text:"",
        tags:""
    });

    const onChange = e => {
        setFormData({
            ...formData, [e.target.name]:e.target.value
        });

    };

    const [formVisible, setFormVisible] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        const data = {...formData};
        data.tags = data.tags.split(/[\s,]/);
        data.tags = data.tags.filter(tag => tag != "");
        data.tags = data.tags.map(tag => tag.toLowerCase());
        addPost(data);
    }
    return (
        <div className="post-form">

            <div className="post-form-header">
                <button className="btn btn-primary" onClick={e => setFormVisible(!formVisible)}>Create Post</button>
            </div>
            <form className="form my-1" style={ {display: formVisible?'block':'none'} } onSubmit = {onSubmit}>
                <textarea
                name="text"
                cols="30" rows="5" placeholder="What you wanna say?"
                onChange = {onChange}
                value={formData.text}
                required
                ></textarea>
                <input className="my-1" type="text" name="tags" onChange={onChange} value={formData.tags} placeholder="Tags.."/>
                <input className="btn btn-dark" type="submit" disabled={submitting} value="Post"/>
            </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    submitting: state.auth.submitting
});

export default connect(mapStateToProps, {addPost})(PostForm);
