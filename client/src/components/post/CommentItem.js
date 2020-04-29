import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {deleteComment} from "../../actions/post";
import ProfileImage from "../profile/ProfileImage";

const CommentItem = ({
    postId,
    comment,
    auth,
    deleteComment
}) => {
    return (
        <div className="post bg-dark my-1">
            <div>
                <Link to={`/profile/${comment.user}`}>
                    <ProfileImage image ={comment.avatar} />
                    <h4>{comment.name}</h4>
                </Link>
            </div>
            <div>
                <p style={{whiteSpace:"pre-wrap"}}>{comment.text}</p>
                <p className="text-primary">Made on <Moment format="DD/MM/YYYY">{comment.date}</Moment></p>
          
                {!auth.loading && auth.user._id === comment.user && <button className="btn btn-danger" onClick={e => deleteComment(postId,comment._id)}>Delete</button>}
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {deleteComment})(CommentItem);
