import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormSchema } from "./utils/formSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import BasicInfoStep from "./create/BasicInfoStep";
import DetailedInfoStep from "./create/DetaileInfoStep";
import { JsonList } from "@/types/JsonList";
import { useRef } from "react";
import ImagesStep from "./create/ImageStep";

type CreateRecipeComponentProps = {
  onSubmit: (data: {
    name: string;
    description: string;
    ingredients: string[];
    steps: string[];
    difficulty: "easy" | "medium" | "hard" | "professional";
    time: number;
    active: boolean;
    tags: string[];
    images: File[];
  }) => void;
  tags: JsonList[];
  onAddNewTag: (value: string) => void;
};

export default function CreateRecipeComponent({
  onSubmit,
  tags,
  onAddNewTag,
}: CreateRecipeComponentProps) {
  const form = useForm<
    z.infer<typeof FormSchema> & { ingedientsStr: string; stepsString: string }
  >({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      ingredients: [],
      steps: [],
      difficulty: "easy",
      time: "0",
      active: true,
      tags: [],
      images: [],
    },
  });

  const buttonAddIngredient = useRef<HTMLButtonElement>(null);
  const buttonAddStep = useRef<HTMLButtonElement>(null);

  const handleAddIngredient = (field: { value: string }) => {
    if (!field.value) return;
    const currentIngredients = form.getValues().ingredients;
    const values = field.value.split(",").map((value) => value.trim());
    const nonExistentIngredients = values.filter(
      (item) => !currentIngredients.includes(item)
    );

    if (!nonExistentIngredients.length) {
      return;
    }

    form.setValue("ingredients", [
      ...form.getValues().ingredients,
      ...nonExistentIngredients,
    ]);
    form.setValue("ingedientsStr", "");
  };

  const handleAddStep = (field: { value: string }) => {
    if (!field.value) return;
    const currentSteps = form.getValues().steps;
    const values = field.value.split(",").map((value) => value.trim());
    const nonExistentSteps = values.filter(
      (item) => !currentSteps.includes(item)
    );

    if (!nonExistentSteps.length) {
      return;
    }

    form.setValue("steps", [...form.getValues().steps, ...nonExistentSteps]);
    form.setValue("stepsString", "");
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            onSubmit({
              active: data.active,
              description: data.description,
              difficulty: data.difficulty,
              images: data.images,
              ingredients: data.ingredients,
              name: data.name,
              steps: data.steps,
              tags: data.tags,
              time: parseInt(data.time),
            });
          })}
          className="space-y-6"
        >
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Basic Info</TabsTrigger>
              <TabsTrigger value="password">Details Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <BasicInfoStep form={form} />
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed</CardTitle>
                  <CardDescription>
                    Some detailed information about the recipe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <DetailedInfoStep
                    buttonAddIngredient={buttonAddIngredient}
                    buttonAddStep={buttonAddStep}
                    form={form}
                    handleAddIngredient={(field) => {
                      handleAddIngredient(field);
                    }}
                    handleAddStep={(field) => {
                      handleAddStep(field);
                    }}
                    tags={tags}
                    onAddNewTag={onAddNewTag}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="images">
              <Card>
                <CardHeader>
                  <CardTitle>Images</CardTitle>
                  <CardDescription>Images of the recipe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ImagesStep form={form} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
