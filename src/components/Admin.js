import React, { useContext } from "react";

import AdminUser from "./AdminUser";
import { UserContext } from "../contexts/UserContext";

function Admin() {
  const { users, deleteUserVote } = useContext(UserContext);
  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="admin-user-list">
        {users.length > 0 ? users.map((user) => (
          <AdminUser
            key={user.id}
            user={user}
            deleteUserVote={deleteUserVote}
          />
        )): <h1>No user Added</h1>}
      </div>
    </div>
  );
}

export default Admin;
