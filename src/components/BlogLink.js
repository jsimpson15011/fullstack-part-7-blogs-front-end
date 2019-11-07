import React from 'react'
import { Link } from 'react-router-dom'

const BlogLink = ({ blog }) => {
  return (
    <div style={{
      border: 'solid 1px',
      marginBottom: '5px',
      cursor: 'pointer',
      padding: '5px'
    }}>
      <Link to={`/blogs/${blog.id}`}>
        <div className="name-and-author">
          {blog.title} {blog.author}
        </div>
      </Link>
    </div>
  )
}

export default BlogLink