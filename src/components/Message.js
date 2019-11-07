import React from 'react'
import { connect } from 'react-redux'
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

const mapStatesToProp = state => (
  {
    message: state.message
  }
)

export default connect(mapStatesToProp)(Message)