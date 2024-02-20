import { DataTable } from "@/components/datatable/DataTable";
import CreateRecipeComponent from "@/components/recipes/CreateRecipe";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PaginatedResponse } from "@/services/BaseService";
import { JsonService } from "@/services/JsonService";
import { RecipeService } from "@/services/RecipeService";
import { JsonList } from "@/types/JsonList";
import { Recipe } from "@/types/Recipe";
import { Tag } from "@/types/Tag";
import { useEffect, useState } from "react";

export default function ListRecipe() {
  const [tags, setTags] = useState<JsonList[]>([]);

  const searchTags = async () => {
    const jsonTagService = new JsonService<Tag>("tags");
    const data = await jsonTagService.getJson();
    setTags(data);
  };

  useEffect(() => {
    searchTags();
  }, []);

  const [recipes, setRecipes] = useState<PaginatedResponse<Recipe>>({
    page: 0,
    per_page: 10,
    rows: [],
    total: 0,
  });

  const [modalCreateRecipe, setModalCreateRecipe] = useState(false);

  const fetchRecipes = async (page = 0, perPage = 10) => {
    const response = await RecipeService.getAll(page, perPage);
    setRecipes(response);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "active",
      header: "Active",
    },
  ];

  return (
    <div className="container  m-5  py-10">
      <div className="flex justify-between">
        <h1 className="mb-5 text-3xl font-bold">Recipes</h1>
        <Button variant="default" onClick={() => setModalCreateRecipe(true)}>
          Create Recipe +{" "}
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={recipes}
        handleNextPage={(page, perPage) => {
          console.log(page, perPage);
          fetchRecipes(page, perPage);
        }}
      />
      <Dialog
        open={modalCreateRecipe}
        onOpenChange={(value) => setModalCreateRecipe(value)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Recipe</DialogTitle>
            <DialogDescription>Create a new recipe.</DialogDescription>
            <CreateRecipeComponent
              onSubmit={(data) => {}}
              tags={tags}
              onAddNewTag={(tag) => {
                console.log(tag);
                setTags([...tags, { value: tag, label: tag }]);
              }}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
