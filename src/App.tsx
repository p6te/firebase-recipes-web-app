import { useEffect, useState } from "react";
import "./App.css";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./components/LoginForm";
import firebase from "./FirebaseConfig";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import FirebaseFirestoreService from "./FirebaseFirestoreService";
import { ensureError } from "./utils";
import { mapCategoryLabel } from "./utils/mapCategoryLabel";
import { WhereFilterOp } from "@firebase/firestore-types";

function App() {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [recipes, setRecipes] = useState<firebase.firestore.DocumentData[]>([]);
  FirebaseAuthService.subscribeToAuthChanges(setUser);

  const fetchRecipes = async () => {
    const queries = [];

    if (!user) {
      queries.push({
        field: "isPublished",
        condition: "==" as WhereFilterOp,
        value: true,
      });
    }

    let fetchedRecipes = [];

    try {
      const response = await FirebaseFirestoreService.readDocuments({
        collection: "recipes",
        queries: queries,
      });

      const newRecipes = response.docs.map((recipeDoc) => {
        const id = recipeDoc.id;
        const data = recipeDoc.data();
        const stringifyData = JSON.stringify(data.publishDate);
        const parsedData = stringifyData ? JSON.parse(stringifyData) : "";

        data.publishDate = new Date(parsedData.seconds * 1000);
        return { ...data, id };
      });
      fetchedRecipes = [...newRecipes];
    } catch (err) {
      const error = ensureError(err);
      console.error(error.message);
      throw error;
    }

    return fetchedRecipes;
  };

  const handleFetchRecipes = async () => {
    try {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    } catch (err) {
      const error = ensureError(err);
      console.error(error.message);
      throw error;
    }
  };

  async function handleAddRecipe(newRecipe: firebase.firestore.DocumentData) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      );

      handleFetchRecipes();
    } catch (err) {
      const error = ensureError(err);
      alert(error.message);
      console.log(error.message);
    }
  }

  const formatDate = (date: Date) => {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getFullYear();
    const dateString = `${month}-${day}-${year}`;

    return dateString;
  };

  useEffect(() => {
    handleFetchRecipes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="App">
      <div className="title-row">
        <h1>Firebase recepies app</h1>
        <LoginForm existingUser={user}></LoginForm>
      </div>
      <div className="main">
        <div className="center">
          <div className="recipe-list-box">
            {recipes && recipes.length > 0 ? (
              <div className="recipe-list">
                {recipes.map((recipe) => {
                  return (
                    <div className="recipe-card" key={recipe.id}>
                      {recipe.isPublished === false ? (
                        <div className="unpublished">UNPUBLISHED</div>
                      ) : null}
                      <div className="recipe-name">{recipe.name}</div>
                      <div className="recipe-field">
                        Category: {mapCategoryLabel(recipe.category)}
                      </div>
                      <div className="recipe-field">
                        Publish Date: {formatDate(recipe.publishDate)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
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
