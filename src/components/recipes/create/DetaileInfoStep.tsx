import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ChipComponent from "../ChipComponent";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "../utils/formSchema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { JsonList } from "@/types/JsonList";
import { MultiSelect } from "@/components/multiselect/Multiselect";

type DetailedInfoStepProps = {
  form: UseFormReturn<
    z.infer<typeof FormSchema> & { ingedientsStr: string; stepsString: string }
  >;
  buttonAddIngredient: React.MutableRefObject<HTMLButtonElement | null>;
  buttonAddStep: React.MutableRefObject<HTMLButtonElement | null>;
  handleAddStep: (field: any) => void;
  handleAddIngredient: (field: { value: string }) => void;
  tags: JsonList[];
  onAddNewTag: (value: string) => void;
};

export default function DetailedInfoStep({
  form,
  buttonAddIngredient,
  buttonAddStep,
  handleAddStep,
  handleAddIngredient,
  tags,
  onAddNewTag,
}: DetailedInfoStepProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="ingedientsStr"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ingredients</FormLabel>
            <FormControl>
              <div className="flex flex-col">
                <div className="flex flex-row justify-between gap-2">
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
                    onClick={() => handleAddIngredient(field)}
                  >
                    +
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      form.resetField("ingedientsStr");
                      form.setValue("ingredients", []);
                    }}
                  >
                    Clear
                  </Button>
                </div>
                <ChipComponent
                  values={form.getValues().ingredients}
                  onDelete={(_, index) => {
                    const ingredients = form.getValues().ingredients;
                    ingredients.splice(index, 1);
                    form.setValue("ingredients", ingredients);
                  }}
                />
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
        name="stepsString"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Steps</FormLabel>
            <FormControl>
              <div className="flex flex-col">
                <div className="flex flex-row justify-between gap-2" style={{}}>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        console.log("clickou enter");
                        event.preventDefault();
                        buttonAddStep.current?.click();
                      }
                    }}
                  />
                  <Button
                    ref={buttonAddStep}
                    type="button"
                    onClick={() => handleAddStep(field)}
                  >
                    +
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      form.resetField("stepsString");
                      form.setValue("steps", []);
                    }}
                  >
                    Clear
                  </Button>
                </div>
                <ChipComponent
                  values={form.getValues().steps}
                  onDelete={(_, index) => {
                    const steps = form.getValues().steps;
                    steps.splice(index, 1);
                    form.setValue("steps", steps);
                  }}
                />
              </div>
            </FormControl>
            <FormDescription>
              You can separate the steps with a comma
            </FormDescription>
            <FormMessage>
              {form.formState.errors.steps?.message &&
              !form.getValues().steps.length ? (
                <p> {form.formState.errors.steps?.message}</p>
              ) : null}
            </FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ingredients</FormLabel>
            <FormControl>
              <MultiSelect
                onChange={field.onChange}
                options={tags}
                selected={field.value}
                onAddNew={(tag) => {
                  onAddNewTag(tag);
                }}
              />
            </FormControl>
            <FormDescription>
              The tags that will be used to search the recipe
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
