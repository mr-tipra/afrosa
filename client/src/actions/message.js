import axios from "axios";
import {setAlert} from "./alert";
import {
    GET_MESSAGES, FETCHING_MESSAGES,
    MESSAGE_ERROR,
    FETCHED_MESSAGES,
    START_SUBMIT,
    STOP_SUBMIT,
    MESSAGE_SENT,
    REPLY_SENT,
    ADD_TO_BLOCKLIST,
    REMOVE_FROM_BLOCKLIST
} from "./types";


export const sendMessage = (data) => async dispatch => {
    try{
        dispatch({
            type: START_SUBMIT
        });

        const res = await axios.post("/api/messages",data, {
            headers:{
                'Content-Type':"application/json"
            }
        });
        dispatch({
            type:MESSAGE_SENT
        });

        dispatch(setAlert("Message has been sent"));

    }catch(err){
        const msg = err.response.data.msg;
        if(msg === "blocked_user")
            dispatch(setAlert("Blocked User"));
        else{
            dispatch({
                type:MESSAGE_ERROR,
                error: err.response.data.msg
            });
        }

    }finally{
        dispatch({
            type:STOP_SUBMIT
        })
    }
}

export const sendReply = (mid, data) => async dispatch => {
    try{
        dispatch({
            type: START_SUBMIT
        });

        const res = await axios.post(`/api/messages/${mid}`,data, {
            headers:{
                'Content-Type':"application/json"
            }
        });
        dispatch({
            type:REPLY_SENT,
            payload: res.data.msg
        });

        dispatch(setAlert("Reply has been sent"));

    }catch(err){

        const msg = err.response.data.msg;
        if(msg === "blocked_user")
            dispatch(setAlert("User Blocked"));
        else{
            dispatch({
                type:MESSAGE_ERROR,
                error: err.response.data.msg
            });
        }

    }finally{
        dispatch({
            type:STOP_SUBMIT
        })
    }
}
//get all messages of current logged in user
export const getMessages = () => async dispatch => {

    try{
        dispatch({
            type:FETCHING_MESSAGES
        });

        const res = await axios.get("/api/messages/me");
        dispatch({
            type:GET_MESSAGES,
            payload: res.data.messages
        });

    }catch(err){
        dispatch({
            type:MESSAGE_ERROR,
            error: err.response.data.msg
        })
    }finally{
        dispatch({
            type:FETCHED_MESSAGES
        })
    }
};

//add to blocklist
export const addToBlocklist = (uid) => async dispatch => {
    try{
        dispatch({
            type: START_SUBMIT
        });

        const res = await axios.put(`/api/messages/block/${uid}`);

        dispatch({
            type:ADD_TO_BLOCKLIST,
            payload: res.data.blocklist
        });

        dispatch(setAlert("Added to blocklist"));

    }catch(err){
        dispatch({
            type:MESSAGE_ERROR,
            error: err.response.data.msg
        });

    }finally{
        dispatch({
            type:STOP_SUBMIT
        });
    }
}


//remove from blocklist
export const removeFromBlocklist = (uid) => async dispatch => {
    try{
        dispatch({
            type: START_SUBMIT
        });

        const res = await axios.delete(`/api/messages/block/${uid}`);

        dispatch({
            type:REMOVE_FROM_BLOCKLIST,
            payload: res.data.blocklist
        });

        dispatch(setAlert("Removed from blocklist"));

    }catch(err){
        dispatch({
            type:MESSAGE_ERROR,
            error: err.response.data.msg
        });

    }finally{
        dispatch({
            type:STOP_SUBMIT
        });
    }
}
