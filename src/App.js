import React, { useContext, useState } from "react";

import Admin from "./components/Admin";
import Box from "@mui/material/Box";
import DishList from "./components/DishList";
import Login from "./components/Login";
import Results from "./components/Results";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [value, setValue] = React.useState(0);
  const { users, setUsers, userSelections, setUserSelections } =
    useContext(UserContext);
  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    const existingUser = users.find(
      (singleUser) => singleUser.userName === loggedInUser
    );
    if (!existingUser) {
      const newObj = {
        name: loggedInUser.username,
        userSelections,
      };
      setUsers((prev) => [...users, newObj]);
    }
    setUserSelections([]);
    setValue(0);
    setLoggedInUser(null);
  };

  return (
    <div>
      {loggedInUser ? (
        <div>
          <nav className="navbar">
            <h1>Welcome, {loggedInUser.username}!</h1>
            <button onClick={handleLogout}>Logout</button>
          </nav>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              textColor="primary"
              indicatorColor="primary"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <Tab label="Dishlist" />
              <Tab label="Result" />
              {loggedInUser.isAdmin && <Tab label="Admin" />}
            </Tabs>
          </Box>

          {value === 0 && <DishList />}
          {value === 1 && <Results />}
          {loggedInUser.isAdmin && value === 2 && <Admin />}
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
