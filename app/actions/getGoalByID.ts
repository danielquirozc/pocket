"use server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getGoalByID(id: string) {
  const user = await getCurrentUser();
  if (!id || !user) {
    throw new Error("User not found or invalid ID");
  }

  const goal = await prisma.goals.findUnique({
    where: { id, user_id: user.id },
  });

  if (!goal) {
    throw new Error("Goal not found");
  }

  return goal;
}
