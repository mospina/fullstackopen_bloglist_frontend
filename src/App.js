import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { login, logout, setUser } from "./reducers/userReducer";
import {
  initializeBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import {
  setNotification,
  deleteNotification,
} from "./reducers/notificationReducer";
import "./App.css";

const App = () => {
  const user = useSelector(({ user }) => user);
  const users = useSelector(({ users }) => users);
  const blogs = useSelector(({ blogs }) => blogs);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const handleLogin = (credential) => {
    try {
      dispatch(login(credential));
    } catch (exception) {
      flashMessage("Wrong Credentials", "error");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCreateBlog = (blogInput) => {
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
      const updatedBlog = await dispatch(updateBlog(id, changes));
      flashMessage(`${updatedBlog.title} was updated`, "info");
    } catch (error) {
      flashMessage(error.message, "error");
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await dispatch(deleteBlog(id));
      flashMessage("Blog deleted", "info");
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
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <Login handleLogin={handleLogin} />
      </div>
    );
  } else {
    return (
      <Router>
        <div>
          <Link to="/users">users</Link>
        </div>

        <Switch>
          <Route path="/users/:id">
            <User users={users} />
          </Route>
          <Route path="/users">
            <Users users={users} />
          </Route>
          <Route path="/blogs/:id">
            <Blog
              blogs={blogs}
              user={user}
              onUpdate={handleUpdateBlog}
              onDelete={handleDeleteBlog}
            />
          </Route>
        </Switch>

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
                <div style={blogStyle} key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </div>
              ))}
          </div>
        </div>
      </Router>
    );
  }
};

export default App;
