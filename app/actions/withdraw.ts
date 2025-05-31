"use server"

import { withdraw } from "@/lib/db/goal";
import { WithdrawFormState } from "@/types/formState";
import { withdrawSchema } from "@/validators/goal";
import { revalidatePath } from "next/cache";

export async function withdrawAction(state : WithdrawFormState, formData: FormData) {
  const validatedFields = withdrawSchema.safeParse({
    amount: formData.get("amount"),
    id: formData.get("goalID"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { amount, id } = validatedFields.data;
  try {
    await withdraw(amount, id);
    revalidatePath("/goal");
  } catch (error) {
    return {
      errors: {
        amount: ["Failed to withdraw amount"],
      },
    };
  }
}