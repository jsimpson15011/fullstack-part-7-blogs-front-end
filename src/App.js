import React, { useEffect } from 'react'
import Message from './components/Message'
import BlogsList from './components/BlogList'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { newMessage } from './reducers/messageReducer'
import { getAllBlogs, createNewBlog } from './reducers/blogReducer'
import { initialUserCheck, logIn } from './reducers/userReducer'
import { connect } from 'react-redux'

const App = (props) => {
  useEffect(() => {
    props.initialUserCheck()
  }, [])
  useEffect(() => {
    props.getAllBlogs()
  }, [])

  const blogFormRef = React.createRef()

  if (props.user === null) {
    return (
      <div className="App">
        <Message message={props.message}/>
        <h2>Log into application</h2>
        <Togglable buttonLabel='login'>
          <LoginForm/>
        </Togglable>
      </div>
    )
  }

  return (
    <div className="App">
      <Message/>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef}/>
      </Togglable>
      <BlogsList/>
    </div>
  )
}

const mapStateToProps = state => (
  {
    message: state.message,
    blogs: state.blogs,
    user: state.user
  }
)

const mapDispatchToProps = {
  newMessage,
  getAllBlogs,
  createNewBlog,
  initialUserCheck,
  logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
