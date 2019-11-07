import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { useHistory, Link } from 'react-router-dom'

const Navigation = (props) => {
  const history = useHistory()
  const handleClick = () => {
    props.logOut()
    history.push('/login')
  }

  return (
    <div>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {props.user
        ? <>
          {`${props.user.name} logged in`}
          <button onClick={() => {
            handleClick()
          }}>
            Log out
          </button>
        </>
        : <Link to="/login">Login</Link>}
    </div>
  )
}

const mapStateToProps = state => {
  return ({
    user: state.user
  })
}

const mapDispatchToProps = {
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)