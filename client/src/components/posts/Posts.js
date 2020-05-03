import React,{Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getPosts, getMorePosts} from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import PostSearch from "./PostSearch";


//infintie pagination
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = props => {

    const [page, setPage] = useState(0);
    const count = 3;

    useEffect(() => {
        props.getPosts();
    }, [props.getPosts]);

    const [searchData, setSearchData] = useState(null);
    const handleSearchChange = data => {
        for(let key in data){
            if(data[key] == "")
                delete data[key];
        }  
        setSearchData(data);
        setPage(0);
        props.getPosts({...data, page:0, count});
    };
    const fetchMore = () => {
        props.getMorePosts({...searchData, page:page+1, count});
        setPage(page => page+1);
    };

    return props.post.loading? <Spinner /> : (
        <section className="container">
            <h1 className="large text-primary">Posts</h1>
            <PostForm />
            <PostSearch onDataChange={handleSearchChange}/>
            <div className="posts">
                {props.post.isSearching?<Spinner />:
                <InfiniteScroll
                    dataLength={props.post.posts.length}
                    next={fetchMore}
                    hasMore={true}
                    endMessage={<p>That's it!</p>}
                >
                    {
                    props.post.posts.length === 0 ? <h2 className="large text-primary my-1">No Posts</h2>:
                    props.post.posts.map(p => (
                        <PostItem key={p._id} post={p} />
                    ))
                    }
                </InfiniteScroll>
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

export default connect(mapStateToProps, {getPosts, getMorePosts})(Posts);
