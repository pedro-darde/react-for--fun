import { z } from "zod";

export const FormSchema = z.object({
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