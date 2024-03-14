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
  
        const responseData = await response.json();

    if (response.ok) {
      if (responseData.success) {
        // Login successful, retrieve the token
        const token = responseData.data;
        console.log("Login successful. Token:", token);
        // Handle token (e.g., store it in local storage)
      } else {
        // Login failed due to incorrect credentials
        console.error("Login failed: Incorrect username or password.");
      }
    } else {
      // Server returned an error status code
      throw new Error("Failed to login. Server returned " + response.status);
    }
        
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