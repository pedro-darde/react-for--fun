import { Tag } from "./Tag";

export type RecipeImages = {
  id?: string;
  path: string;
  name: string;
  full_name: string;
  description?: string;
  active: boolean;
  created_at? : string;
  updated_at? : string;
};

export type Recipe = {
  id?: string;
  name: string;
  description: string;
  ingredients: string[];
  images: RecipeImages[];
  steps: string[];
  difficulty: "easy" | "medium" | "hard" | "professional";
  tags: Tag[];
};
