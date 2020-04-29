import {REGISTER_SUCCESS, REGISTER_FAIL, START_SUBMIT, 
    STOP_SUBMIT,
    LOGIN_SUCCESS, LOGIN_FAILURE,
    USER_LOADED, AUTH_ERROR, LOGOUT, ACCOUNT_DELETED
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