import React from 'react'
const Message = ({ message }) => {
  if(!message.content){
    return(
      <></>
    )
  } else{
    return(
      <div
        style={{
          border: message.type === 'error'? 'solid red 5px': 'solid green 5px',
          fontSize: '2em',
        }}
      >
        {message.content}
      </div>
    )
  }
}

export default Message