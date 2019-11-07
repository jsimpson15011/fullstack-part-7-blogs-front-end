import React from 'react'
import Message from './Message'
import { connect } from 'react-redux'
import { logOut } from '../reducers/userReducer'

const Header = (props) => {
  if (props.user === null){
    return null
  }
  return(
    <div className="header">
      <h1>blogs</h1>
      <Message/>
      <p>
        {`${props.user.name} logged in`}
        <button onClick={() => props.logOut()}>Log out</button>
      </p>
    </div>
  )
}

const mapStateToProps = state => {
  return({
    user: state.user
  })
}

const mapDispatchToProps = {
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)