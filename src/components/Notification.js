import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";

const Notification = () => {
  const message = useSelector(({ notification }) => notification);
  if (message === null) {
    return null;
  }

  return <Alert severity={message.level}>{message.message}</Alert>;
};

export default Notification;
