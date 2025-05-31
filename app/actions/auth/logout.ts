"use server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();
  const user = await getCurrentUser();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  await prisma.refresh_tokens.deleteMany({
    where: { user_id: user?.id },
  });

  redirect("/auth/login");
}
