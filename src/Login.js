import React, { useState } from "react";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("http://react.tsanas.com/authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to login");
        }
  
        // Handle success, maybe redirect user or update state
        console.log("Login successful");
      } catch (error) {
        // Handle error, maybe show an error message to the user
        console.error("Login failed:", error.message);
      }
    };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}