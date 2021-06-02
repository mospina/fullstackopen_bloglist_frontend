/*
 * type Message = {
 *   message: string,
 *   level: string
 * }
 *
 * type Notification = message | null
 */

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.message;
    case "DELETE_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

// ACTIONS
export const setNotification = (message, level) => {
  return {
    type: "SET_NOTIFICATION",
    message: { message, level },
  };
};

export const deleteNotification = () => {
  return {
    type: "DELETE_NOTIFICATION",
  };
};

export default notificationReducer;
