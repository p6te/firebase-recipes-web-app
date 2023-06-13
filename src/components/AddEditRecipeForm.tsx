import { useState, KeyboardEvent, MouseEvent, FormEvent } from "react";
import { NewRecipe, RecipeCategory } from "../types/recipes";
import firebase from "../FirebaseConfig";

type Props = {
  handleAddRecipe: (
    newRecipe: firebase.firestore.DocumentData
  ) => Promise<void>;
};

const AddEditRecipeForm: React.FC<Props> = ({ handleAddRecipe }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [directions, setDirections] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientName, setIngredientName] = useState("");

  const handleRecipeFormSubmit = (e: FormEvent<Element>) => {
    e.preventDefault();
    if (ingredients.length === 0) {
      alert("Ingredients cannot be empty, plase add at least 1 ingredient");
      return;
    }

    const isPublished = new Date(publishDate) <= new Date() ? true : false;

    const newRecipe: NewRecipe = {
      name,
      category,
      directions,
      publishDate: new Date(publishDate),
      isPublished,
      ingredients,
    };
    handleAddRecipe(newRecipe);
  };

  const addIngredient = () => {
    if (!ingredientName) {
      alert("Missing ingredient field.  Please double check");
      return;
    }

    setIngredients([...ingredients, ingredientName]);
    setIngredientName("");
  };

  const handleKeyboardAddIngredient = (e: KeyboardEvent) => {
    if (e.key && e.key !== "Enter") {
      return;
    }
    e.preventDefault();
    addIngredient();
  };

  const handleMouseAddIngredient = (e: MouseEvent) => {
    e.preventDefault();
    addIngredient();
  };

  return (
    <form
      className="add-edit-recipe-form-container"
      onSubmit={handleRecipeFormSubmit}
    >
      <h2>Add a New Recipe</h2>
      <div className="top-form-section">
        <div className="fields">
          <label className="recipe-label input-label">
            Recipe Name:
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="recipe-label input-label">
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select"
              required
            >
              <option value=""></option>
              <option value="breadsAndSandwiches">
                {RecipeCategory.breadsAndSandwiches}
              </option>
              <option value="breakfast">{RecipeCategory.breakfast}</option>
              <option value="desserts">{RecipeCategory.desserts}</option>
              <option value="fishAndSeefood">
                {RecipeCategory.fishAndSeefood}
              </option>
              <option value="vegetables">{RecipeCategory.vegetables}</option>
            </select>
          </label>
          <label className="recipe-label input-label">
            Directions:
            <textarea
              required
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
              className="input-text directions"
            ></textarea>
          </label>
          <label className="recipe-label input-label">
            Publish DAte:
            <input
              type="date"
              required
              value={publishDate}
              onChange={(e) => {
                setPublishDate(e.target.value);
              }}
              className="input-text"
            />
          </label>
        </div>
      </div>
      <div className="ingredients-list">
        <h3 className="text-center">Ingredients</h3>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th className="table-header">Ingredient</th>
              <th className="table-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ingredients && ingredients.length > 0
              ? ingredients.map((ingredient) => {
                  return (
                    <tr key={ingredient}>
                      <td className="table-data text-center">{ingredient}</td>
                      <td className="ingredient-delete-box">
                        <button
                          type="button"
                          className="secondary-button ingredient-delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {ingredients && ingredients.length === 0 ? (
          <h3 className="text-center no-ingredients">
            No ingredients added yet
          </h3>
        ) : null}
        <div className="ingredient-form">
          <label className="ingredient-label">
            Ingredient:
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              onKeyDown={handleKeyboardAddIngredient}
              className="input-text"
              placeholder="ex. 1 cup of sugar"
            />
          </label>
          <button
            type="button"
            className="primary-button add-ingredient-button"
            onClick={handleMouseAddIngredient}
          >
            Add
          </button>
        </div>
      </div>
      <div className="action-buttons">
        <button type="submit" className="primary-button action-button">
          Create recipe
        </button>
      </div>
    </form>
  );
};

export default AddEditRecipeForm;
