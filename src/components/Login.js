import React, { useState } from "react";

import usersData from "../users.json";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    const user = usersData.find((user) => user.username === username);

    if (!user || user.password !== password) {
      setErrorMessage("Invalid username or password.");
      return;
    }

    onLogin(user);
  };

  return (
    <div className="login">
      <div className="login_container">
        <h1>Login</h1>
        <div className="login_inputs">
          {errorMessage && <div className="login_error">{errorMessage}</div>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login_button">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
