import axios from "axios";
const baseUrl = (id) => `/api/blogs/${id}/comments`;

const create = async (id, comment) => {
  const response = await axios.post(baseUrl(id), comment);
  return response.data;
};

export default { create };
