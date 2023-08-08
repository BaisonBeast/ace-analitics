import React, { createContext, useEffect, useMemo, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userSelections, setUserSelections] = useState([]);
  const [users, setUsers] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const deleteUserVote = (username) => {
    setUsers(users.filter((user) => user.name !== username));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/dctacademy/react-task/main/db.json"
        );
        if (!response.ok) {
          const errorData = await response.json();
          const error = new Error(errorData.message || "Unknown Error");
          error.code = response.status;
          setError(error);
        } else {
          const res = await response.json();
          setDishes(res);
        }
      } catch (error) {
        setLoading(false);
        setError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    (() => fetchData())();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userSelections,
        setUserSelections,
        deleteUserVote,
        users,
        setUsers,
        dishes,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
