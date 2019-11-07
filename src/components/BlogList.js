import Blog from './Blog'
import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { logOut } from '../reducers/userReducer'

const BlogsList = (props) => {
  return (
    <div className="blog-list">
      <h2>Blogs</h2>
      <p>{`${props.user.name} logged in`}
        <button onClick={() => props.logOut()}>Log out</button>
      </p>
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={props.user}
          handleLike={() => props.likeBlog(blog)}
          handleDelete={() => props.deleteBlog(blog)}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  const blogsSortedByLikes = state.blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  return ({
    blogs: blogsSortedByLikes,
    user: state.user
  })
}
const mapDispatchToProps = {
  deleteBlog,
  likeBlog,
  logOut
}
export default connect(mapStateToProps, mapDispatchToProps)(BlogsList)