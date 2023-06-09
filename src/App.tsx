import { useState } from "react";
import "./App.css";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./components/LoginForm";
import firebase from "./FirebaseConfig";

function App() {
  const [user, setUser] = useState<firebase.User | null>(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  console.log(user);
  return (
    <div className="App">
      <div className="title-row">
        <h1>Firebase recepies app</h1>
        <LoginForm existingUser={user}></LoginForm>
      </div>
    </div>
  );
}

export default App;
