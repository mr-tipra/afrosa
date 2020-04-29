import {
    ADMIN_GET_ALL_USERS, ADMIN_ERROR, ADMIN_VERIFY_USER
} from "../actions/types";


const initialState = {
    users: [],
    loading: true
};

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){

        case ADMIN_GET_ALL_USERS:
            return {
                ...state,
                users: payload,
                loading: false
            }
        case ADMIN_VERIFY_USER:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.enroll_no === payload)
                        return {...user, college_verified: true};
                        
                    return user;
                })
            }
        case ADMIN_ERROR:
            return {
                ...state,
                users: [],
                loading: true
            }
        default:
            return state;
    }
}