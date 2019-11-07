import React, { useEffect } from 'react'
import Header from './components/Header'
import UsersPage from './pages/UsersPage'
import BlogsList from './components/BlogList'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { newMessage } from './reducers/messageReducer'
import { getAllBlogs, createNewBlog } from './reducers/blogReducer'
import { initialUserCheck, logIn } from './reducers/userReducer'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import UserPage from './pages/UserPage'
import { getAllUsers } from './reducers/allUsersReducer'

const App = (props) => {
  useEffect(() => {
    props.initialUserCheck()
  }, [])
  useEffect(() => {
    props.getAllBlogs()
  }, [])
  useEffect(() => {
    props.getAllUsers()
  }, [])

  const blogFormRef = React.createRef()

  return (
    <Router>
      <div className="App">
        <Header/>
        <Route exact path="/login">
          <h2>Log into application</h2>
          <Togglable buttonLabel='login'>
            <LoginForm/>
          </Togglable>
        </Route>
        <Route exact path="/users">
          <UsersPage/>
        </Route>
        <Route exact path="/users/:userId">
          <UserPage/>
        </Route>
        <Route exact path="/">
          <h2>blogs</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm blogFormRef={blogFormRef}/>
          </Togglable>
          <BlogsList/>
        </Route>
      </div>
    </Router>
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
  logIn,
  getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
