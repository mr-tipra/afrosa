import React,{useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {getMessages} from "../../actions/message";
import Spinner from "../layout/Spinner";
import MessageItem from "./MessageItem";

const MessageList = ({message, getMessages}) => {

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <section className="container">
            <h1 className="large text-primary">Messages</h1>
            {message.loading?<Spinner />:
            <Fragment>
                {message.messages.length === 0?<p className="lead">No Messages</p>:
                <div className="messages">
                    {message.messages.map(msg => <MessageItem key={msg._id} msg={msg} />)}
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
    message:state.message
});

export default connect(mapStateToProps, {getMessages})(MessageList);
