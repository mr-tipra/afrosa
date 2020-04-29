import React,{Fragment} from 'react'
import spinner from "../../assests/loader.gif";

const Spinner = (props) => {
    return (
        <Fragment>
            <div className="loader">
                <img src={spinner} alt="spinner"/>
            </div>
        </Fragment>
    )
}

export default Spinner;
