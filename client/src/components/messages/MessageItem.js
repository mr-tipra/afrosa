import React, {useState} from 'react'
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import ReplyForm from "./ReplyForm";
import MessageThread from "./MessageThread";

const MessageItem = (props) => {
    const msg = props.msg;

    const [reply, setReply] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const sent = msg.from._id === props.user._id;
    const id = sent?msg.to._id:msg.from._id;
    const headerName = sent? msg.to.name:msg.from.name;

    const isBlocked = props.user.blocklist.findIndex(u => u === id) !== -1;
    const isAdmin = props.user.role !== 'student' || props.user.role !== 'alumni';
    const onBlockClick = e => {
        if(isBlocked)
            props.removeFromBlocklist(id);
        else 
            props.addToBlocklist(id);
    }
    return (
    <div className="message bg-light">
        <h4 className="text-primary from">{sent?<span>To</span>:<span>From</span>}: <Link to={`/profile/${id}`}>{headerName}</Link></h4>
        {msg.subject !== "" &&
            <h4 className="subject"> Title: {msg.subject}</h4>
        }
        <p className="body">{msg.body}</p>
        <button className="btn btn-primary" onClick={e => setShowReplies(!showReplies)}>{showReplies?'Hide':'Show'} Replies</button>
        { !isAdmin && <button className="btn btn-danger" onClick={onBlockClick}  disabled={props.isSubmitting}>{isBlocked?"Remove from":"Add to"} blocklist</button>}
        {showReplies && <MessageThread msg={msg} user={props.user} /> }
        <button className="btn btn-primary" onClick={e => setReply(!reply)}>Reply</button>
        {reply && <ReplyForm msg={msg} user={props.user} />}
    </div>)
}

MessageItem.propTypes = {
    msg: PropTypes.object.isRequired
}

export default MessageItem;