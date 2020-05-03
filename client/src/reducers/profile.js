import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    PROFILE_PICTURE_UPDATED,
    FETCHING_PROFILES,
    GET_MORE_PROFILES
} from "../actions/types";

const initialState = {
    profile:null,
    profiles:[],
    loading: true,
    error:{}
};

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_PROFILES:
            return {
                ...state, 
                profiles: payload,
                loading: false
            } 
        case GET_MORE_PROFILES:
            return {
                ...state,
                profiles: state.profiles.concat(payload)
            }
        case PROFILE_PICTURE_UPDATED:{
            return {
                ...state,
                profile: {...state.profile,display_picture: payload}
            }
        }       
        case UPDATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                profile:null,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile:null,
                loading:true
            }
        case FETCHING_PROFILES:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}