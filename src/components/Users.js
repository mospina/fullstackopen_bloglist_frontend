import React from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

const Users = ({ users }) => {
  return (
    <TableContainer component={Paper}>
      <h3>Users</h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const User = ({ user }) => {
  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  );
};
export default Users;
