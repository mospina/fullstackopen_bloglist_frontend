import axios from "axios";
const baseUrl = "/api/blogs";

const getAuthToken = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user.token;
  }

  throw Error("Unauthenticated User");
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

export default { getAll, create };
