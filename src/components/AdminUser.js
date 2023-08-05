import React, { useContext } from "react";

import { UserContext } from "../contexts/UserContext";

function AdminUser({ user }) {
  const { deleteUserVote } = useContext(UserContext);
  const sortedUserSelections = user.userSelections
    .slice()
    .sort((a, b) => b.point - a.point);

  return (
    <div className="admin-user">
      <h2>User: {user.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Dish Name</th>
            <th>Rank</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedUserSelections.map((item) => (
            <tr key={item.id}>
              <td>{item.dishName}</td>
              <td>{item.rank}</td>
              <td>{item.point}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => deleteUserVote(user.name)}>Delete Vote</button>
    </div>
  );
}

export default AdminUser;
