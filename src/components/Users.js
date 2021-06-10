import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";

const Users = () => {
  const users = useSelector(({ users }) => users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.blogs.length}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
