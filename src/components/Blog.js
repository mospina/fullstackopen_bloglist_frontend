import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

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
          likes: {blog.likes} <button>like</button>
          <br />
          {blog.author}
        </div>
      )}
    </div>
  );
};

export default Blog;
