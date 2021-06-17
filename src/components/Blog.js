import React from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";

const Blog = ({ blogs, user, onUpdate, onDelete }) => {
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);
  if (!blog) {
    return null;
  }

  const handleAddLike = () => {
    const changes = { ...blog, user: blog.user.id, likes: blog.likes + 1 };
    onUpdate(blog.id, changes);
  };

  const handleDelete = () => {
    const result = window.confirm(`Delete ${blog.title}?`);
    if (!result) return;

    onDelete(blog.id);
  };

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>
        {blog.url}
        <br />
        {blog.likes} likes <button onClick={handleAddLike}>like</button>
        <br />
        {blog.author}
        <br />
        {blog.user.username === user.username && (
          <button onClick={handleDelete}>remove</button>
        )}
      </p>
      <div>
        <h3>Comments</h3>
        <CommentForm blog={blog} />
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
