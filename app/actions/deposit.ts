"use server";
import { deposit } from "@/lib/db/goal";
import { DepositFormState } from "@/types/formState";
import { depositSchema } from "@/validators/goal";
import { revalidatePath } from "next/cache";

export async function depositAction(state: DepositFormState, formData: FormData) {
  const validatedFields = depositSchema.safeParse({
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
    await deposit(amount, id);
    revalidatePath("/goal");
  } catch (error) {
    return {
      errors: {
        amount: ["Failed to deposit amount"],
      },
    };
  }
}
