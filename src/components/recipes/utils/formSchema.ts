import { z } from "zod";

export const FormSchema = z.object({
    name: z.string().min(2, {
        message: "The must be at least 2 characters.",
    }),
    description: z.string(),
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
    tags: z.string().array().min(1, {
        message: "At least one tag is required",
    }),
    images: z
        .array(
            z
                .instanceof(File)
        )
        .min(1, 'At least 1 file is required')
        .refine(
            (files) => files.every((file) => file.size < 2 * 1024 * 1024),
            'File size must be less than 2MB',
        ),
});