import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import BlogsList from './components/BlogList'
import loginService from './services/login'
import blogsService from './services/blogs'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { useField } from './hooks'
import { newMessage } from './reducers/messageReducer'
import { getAllBlogs, createNewBlog } from './reducers/blogReducer'
import { connect } from 'react-redux'

const App = (props) => {
  const [user, setUser] = useState(null)
  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])
  useEffect(() => {
    props.getAllBlogs()
  }, [])
  const createMessage = (content, type) => {
    props.newMessage({
      content: content,
      type: type
    })
  }

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const usernameValue = username.value
      const passwordValue = password.value

      const credentials = { 'username': usernameValue, 'password': passwordValue }

      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      setUser(user)
      blogsService.setToken(user.token)
    } catch (e) {
      createMessage(e.response.data.error, 'error')
    }
    username.reset()
    password.reset()
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    blogsService.setToken(null)
    setUser(null)
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: blogTitle.value,
      author: blogAuthor.value,
      url: blogUrl.value,
      user: user.id
    }

    props.createNewBlog(newBlog)


    blogTitle.reset()
    blogAuthor.reset()
    blogUrl.reset()
  }

  if (user === null) {
    return (
      <div className="App">
        <Message message={''}/>
        <h2>Log into application</h2>
        <Togglable buttonLabel='login'>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div className="App">
      <Message message={props.message}/>
      <h2>blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm
          handleBlogCreation={handleBlogCreation}
          blogTitle={blogTitle}
          blogAuthor={blogAuthor}
          blogUrl={blogUrl}
          handleLogout={handleLogout}
        />
      </Togglable>
      <BlogsList/>
    </div>
  )
}

const mapStateToProps = state => (
  {
    message: state.message,
    blogs: state.blogs
  }
)

const mapDispatchToProps = {
  newMessage,
  getAllBlogs,
  createNewBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
