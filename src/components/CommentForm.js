import React from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogReducer";

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(addComment(blog.id, { content }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="content" name="content" type="text" />
      <button type="submit">add comment</button>
    </form>
  );
};

export default CommentForm;
