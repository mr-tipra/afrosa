import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getPosts} from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import PostSearch from "./PostSearch";

const Posts = props => {

    useEffect(() => {
        props.getPosts();
    }, [props.getPosts]);

    const handleSearchChange = data => {
        for(let key in data){
            if(data[key] == "")
                delete data[key];
        }
        
        props.getPosts(data);
    };

    return props.post.loading? <Spinner /> : (
        <section className="container">
            <h1 className="large text-primary">Posts</h1>
            <PostForm />
            <PostSearch onDataChange={handleSearchChange}/>
            <div className="posts">
                {props.post.isSearching?<Spinner />:
                <Fragment>
                    {
                    props.post.posts.length === 0 ? <h2 className="large text-primary my-1">No Posts</h2>:
                    props.post.posts.map(p => (
                        <PostItem key={p._id} post={p} />
                    ))
                    }
                </Fragment>
                }
            </div>
        </section>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);
