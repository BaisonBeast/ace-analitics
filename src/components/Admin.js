import React, { useContext } from "react";

import AdminUser from "./AdminUser";
import { UserContext } from "../contexts/UserContext";

function Admin() {
  const { users, deleteUserVote } = useContext(UserContext);
  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div className="admin-user-list">
        {users.map((user) => (
          <AdminUser
            key={user.id}
            user={user}
            deleteUserVote={deleteUserVote}
          />
        ))}
      </div>
    </div>
  );
}

export default Admin;
