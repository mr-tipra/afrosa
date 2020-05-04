import {REGISTER_SUCCESS, REGISTER_FAIL, START_SUBMIT, 
    STOP_SUBMIT,
    LOGIN_SUCCESS, LOGIN_FAILURE,
    USER_LOADED, AUTH_ERROR, LOGOUT, ACCOUNT_DELETED, ADD_TO_BLOCKLIST, REMOVE_FROM_BLOCKLIST,
    SEEN_MESSAGES
} from "../actions/types";

const initialState = {
    loading: true,
    submitting: false,
    isAuthenticated: false,
    token: localStorage.getItem("token")
};

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){

        case USER_LOADED:
            return {
                ...state, 
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading:false
            }
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false
            }
        case START_SUBMIT:
            return {
                ...state, submitting: true
            }
        case STOP_SUBMIT:
            return {
                ...state, submitting: false
            }

        case SEEN_MESSAGES:
            return {
                ...state,
                user: {...state.user, newMessage: false}
            }
        case ADD_TO_BLOCKLIST:
        case REMOVE_FROM_BLOCKLIST:
            return {
                ...state,
                user: {...state.user, blocklist: payload}
            }
        
        case LOGIN_SUCCESS:
            localStorage.setItem("token",payload.token);
            return {
                ...state,
                isAuthenticated : true,
                token:payload.token
            }
        case LOGIN_FAILURE:
        case AUTH_ERROR:
        case ACCOUNT_DELETED:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state, 
                isAuthenticated: false,
                loading: false,
                user:undefined,
                token: null
            }

        default:
            return state;

    }
};