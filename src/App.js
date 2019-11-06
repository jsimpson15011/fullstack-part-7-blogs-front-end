import React, { useEffect } from 'react'
import Message from './components/Message'
import BlogsList from './components/BlogList'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { useField } from './hooks'
import { newMessage } from './reducers/messageReducer'
import { getAllBlogs, createNewBlog } from './reducers/blogReducer'
import { initialUserCheck, logIn } from './reducers/userReducer'
import { connect } from 'react-redux'

const App = (props) => {
  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.initialUserCheck()
  }, [])
  useEffect(() => {
    props.getAllBlogs()
  }, [])

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    const usernameValue = username.value
    const passwordValue = password.value

    props.logIn(usernameValue, passwordValue)
    username.reset()
    password.reset()
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: blogTitle.value,
      author: blogAuthor.value,
      url: blogUrl.value,
      user: props.user.id
    }

    props.createNewBlog(newBlog)


    blogTitle.reset()
    blogAuthor.reset()
    blogUrl.reset()
  }

  if (props.user === null) {
    return (
      <div className="App">
        <Message message={props.message}/>
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
        />
      </Togglable>
      <BlogsList
        user={props.user}
      />
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
