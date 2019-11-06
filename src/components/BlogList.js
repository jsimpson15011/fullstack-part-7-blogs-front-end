import Blog from './Blog'
import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogsList = (props) => {
  //todo add log out button
  return (
    <div className="blog-list">
      <h2>Blogs</h2>
      {/*      <p>{`${user.name} logged in`}
        <button onClick={handleLogout}>Log out</button>
      </p>*/}
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={blog.user}
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
    blogs: blogsSortedByLikes
  })
}
const mapDispatchToProps = {
  deleteBlog,
  likeBlog
}
export default connect(mapStateToProps,mapDispatchToProps)(BlogsList)