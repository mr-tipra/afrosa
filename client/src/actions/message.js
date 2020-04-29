import axios from "axios";
import {setAlert} from "./alert";
import {
    GET_MESSAGES, FETCHING_MESSAGES,
    MESSAGE_ERROR,
    FETCHED_MESSAGES,
    START_SUBMIT,
    STOP_SUBMIT,
    MESSAGE_SENT
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
        dispatch({
            type:MESSAGE_ERROR,
            error: err.response.data.msg
        });

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
        console.log(res.data);
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


