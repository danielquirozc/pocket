import { z } from "zod";

export const goalSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  targetAmount: z.number().min(1, { message: "Target amount is required" }),
});

export const depositSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount" })
    .transform((val) => parseFloat(val)),
  id: z.string().uuid({ message: "Invalid goal ID" }),
});

export const withdrawSchema = z.object({
  amount: z
    .string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount" })
    .transform((val) => parseFloat(val)),
  id: z.string().uuid({ message: "Invalid goal ID" }),
});