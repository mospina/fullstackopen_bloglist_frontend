import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  const handleLogin = async (credential) => {
    try {
      const user = await loginService.login(credential);
      setUser(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } catch (exception) {
      flashMessage("Wrong Credentials", "error");
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleCreateBlog = async (blogInput) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(blogInput);
      flashMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        "info"
      );
      setBlogs([...blogs, newBlog]);
    } catch (error) {
      flashMessage(error.message, "error");
    }
  };

  const handleUpdateBlog = async (id, changes) => {
    try {
      const updatedBlog = await blogService.update(id, changes);
      flashMessage(`${updatedBlog.title} was updated`, "info");
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
    } catch (error) {
      flashMessage(error.message, "error");
    }
  };

  const flashMessage = (message, level) => {
    setMessage({ message, level });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <Login handleLogin={handleLogin} />
      </div>
    );
  } else {
    return (
      <div>
        <Notification message={message} />
        <h2>blogs</h2>
        <p>
          {user.name} <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm handleSubmit={handleCreateBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} onUpdate={handleUpdateBlog} />
        ))}
      </div>
    );
  }
};

export default App;
