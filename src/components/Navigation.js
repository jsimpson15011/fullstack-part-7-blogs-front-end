import React from 'react'
import { connect } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'
import { NegativeButton } from './Button'

const StyledNav = styled.div`
  background: ${props => props.theme.altBackground};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1em 0;
  font-size: 1.5em;
  a{
    background: ${props => props.theme.background};
    padding: .5em;
    text-decoration: none;
    :hover{
      color: ${props => props.theme.positive };
    }
  }
`

const Navigation = (props) => {
  const history = useHistory()
  const handleClick = () => {
    props.logOut()
    history.push('/login')
  }

  return (
    <StyledNav>
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
      {props.user
        ? <>
          {`${props.user.name} logged in`}
          <NegativeButton onClick={() => {
            handleClick()
          }}>
            Log out
          </NegativeButton>
        </>
        : <Link to="/login">Login</Link>}
    </StyledNav>
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