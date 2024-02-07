import { Tag } from "./Tag";

export type RecipePhoto = {
  id?: string;
  path: string;
  name: string;
  date: Date;
  fullName: string;
  size: number;
  recipeId?: string;
};

export type Recipe = {
  id?: string;
  name: string;
  description: string;
  ingredients: string[];
  photos: RecipePhoto[];
  steps: string[];
  tags: Tag[];
};
