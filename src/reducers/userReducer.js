/*
 * type User = {
 *   token: string,
 *   username: string,
 *   name: string
 * }
 */

import loginService from "../services/login";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return {
    type: "LOGIN",
    data: user,
  };
};

export const login = (credential) => {
  return async (dispatch) => {
    const user = await loginService.login(credential);
    dispatch({
      type: "LOGIN",
      data: user,
    });
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
    window.localStorage.removeItem("loggedBlogappUser");
  };
};

export default userReducer;
