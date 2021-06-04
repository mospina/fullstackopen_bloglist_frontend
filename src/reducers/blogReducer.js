/*
 * type Blogs = Blog[]
 * type User = {
 *   id: string
 *   username: string
 * }
 * type Blog = {
 *   user: User
 *   title: string
 *   url: string
 *   author: string
 *   likes: number
 * }
 */

import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return [...state, action.data];
    case "UPDATE_BLOG":
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data);
    case "INIT_BLOGS":
      return action.data;
    default:
      return state;
  }
};

export const updateBlog = (updatedBlog) => {
  return {
    type: "UPDATE_BLOG",
    data: updatedBlog,
  };
};

export const deleteBlog = (blogId) => {
  return {
    type: "DELETE_BLOG",
    data: blogId,
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: "NEW_BLOG",
      data: newBlog,
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export default blogReducer;