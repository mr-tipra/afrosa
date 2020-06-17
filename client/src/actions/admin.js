import axios from "axios";
import {
    ADMIN_GET_ALL_USERS, ADMIN_ERROR, ADMIN_VERIFY_USER, ADMIN_VERIFY_USER_EMAIL,
    ADMIN_DELETE_USER,
    ADMIN_GET_ALL_STUDENTS,
    ADMIN_GET_ALL_ALUMNI,
    ADMIN_LOADING
} from "./types";
import { setAlert } from "./alert";


export const getAllUsers = query => async dispatch => {
    try{
        dispatch({
            type:ADMIN_LOADING
        });
        const res = await axios.get("/api/users", {
            params: query
        });
        dispatch({
            type: ADMIN_GET_ALL_USERS,
            payload: res.data.users
        });

    }catch(err){
        dispatch({
            type:ADMIN_ERROR
        })
    }
};


export const getAllStudents = query => async dispatch => {
    try{
        dispatch({
            type:ADMIN_LOADING
        });

        const res = await axios.get("/api/users/students", {
            params: query
        });
        dispatch({
            type: ADMIN_GET_ALL_STUDENTS,
            payload: res.data.users
        });

    }catch(err){
        dispatch({
            type:ADMIN_ERROR
        })
    }
};

export const getAllAlumni = query => async dispatch => {
    try{
        dispatch({
            type:ADMIN_LOADING
        });
        
        const res = await axios.get("/api/users/alumni", {
            params: query
        });
        dispatch({
            type: ADMIN_GET_ALL_ALUMNI,
            payload: res.data.users
        });

    }catch(err){
        dispatch({
            type:ADMIN_ERROR
        })
    }
};



export const deleteUser = eno => async dispatch => {
    try{
        const res = await axios.delete(`/api/users/${eno}`);
        dispatch({
            type: ADMIN_DELETE_USER,
            payload: eno
        });
        dispatch(setAlert("User Deleted","success"));
    }catch(err){
        dispatch({
            type:ADMIN_ERROR
        });
    }
}
export const verifyUser = eno => async dispatch => {
    try{
        const res = await axios.put(`/api/users/collegeverify/${eno}`);
        dispatch({
            type:ADMIN_VERIFY_USER,
            payload: eno
        });
        dispatch(setAlert("User Verified","success"));
    }catch(err){
        dispatch({
            type:ADMIN_ERROR
        });
    }
}
export const verifyEmail = eno => async dispatch => {
    try{
        const res = await axios.put(`/api/users/emailverify/${eno}`);
        dispatch({
            type:ADMIN_VERIFY_USER_EMAIL,
            payload: eno
        });
        dispatch(setAlert("User Email Verified","success"));

    }catch(err){
        dispatch({
            type:ADMIN_ERROR
        });
    }
}