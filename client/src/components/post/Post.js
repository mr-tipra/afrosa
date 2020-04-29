import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Spinner from "../layout/Spinner";
import {getPost} from "../../actions/post";
import Moment from "react-moment";
import CommentForm from './CommentForm';
import CommentItem from "./CommentItem"
import ProfileImage from "../profile/ProfileImage";

const Post = ({getPost, post:{post, loading}, match}) => {

    useEffect( () => {
        getPost(match.params.id)
    }, [getPost]);

    return loading || post === null ? <Spinner />:
        (<section className="container">

            <Link className="btn btn-primary" to="/posts">
                Back to posts
            </Link>

            <div className="post bg-light my-1">

                <div>
                    <Link to={`/profile/${post.user}`}>
                        <ProfileImage image = {post.avatar} />
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
                </div>
            </div>
            <CommentForm postId={post._id}  /> 
            <div>
                <p className="lead">Comments</p>
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id}/>
                ))}
            </div>
        </section>);

        
        
    
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPost})(Post);
