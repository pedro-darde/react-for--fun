import { DataTable } from "@/components/datatable/DataTable";
import CreateRecipeComponent from "@/components/recipes/CreateRecipe";
import { Badge } from "@/components/ui/badge";
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
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

  const columns: ColumnDef<Recipe>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enableResizing: false,
      size: 5
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
      accessorKey: "steps",
      header: "Steps",
      size: 400,
      enableResizing: true,
      cell({ row: { original } }) {
        return (
          <div className="flex flex-col gap-4 w-1/2">
            {original.steps.map((step, index) => {
              return (
                <Badge color="blue">
                  {index + 1} - {step} <br />
                </Badge>
              );
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      size: 400,
      cell({ row: { original } }) {
        return (
          <div className="flex flex-col gap-4 w-1/2">
            {original.tags.map((tag, index) => {
              return (
                <Badge color="blue">
                  {tag.description} <br />
                </Badge>
              );
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "ingredients",
      header: "Ingredients",
      cell({ row: { original: { ingredients } } }) {
        return (
          <div className="flex flex-col gap-4 ">
            {ingredients.map((ingredient) => {
              return <Badge color="blue" >
                <span className="text-wrap">{ingredient.substring(0, 10).concat("...")}</span></Badge>;
            })}
          </div>
        );
      },
    },
    {
      accessorKey: "active",
      header: "Active",
      cell({ row: { original } }) {
        return <Badge> {original.active ? "Yes" : "No"} </Badge>;
      },
      size: 1
    },
  ];

  const createNewRecipe = async (data: any) => {
    try {
      await RecipeService.createWithFormData(data);
      toast.success("Recipe created successfully.");
    } catch (e: any) {
      toast.error("Error while saving recipe, please contact admin.");
    } finally {
      setModalCreateRecipe(false);
      fetchRecipes();
    }
  };

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
        <DialogContent className="min-w-[1250px]">
          <DialogHeader>
            <DialogTitle>Create Recipe</DialogTitle>
            <DialogDescription>Create a new recipe.</DialogDescription>
            <CreateRecipeComponent
              onSubmit={createNewRecipe}
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
