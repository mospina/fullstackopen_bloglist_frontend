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

const update = async (id, changes) => {
  const response = await axios.put(`${baseUrl}/${id}`, changes);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.status;
};

export default { getAll, create, update, remove };
