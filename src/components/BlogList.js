import Blog from './Blog'
import React from 'react'
import blogsService from '../services/blogs'
import { connect } from 'react-redux'

/*const handleLike = async (blog) => {
  try {
    await blogsService.addLike(blog)
    blogServiceHook.getAll()
  } catch (e) {
    createMessage(e.response.data.error, 'error')
  }
}

const handleDelete = async (blog) => {
  try {
    if (window.confirm(`are you sure you want to delete the blog ${blog.title}`)) {
      await blogsService.deleteBlog(blog)
      blogServiceHook.getAll()
    }
  } catch (e) {
    createMessage(e.response.data.error, 'error')
  }
}*/

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
          handleLike={() => console.log('a')}//todo add handle like function
          handleDelete={() => console.log('b')}// todo add delete function
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

export default connect(mapStateToProps)(BlogsList)