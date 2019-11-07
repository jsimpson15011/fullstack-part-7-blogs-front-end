import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  if (props.user === undefined) {
    return null
  }
  const mappedBlogs = props.user.blogs.map(blog => {
    return (
      <li key={blog.id}>
        {blog.title}
      </li>
    )
  })
  return (
    <div className="user">
      <h2>{props.user.name}</h2>
      <h3>Added Blogs:</h3>
      <ul>
        {mappedBlogs}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  const users = state.allUsers
  const user = users.filter(user => user.id === props.id)

  return { user: user[0] }
}

export default connect(mapStateToProps)(User)