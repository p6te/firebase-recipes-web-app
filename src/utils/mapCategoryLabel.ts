import { RecipeCategory } from "../types/recipes";

export const mapCategoryLabel = (category: keyof typeof RecipeCategory) => {
  const label = RecipeCategory[category];
  return label;
};
