import axios from "axios";
import {setAlert} from "./alert";
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    SEARCHING_POSTS,
    START_SUBMIT,
    STOP_SUBMIT
} from "./types";


//GET POSTS
export const getPosts = (filter) => async dispatch => {
    try{

        dispatch({
            type:SEARCHING_POSTS
        });
        
        const res = await axios.get("/api/posts", {
            params: filter
        }
        );

        dispatch({
            type:GET_POSTS,
            payload: res.data.posts
        });

    }catch(err){

        dispatch({
            type: POST_ERROR,
            payload:{msg:err.response.data.msg, status:err.response.data.status}
        });
    }
}


//GET A POST
export const getPost = id => async dispatch => {
    try{
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type:GET_POST,
            payload: res.data.post
        });

    }catch(err){
        dispatch({
            type: POST_ERROR,
            payload:{msg:err.response.data.msg, status:err.response.data.status}
        });
    }
}

//delete post
export const deletePost = id => async dispatch => {

    try{
        dispatch({
            type:START_SUBMIT
        });

        const res = await axios.delete(`/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        });
        dispatch(setAlert("Post has been deleted"));
    }catch(err){
        console.log(err.response.data);
        dispatch({
            type:POST_ERROR,
            payload: {msg: err.response.data.msg, status: err.response.data.status}
        })
    }finally{
        dispatch({type:STOP_SUBMIT});
    }
};

//add post
export const addPost = formData => async dispatch => {

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    try{
        dispatch({
            type:START_SUBMIT
        });

        const res = await axios.post("/api/posts", formData, config);

        dispatch({
            type:ADD_POST,
            payload: res.data.post
        });
        dispatch(setAlert("Post created"));

    }catch(err){
        console.log(err.response.data);
        dispatch({
            type:POST_ERROR,
            payload:{msg: err.response.data.msg, status: err.response.data.status}
        })
    }finally{
        dispatch({
            type:STOP_SUBMIT
        })
    }
};


//add comment
export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    try{
        const res = await axios.post(`/api/posts/comments/${postId}`, formData, config);

        dispatch({
            type:ADD_COMMENT,
            payload: res.data.comments
        });
        dispatch(setAlert("Comment Added"));

    }catch(err){
        console.log(err.response.data);
        dispatch({
            type:POST_ERROR,
            payload:{msg: err.response.data.msg, status: err.response.data.status}
        })
    }
};

//delete comment
export const deleteComment = (postId, commentId) => async dispatch => {

    try{
        const res = await axios.delete(`/api/posts/comments/${postId}/${commentId}`);

        dispatch({
            type:REMOVE_COMMENT,
            payload: res.data.comments
        });
        dispatch(setAlert("Comment Deleted"));

    }catch(err){
        console.log(err.response.data);
        dispatch({
            type:POST_ERROR,
            payload:{msg: err.response.data.msg, status: err.response.data.status}
        })
    }
};