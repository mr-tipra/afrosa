import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    START_SUBMIT,
    STOP_SUBMIT,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT,
    CLEAR_PROFILE,
    EMAIL_VERIFIED,
    RESET_PASSWORD
} from "./types";

import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//load user
export const loadUser = () => async dispatch => {
    if(localStorage.getItem("token"))
        setAuthToken(localStorage.getItem("token"));

    try{
        const res = await axios.get("/api/auth/me");
        dispatch({
            type:USER_LOADED,
            payload:res.data.user
        });
        
    }catch(err){
        dispatch({
            type:AUTH_ERROR
        })
    }

};

//register user
export const register = ({name, email, password, enroll_no, role}) => async dispatch => {
    const config= {
        "Content-Type":"application/json"
    };
    const body = {name,email,password,enroll_no, role};
    try{
        dispatch(startSubmit());
        const res = await axios.post("/api/auth/register",body, config);
        dispatch(setAlert("Registration Success! Please verify email","success"));

        dispatch({
            type:REGISTER_SUCCESS,
        })
    }catch(err){
        const errorRes = err.response.data;
        const kind = errorRes.kind;

        if(kind === "DupliKey"){
            if(errorRes.msg["email"])
                dispatch(setAlert("Email id already registerd", "danger"));
            if(errorRes.msg["enroll_no"])
                dispatch(setAlert("Enrollment Number already registered", "danger"));
        }

        dispatch({
            type:REGISTER_FAIL
        })
    }finally{
        dispatch(stopSubmit());
    }
};

//login user
export const login = ({password, enroll_no}) => async dispatch => {
    const config= {
        "Content-Type":"application/json"
    };

    const body = {password,enroll_no};
    try{
        dispatch(startSubmit());
        const res = await axios.post("/api/auth/login",body, config);

        dispatch({
            type:LOGIN_SUCCESS,
            payload: {token:res.data.token}
        });

        dispatch(loadUser());

    }catch(err){
        const errorRes = err.response.data;
        const kind = errorRes.kind;
        dispatch(setAlert(errorRes.msg, "danger"));


        dispatch({
            type:AUTH_ERROR
        });
    }finally{
        dispatch({
            type:STOP_SUBMIT
        })
    }
};

export const resetPassword = (formData) => async dispatch => {

    try{
        dispatch({
            type:START_SUBMIT
        });
        const config = {
            'Content-Type':'application/json'            
        };

        const res = await axios.post("/api/auth/forgotpassword", formData, config);
        dispatch({
            type: RESET_PASSWORD
        });

        dispatch(setAlert("Reset Link has been sent to your email", "success"));
    }catch(err){
        const errRes = err.response.data;
        dispatch(setAlert(errRes.msg, "danger"));
        dispatch({
            type: AUTH_ERROR
        });
    }
    finally{
        dispatch({
           type: STOP_SUBMIT
        });
    }
};
export const verifyResetToken = (token, formData) => async dispatch => {

    try{
        dispatch({
            type:START_SUBMIT
        });

        const config = {
            'Content-Type':"application/json"
        };

        const res = await axios.put(`/api/auth/resetpassword/${token}`, formData,
        config);

        dispatch(setAlert("Password Resetted","success"));
    }catch(err){

        dispatch(setAlert("Error Resetting the password"));
    }
    finally{
        dispatch({
            type: STOP_SUBMIT
        })
    }
}

export const verifyEmail = token => async dispatch => {

    try{
        const res = await axios.put(`/api/auth/verifyemail/${token}`);
        dispatch({
            type:EMAIL_VERIFIED
        });
        dispatch(setAlert("Email Verified!"));
    }catch(err){
        const errorRes = err.response.data;
        const kind = errorRes.kind;
        dispatch(setAlert("Invalid Verification"));
        dispatch({
            type:AUTH_ERROR
        });
    }
};

//Logout,Clear profile
export const logout = () =>dispatch => {
    dispatch({type: CLEAR_PROFILE});
    dispatch({ type:LOGOUT});
};

export const startSubmit = () => {
    return {
        type:START_SUBMIT
    }
};
export const stopSubmit = () => {
    return {
        type:STOP_SUBMIT
    }
}