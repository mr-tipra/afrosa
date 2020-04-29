import axios from "axios";
import {setAlert} from "./alert";
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILES,
    PROFILE_PICTURE_UPDATED,
    FETCHING_PROFILES,
    START_SUBMIT,
    STOP_SUBMIT
} from "./types";

//get profile
export const getCurrentProfile = () => async dispatch => {
    try{
        dispatch({type:CLEAR_PROFILE});
        const res = await axios.get("/api/profile/me");

        dispatch({
            type:GET_PROFILE,
            payload: res.data.profile
        })

       
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg:err.response.data.msg, status:err.response.data.status}
        });

    }
}

//update profile picture
export const updateProfilePicture = (file, setPercent) => async dispatch => {
    try{
        const formData = new FormData();
        formData.append("photo", file);

        const res = await axios.put("/api/profile/photo", formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            onUploadProgress: progressEvent => {
                const percent = parseInt(Math.round((progressEvent.loaded* 100)/progressEvent.total));
                setPercent(percent);
                
            }
        });

        dispatch({
            type: PROFILE_PICTURE_UPDATED,
            payload: res.data.file
        });

        setAlert("Profile picture updated");

    }catch(err){
        setAlert("Profile can't be updated");
    }
}
//create or update profile
export const createProfile  = (formData, history, edit = false) => async dispatch => {

    try{

        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        };
        
        dispatch({
            type:START_SUBMIT
        });

        //format form data
        const res = await axios.post("/api/profile", formData, config);

        dispatch({
            type:GET_PROFILE,
            payload: res.data.profile
        });

        dispatch(setAlert(edit? 'Profile has been updated':"Profile has been created"));
        if(!edit){
            history.push("/dashboard");
        }
    }catch(err){
        console.log(err.response);
        if(err.response.data.kind === "InvalidInput"){
            err.response.data.msg.forEach(msg => dispatch(setAlert(msg)));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.data.msg, statusCode: err.response.data.status}
        })
    }finally{
        dispatch({
            type:STOP_SUBMIT
        });
    }

}


//add experience
export const addExperience = (formData, history) => async dispatch => {

    try{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        };

        //format form data
        const res = await axios.put("/api/profile/experiences", formData, config);

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data.profile
        });

        dispatch(setAlert("Experience Added"));
        history.push("/dashboard");

    }catch(err){
        console.log(err.response);
        if(err.response.data.kind === "InvalidInput"){
            err.response.data.msg.forEach(msg => dispatch(setAlert(msg)));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.data.msg, statusCode: err.response.data.status}
        })
    }

};


//add education
export const addQualification = (formData, history) => async dispatch => {

    try{
        const config = {
            headers:{
                "Content-Type":"application/json"
            }
        };

        dispatch({
            type:START_SUBMIT
        });

        //format form data
        const res = await axios.put("/api/profile/qualifications", formData, config);

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data.profile
        });

        dispatch(setAlert("Qualification Added"));
        history.push("/dashboard");

    }catch(err){
        if(err.response.data.kind === "InvalidInput"){
            err.response.data.msg.forEach(msg => dispatch(setAlert(msg)));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.data.msg, statusCode: err.response.data.status}
        })
    }finally{
        dispatch({
            type:STOP_SUBMIT
        })
    }

};


//delete experience
export const deleteExperience = id => async dispatch => {
    try{
        dispatch({
            type:START_SUBMIT
        });
        const res = await axios.delete(`/api/profile/experiences/${id}`);

        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data.profile
        });
        dispatch(setAlert("Experience removed"));
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.data.msg, statusCode: err.response.data.status}
        });
    
    }finally{
        dispatch({
            type:STOP_SUBMIT
        })
    }
}

//delete qualification
export const deleteQualification = id => async dispatch => {
    try{
        dispatch({
            type:START_SUBMIT
        });

        const res = await axios.delete(`/api/profile/qualifications/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data.profile
        });
        dispatch(setAlert("Qualification removed"));
    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg: err.response.data.msg, statusCode: err.response.data.status}
        });
    }finally{
        dispatch({
            type:STOP_SUBMIT
        })
    }
}

//delete account and profile
export const deleteAccount = id => async dispatch => {

    if(window.confirm("Are you sure? This can not be undone")){
        try{
            await axios.delete(`/api/profile`);
            dispatch({
                type:CLEAR_PROFILE
            });
            dispatch({type:ACCOUNT_DELETED});
            dispatch(setAlert("Your account has been deleted"));
        }catch(err){
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg: err.response.data.msg, statusCode: err.response.data.status}
            });
        
        }
    }
}


//get all profiles
export const getAllProfiles = (query) => async dispatch => {
    dispatch({
        type:FETCHING_PROFILES
    });

    try{
      
        const res = await axios.get("/api/profile",{
            params: query
        });

        dispatch({
            type:GET_PROFILES,
            payload: res.data.profiles
        })

    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.data.msg, statusCode: err.response.data.status}
        })
    }
}


//get profile by id
export const getProfileById = uid => async dispatch => {

    dispatch({
        type:CLEAR_PROFILE
    });

    try{
        const res = await axios.get(`/api/profile/${uid}`);
        dispatch({
            type:GET_PROFILE,
            payload: res.data.profile
        })

    }catch(err){
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.data.msg, statusCode: err.response.data.status}
        })
    }
}

