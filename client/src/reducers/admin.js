import {
    ADMIN_GET_ALL_USERS, ADMIN_ERROR, ADMIN_VERIFY_USER, ADMIN_DELETE_USER, ADMIN_GET_ALL_ALUMNI,
    ADMIN_GET_ALL_STUDENTS,
    ADMIN_VERIFY_USER_EMAIL,
    ADMIN_LOADING
} from "../actions/types";


const initialState = {
    users: [],
    loading: true
};

export default function(state = initialState, action){
    const {type, payload} = action;
    switch(type){

        case ADMIN_GET_ALL_USERS:
        case ADMIN_GET_ALL_STUDENTS:
        case ADMIN_GET_ALL_ALUMNI:
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
        case ADMIN_VERIFY_USER_EMAIL:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.enroll_no == payload)
                        return {...user, email_verified: true};
                    return user;
                })
            }
        case ADMIN_DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.enroll_no !== payload)
            }
        case ADMIN_LOADING:
            return { 
                ...state,
                loading: true
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