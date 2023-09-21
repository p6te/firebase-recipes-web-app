export type Recipe = {
  name: string;
  category: string;
  directions: string;
  publishDate: Date;
  isPublished: boolean;
  ingredients: string[];
  id: string;
};

export type NewRecipe = Omit<Recipe, "id">;

export enum RecipeCategory {
  breadsAndSandwiches = "Breads & Sandwiches",
  breakfast = "Breakfast",
  desserts = "Desserts",
  fishAndSeefood = "Fish & Seafood",
  vegetables = "Vegetables",
}
