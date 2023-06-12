import { useState } from "react";
import "./App.css";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./components/LoginForm";
import firebase from "./FirebaseConfig";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import FirebaseFirestoreService from "./FirebaseFirestoreService";
import { ensureError } from "./utils";

function App() {
  const [user, setUser] = useState<firebase.User | null>(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  async function handleAddRecipe(newRecipe: firebase.firestore.DocumentData) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      );
    } catch (err) {
      const error = ensureError(err);
      alert(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className="App">
      <div className="title-row">
        <h1>Firebase recepies app</h1>
        <LoginForm existingUser={user}></LoginForm>
      </div>
      <div className="main">
        {user ? (
          <AddEditRecipeForm
            handleAddRecipe={handleAddRecipe}
          ></AddEditRecipeForm>
        ) : null}
      </div>
    </div>
  );
}

export default App;
