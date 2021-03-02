import React, { useState } from 'react'

const Blog = ({ blog, user, onUpdate, onDelete }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleAddLike = () => {
    const changes = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    onUpdate(blog.id, changes)
  }

  const handleDelete = () => {
    const result = window.confirm(`Delete ${blog.title}?`)
    if (!result) return

    onDelete(blog.id)
  }

  return (
    <div style={blogStyle}>
      {!visible ? (
        <div>
          {blog.title}
          <button onClick={() => setVisible(!visible)}>view</button>
        </div>
      ) : (
        <div>
          {blog.title}
          <button onClick={() => setVisible(!visible)}>hide</button>
          <br />
          {blog.url}
          <br />
          likes: {blog.likes} <button onClick={handleAddLike}>like</button>
          <br />
          {blog.author}
          <br />
          {blog.user.username === user.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
