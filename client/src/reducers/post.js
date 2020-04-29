
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    SEARCHING_POSTS
} from "../actions/types";

const initialState = {
    posts: [],
    post: null,
    loading: true,
    isSearching: true,
    error: {}
};

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){

        case GET_POSTS:
            return {
                ...state, 
                posts: payload,
                loading: false,
                isSearching: false
            }
        case SEARCHING_POSTS:
            return {
                ...state,
                isSearching: true
            }
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false,
                isSearching: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                post: {...state.post, comments: payload},
                loading: false
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments:payload
                },
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p._id !== payload),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}