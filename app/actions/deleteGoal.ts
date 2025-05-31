"use server"

import { getCurrentUser } from "@/lib/auth";
import { deleteGoal } from "@/lib/db/goal";
import { redirect } from "next/navigation";

export async function deleteGoalAction(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }
  await deleteGoal(id);
  redirect("/");
}