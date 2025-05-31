import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const loginFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
