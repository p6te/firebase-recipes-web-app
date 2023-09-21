import React, { FormEvent, useState } from "react";
import FirebaseAuthService from "../FirebaseAuthService";
import firebase from "../FirebaseConfig";
import { ensureError } from "../utils";

type Props = {
  existingUser: firebase.User | null;
};

const LoginForm: React.FC<Props> = ({ existingUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await FirebaseAuthService.loginUser(username, password);
      setUsername("");
      setPassword("");
    } catch (err) {
      const error = ensureError(err);
      alert(error.message);
    }
  };

  const handleSendPasswordResetEmail = async () => {
    if (!username) {
      alert("Missing username!");
      return;
    }

    try {
      await FirebaseAuthService.sendPasswordResetEmail(username);
    } catch (err) {
      const error = ensureError(err);
      alert(error.message);
    }
  };

  const handleLogout = () => {
    FirebaseAuthService.logoutUser();
  };

  const handleLoginWithGoogle = async () => {
    try {
      await FirebaseAuthService.loginWithGoogle();
    } catch (err) {
      const error = ensureError(err);
      alert(error.message);
    }
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
            Username (email):
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button className="primary-button">Login</button>
            <button
              type="button"
              onClick={handleSendPasswordResetEmail}
              className="primary-button"
            >
              Reset password
            </button>
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="primary-button"
            >
              Login with Google
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
