import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {addComment} from "../../actions/post";

const CommentForm = ({addComment, postId}) => {


    const [text, setText] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        addComment(postId, {text})
        console.log(text);
        setText("");
    };

    return (
        <div className="post-form">
            <h2 className="post-form-header">Add Comment</h2>
            <form className="form my-1" onSubmit = {onSubmit}>
                <textarea
                name="text"
                cols="30" rows="5" placeholder="Comment..."
                onChange = {e => setText(e.target.value)}
                value={text}
                required
                ></textarea>
                <input className="btn btn-dark my-1" type="submit" value="Post"/>
            </form>
        </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired
}

export default connect(null, {addComment})(CommentForm);
