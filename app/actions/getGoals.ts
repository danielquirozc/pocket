"use server";
import { getCurrentUser } from "@/lib/auth";
import { getGoals } from "@/lib/db/goal";

export async function getGoalsAction() {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not found");
  const goals = await getGoals(user);
  return goals;
}
