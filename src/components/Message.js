import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyledMessage = styled.div`
  border: ${props => props.type === 'error'
    ? props.theme.negative
    : props.theme.positive} solid 5px;
  color: ${props => props.type === 'error'
    ? props.theme.negative
    : props.theme.positive};
  font-size: 2em;
  text-align: center;
  margin: 15px;
  padding: 5px;
  box-sizing: border-box;
  background: ${props => props.theme.altBackground};
`

const Message = ({ message }) => {
  if(!message.content){
    return(
      <></>
    )
  } else{
    return(
      <StyledMessage type={message.type}>
        {message.content}
      </StyledMessage>
    )
  }
}

const mapStatesToProp = state => (
  {
    message: state.message
  }
)

export default connect(mapStatesToProp)(Message)