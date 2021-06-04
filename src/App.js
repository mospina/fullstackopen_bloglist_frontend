import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import {
  initializeBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import {
  setNotification,
  deleteNotification,
} from "./reducers/notificationReducer";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  const blogs = useSelector(({ blogs }) => blogs);

  const dispatch = useDispatch();

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
      dispatch(createBlog(blogInput));
      flashMessage(
        `a new blog ${blogInput.title} by ${blogInput.author} added`,
        "info"
      );
    } catch (error) {
      flashMessage(error.message, "error");
    }
  };

  const handleUpdateBlog = async (id, changes) => {
    try {
      const updatedBlog = await blogService.update(id, changes);
      flashMessage(`${updatedBlog.title} was updated`, "info");
      dispatch(updateBlog(updateBlog));
    } catch (error) {
      flashMessage(error.message, "error");
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      flashMessage("Blog deleted", "info");
      dispatch(deleteBlog(id));
    } catch (error) {
      flashMessage(error.message, "error");
    }
  };

  const flashMessage = (message, level) => {
    dispatch(setNotification(message, level));
    setTimeout(() => {
      dispatch(deleteNotification());
    }, 5000);
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

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
        <Notification />
        <Login handleLogin={handleLogin} />
      </div>
    );
  } else {
    return (
      <div>
        <Notification />
        <h2>blogs</h2>
        <p>
          {user.name} <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm handleSubmit={handleCreateBlog} />
        </Togglable>
        <div id="blog-list">
          {blogs
            .sort((a, b) => {
              if (a.likes > b.likes) return -1;
              else if (a.likes < b.likes) return 1;

              return 0;
            })
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                onUpdate={handleUpdateBlog}
                onDelete={handleDeleteBlog}
              />
            ))}
        </div>
      </div>
    );
  }
};

export default App;
