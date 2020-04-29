import React, {useState} from 'react'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import MessageForm from "./MessageForm";

const MessageItem = (props) => {
    const msg = props.msg;

    const [reply, setReply] = useState(false);

    return (
    <div className="message bg-light">
        <h4 className="text-primary from">From: <Link to={`/profile/${msg.from._id}`}>{msg.from.name}</Link></h4>
        {msg.subject !== "" &&
            <h4 className="subject"> Title: {msg.subject}</h4>
        }
        <p className="body">{msg.body}</p>
        <button className="btn btn-primary" onClick={e => setReply(!reply)}>Reply</button>
        
        {reply && <MessageForm to={{name: msg.from.name, id:msg.from}}/>}
    </div>)
}

MessageItem.propTypes = {
    msg: PropTypes.object.isRequired
}

export default MessageItem;