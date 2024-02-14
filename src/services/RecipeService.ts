import { Recipe } from "@/types/Recipe";
import { BaseService } from "./BaseService";

export const RecipeService = new BaseService<Recipe>("recipes");