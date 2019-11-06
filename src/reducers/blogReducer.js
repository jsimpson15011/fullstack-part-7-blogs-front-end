import blogService from '../services/blogs'
import {newMessage} from './messageReducer'

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(
      {
        type: 'GET_ALL_BLOGS',
        data: blogs
      }
    )
  }
}

export const createNewBlog = (blog) => {
  return async dispatch => {
    try{
      await blogService.create(blog)
      dispatch(newMessage({content: `blog ${blog.title} by ${blog.author} added`}))

      const blogs = await blogService.getAll()
      dispatch(
        {
          type: 'CREATE_BLOG',
          data: blogs
        }
      )
    } catch (e) {
      if (e.response.data.error) {
        dispatch(newMessage({content:e.response.data.error, type:'error'}))
      } else {
        dispatch(newMessage({content:'something went wrong please try again', type:'error'}))
      }
    }
  }
}

const blogReducer = (state=[], action) => {
  switch (action.type) {
  case 'GET_ALL_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return action.data
  default:
    return state
  }
}

export default blogReducer