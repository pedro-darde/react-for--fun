import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { useRef } from "react";
import ChipComponent from "./ChipComponent";
import { FormSchema } from "./utils/formSchema";
import { difficultyOptions } from "./utils/selectOptions";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import BasicInfoStep from "./create/BasicInfoStep";
import DetailedInfoStep from "./create/DetaileInfoStep";

type CreateRecipeComponentProps = {
  onSubmit: (data: {
    name: string;
    descritpion: string;
    ingredients: string[];
    steps: string[];
    difficulty: "easy" | "medium" | "hard" | "professional";
    time: number;
    active: boolean;
  }) => void;
};

export default function CreateRecipeComponent({
  onSubmit,
}: CreateRecipeComponentProps) {

  const form = useForm<
    z.infer<typeof FormSchema> & { ingedientsStr: string; stepsString: string }
  >({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      descritpion: "",
      ingredients: [],
      steps: [],
      difficulty: "easy",
      time: "0",
      active: true,
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
            // onSubmit({
            //   active: data.active,
            //   description: data.descritpion,
            //   name: data.name,
            // });
          })}
          className="space-y-6 w-100"
        >
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Basic Info</TabsTrigger>
              <TabsTrigger value="password">Details Info</TabsTrigger>
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
                  <DetailedInfoStep buttonAddIngredient={buttonAddIngredient} buttonAddStep={buttonAddStep} form={form} handleAddIngredient={(field) => {
                    handleAddIngredient(field);
                  }} handleAddStep={(field) => {
                    handleAddStep(field);
                  }}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div >
  );
}
