import React from 'react'
import Moment from "react-moment";

const  MessageThread = (props) => {

    const replies = props.msg.thread;

    return (

        <div className="thread">
            {replies.length === 0 ? <p>No replies</p>
            :
            replies.map(reply => <div key={reply._id} className={reply.sender === props.user._id?"reply sender":"reply receiver"}>
                <div>{reply.body}  
                    <br/>   
                    <span className="text-primary">Made on <Moment format="DD/MM/YY">{reply.date}</Moment> </span>
                </div>
            </div>)
            }
        </div>
    )
}

export default MessageThread;