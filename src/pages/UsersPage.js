import React from 'react'
import { getAllUsers } from '../reducers/allUsersReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersPage = (props) => {
  const mappedUsers = props.allUsers.map(user => {
    return(
      <tr key={user.id}>
        <td><Link to={`/users/${user.id}`} >{user.name}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  })

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
        <tr>
          <td/>
          <td>blogs created</td>
        </tr>
        {mappedUsers}
        </tbody>
      </table>
    </>

  )
}

const mapStateToProps = state => {
  const usersSortedByBlogs = state.allUsers.sort((a, b) => {
    return b.blogs.length - a.blogs.length
  })

  return ({ allUsers: usersSortedByBlogs })
}

const mapDispatchToProps = {
  getAllUsers
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)