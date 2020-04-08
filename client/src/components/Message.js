import React from 'react'

const messageStyle = (props) => {
    let startPoint = 'alert ';
    if(props.message.msgError)
        startPoint = startPoint + 'alert-danger';
    else
         startPoint = startPoint + 'alert-primary';
    return startPoint + ' text-center';
}

const Message = (props) => {
    return(
        <div className={messageStyle(props)} role='alert'>
        {props.message.msgBody}
        </div>
    )

}

export default Message;