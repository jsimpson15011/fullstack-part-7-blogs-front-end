import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'

const NewBlogForm = (props) => {
  const blogTitle = useField('text')
  const blogAuthor = useField('text')
  const blogUrl = useField('text')

  const blogTitleProps = Object.assign({}, blogTitle)
  delete blogTitleProps.reset

  const blogAuthorProps = Object.assign({}, blogAuthor)
  delete blogAuthorProps.reset

  const blogUrlProps = Object.assign({}, blogUrl)
  delete blogUrlProps.reset

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    props.blogFormRef.current.toggleVisibility()
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

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input {...blogTitleProps}/>
        </div>
        <div>
          author:
          <input {...blogAuthorProps}/>
        </div>
        <div>
          url:
          <input {...blogUrlProps}/>
        </div>
        <button type="submit">create</button>
      </form>
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
  createNewBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBlogForm)