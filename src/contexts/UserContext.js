import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userSelections, setUserSelections] = useState([]);
  const [users, setUsers] = useState([]);

  const deleteUserVote = (username) => {
    setUsers(users.filter((user) => user.name !== username));
  };

  return (
    <UserContext.Provider
      value={{
        userSelections,
        setUserSelections,
        deleteUserVote,
        users,
        setUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
