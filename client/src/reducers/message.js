
import {
    GET_MESSAGES, MESSAGE_ERROR, FETCHING_MESSAGES, FETCHED_MESSAGES, REPLY_SENT
} from "../actions/types";

const initialState = {
    messages:[],
    loading: true
};

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_MESSAGES:
            return {
                ...state,
                messages: payload,
                loading: false
            }
        case REPLY_SENT:
            return {
                ...state,
                messages: state.messages.map(msg => {
                    if(msg._id === payload._id)
                        return payload;
                    return msg;
                })
            }
        case MESSAGE_ERROR:
            return {
                ...state,
                messages:[],
                loading: true
            }
        case FETCHING_MESSAGES:
            return {
                ...state,
                loading: true
            }
        case FETCHED_MESSAGES:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}