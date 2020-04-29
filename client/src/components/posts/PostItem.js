import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {connect} from "react-redux";
import {deletePost} from "../../actions/post";
import ProfileImage from "../profile/ProfileImage";

const PostItem = ({post, auth, deletePost}) => {

    const onClick = e=>{
        deletePost(post._id);
    };

    return (

        <div className="post bg-light my-1">
            <div>
                <Link to={`/profile/${post.user}`}>
                    <ProfileImage image={post.avatar} />
                    <h4>{post.name}</h4>
                </Link>
            </div>

            <div>
                <p>{post.text}</p>
                <p className="text-primary">Posted on <Moment format="DD/MM/YYYY">{post.date}</Moment></p>
                {
                    post.tags && post.tags.length>0 &&
                    <div className="tags">
                        {post.tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                }
                <Link to={`/posts/${post._id}`} className="btn btn-primary">
                    Discussion {post.comments.length > 0 && 
                        <span>{post.comments.length}</span>
                    }
                </Link>
                {!auth.loading && post.user === auth.user._id && <button className="btn btn-danger" disabled={auth.submitting} onClick={onClick}>Delete</button>}
            </div>
        </div>
    )
}

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{deletePost})(PostItem)
