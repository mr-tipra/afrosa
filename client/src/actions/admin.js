import axios from "axios";
import {
    ADMIN_GET_ALL_USERS, ADMIN_ERROR, ADMIN_VERIFY_USER
} from "./types";
import { setAlert } from "./alert";


export const getAllUsers = query => async dispatch => {
    try{
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