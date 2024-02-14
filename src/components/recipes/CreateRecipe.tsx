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
  const difficultyOptions = [
    {
      name: "Easy",
      value: "easy",
    },
    {
      name: "Medium",
      value: "medium",
    },
    {
      name: "Hard",
      value: "hard",
    },
    {
      name: "Professional",
      value: "professional",
    },
  ];

  const FormSchema = z.object({
    name: z.string().min(2, {
      message: "The must be at least 2 characters.",
    }),
    descritpion: z.string(),
    ingredients: z.string().array().min(1, {
      message: "At least one ingredient is required",
    }),
    steps: z.string().array().min(1, {
      message: "At least one step is required",
    }),
    time: z.string().refine((data) => parseInt(data) > 0, {
      message: "The time must be greater than 0",
    }),
    difficulty: z.enum(["easy", "medium", "hard", "professional"]),
    active: z.boolean().default(true),
  });

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
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>The time in minutes</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a verified the difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          {difficultyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>The difficulty </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="ingedientsStr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <div className="flex flex-col">
                    <div
                      className="flex flex-row justify-between gap-2"
                      style={{}}
                    >
                      <Input
                        placeholder="shadcn"
                        {...field}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            buttonAddIngredient.current?.click();
                          }
                        }}
                      />
                      <Button
                        ref={buttonAddIngredient}
                        type="button"
                        onClick={() => {
                          if (!field.value) return;
                          const currentIngredients =
                            form.getValues().ingredients;
                          const values = field.value
                            .split(",")
                            .map((value) => value.trim());
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
                        }}
                      >
                        {" "}
                        +{" "}
                      </Button>
                    </div>
                    <div className="flex flex-row gap-1 mt-2 flex-wrap items-center">
                      {form.getValues().ingredients.map((ingredient, index) => (
                        <div
                          className="flex flex-row gap-1 items-center"
                          style={{
                            border: "1.75px solid #e2e8f0",
                            borderRadius: "0.375rem",
                          }}
                        >
                          <p className="rounded-lg bg-gray-900 py-0.5 px-1  italic text-[10px] font-sans text-sm  text-white">
                            {ingredient}
                            <Button
                              className="rounded-lg  bg-gray-900 p-2 ml-2"
                              onClick={() => {
                                const ingredients =
                                  form.getValues().ingredients;
                                ingredients.splice(index, 1);
                                form.setValue("ingredients", ingredients);
                              }}
                            >
                              X
                            </Button>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  You can separate the ingredients with a comma
                </FormDescription>
                <FormMessage>
                  {form.formState.errors.ingredients?.message &&
                  !form.getValues().ingredients.length ? (
                    <p> {form.formState.errors.ingredients?.message}</p>
                  ) : null}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descritpion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormDescription>Something about the tag</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Active</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
