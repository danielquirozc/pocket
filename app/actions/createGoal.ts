"use server";
import { getCurrentUser } from "@/lib/auth";
import { createGoal } from "@/lib/db/goal";
import { CreateGoalFormState } from "@/types/formState";
import { goalSchema } from "@/validators/goal";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateGoal(state: CreateGoalFormState, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/login");
  }
  const validatedFields = goalSchema.safeParse({
    name: formData.get("name"),
    targetAmount: Number(formData.get("targetAmount")),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const { name, targetAmount } = validatedFields.data;
  try {
    await createGoal({
      userID: user.id,
      goalName: name,
      targetAmount: targetAmount,
    });
    revalidatePath("/");
  } catch (error) {
    return { message: "Error creating goal" };
  }
}
