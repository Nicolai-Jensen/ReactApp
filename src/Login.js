import React, { useState } from "react";

export function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  document.title = "Login Page";


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
        //props.token = token;
        props.onLoginSuccess(token);
      } else {
        console.error("Login failed: Incorrect username or password.");
        alert("Login failed: Incorrect username or password")
      }
    } else {
      throw new Error("Failed to login. Server returned " + response.status);
    }
        
      } catch (error) {
        console.error("Login failed:", error.message);
      }
    };
  

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <br/>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <br/>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <br/>
      <button type="submit">Submit</button>
    </form>
    </>
  );
}