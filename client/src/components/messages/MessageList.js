import React,{useEffect, Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getMessages, addToBlocklist, removeFromBlocklist, seenMessages} from "../../actions/message";
import Spinner from "../layout/Spinner";
import MessageItem from "./MessageItem";

const MessageList = ({message, getMessages, user, addToBlocklist, removeFromBlocklist, seenMessages,  submitting}) => {

    useEffect(() => {
        getMessages();
        seenMessages();
    }, []);

    const [sentMessages, setSentMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {

        const sent = [], received = [];
        message.messages.map(msg => {
            if(msg.from._id === user._id)
                sent.push(msg)
            else 
                received.push(msg);
        });
        setSentMessages(sent);
        setReceivedMessages(received);
    }, [message.messages]); 

    return (
        <section className="container">
            <h1 className="large text-primary">Messages</h1>
            {message.loading?<Spinner />:
            <Fragment>
                {sentMessages.length === 0 && receivedMessages.length===0?<p className="lead">No Messages</p>:
                <div className="messages">
                    <div className="sent">
                        <h2>Sent</h2>
                        {sentMessages.map(msg => <MessageItem key={msg._id} msg={msg} user={user} 
                        removeFromBlocklist={removeFromBlocklist}
                        addToBlocklist={addToBlocklist}
                        isSubmitting ={submitting}/>
                        )}
                    </div>
                    <div className="received">
                        <h2>Received</h2>
                        {receivedMessages.map(msg => <MessageItem key={msg._id} msg={msg} user={user}
                        removeFromBlocklist={removeFromBlocklist}
                         addToBlocklist={addToBlocklist}
                         isSubmitting={submitting} />)}
                    </div>
                </div>
                }
            </Fragment>
            }
            

        </section>
    )
}

MessageList.propTypes = {
    message: PropTypes.object.isRequired,
    getMessages: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    message:state.message,
    user: state.auth.user,
    submitting: state.auth.submitting
});

export default connect(mapStateToProps, {getMessages, addToBlocklist, removeFromBlocklist, seenMessages})(MessageList);
