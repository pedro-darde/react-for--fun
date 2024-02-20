import { Dropzone } from "@/components/dropzone/Dropzone";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSchema } from "../utils/formSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

type ImageStepsProps = {
  form: UseFormReturn<
    z.infer<typeof FormSchema> & { ingedientsStr: string; stepsString: string }
  >;
};
export default function ImagesStep({ form }: ImageStepsProps) {
  return (
    <div>
      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <Dropzone
                onChange={(files) => {
                  console.log(files);
                  form.setValue("images", files);
                }}
                fileExtension={["jpeg", "png", "jpeg"]}
              />
            </FormControl>
            <FormDescription>
              {JSON.stringify(field.value)} - aaa{" "}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
