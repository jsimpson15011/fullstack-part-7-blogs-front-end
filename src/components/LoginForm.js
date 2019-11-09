import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { PositiveButton } from './Button'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    const usernameValue = username.value
    const passwordValue = password.value

    props.logIn(usernameValue, passwordValue)
    username.reset()
    password.reset()
  }

  const usernameProps = Object.assign({}, username)
  delete usernameProps.reset

  const passwordProps = Object.assign({}, password)
  delete passwordProps.reset

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...usernameProps}/>
      </div>
      <div>
        password
        <input {...passwordProps}/>
      </div>
      <PositiveButton type="submit">login</PositiveButton>
    </form>
  )
}

const mapDispatchToProps = {
  logIn
}

export default connect(null, mapDispatchToProps)(LoginForm)