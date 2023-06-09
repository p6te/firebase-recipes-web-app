import React, { FormEvent, useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";
import firebase from "../FirebaseConfig";

type Props = {
  existingUser: firebase.User | null;
};

const LoginForm: React.FC<Props> = ({ existingUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
    try {
      await FirebaseAuthService.registerUser(username, password);
      console.log("rejestracja");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
  };

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Welcome, {existingUser?.email} </h3>
          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email)
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button className="primary-button">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
