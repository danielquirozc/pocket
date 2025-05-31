"use server";

import { generateAccessToken, generateRefreshToken } from "@/lib/auth";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "@/lib/constants";
import { loginFormSchema } from "@/validators/auth";
import { prisma } from "@/lib/prisma";
import { LoginFormState } from "@/types/formState";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(state: LoginFormState, formData: FormData) {
  const validatedFields = loginFormSchema.safeParse({
    name: formData.get("username"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }
  const { name, password } = validatedFields.data;
  const user = await prisma.users.findFirst({
    where: { name },
  });
  const isValidPassword = await bcrypt.compare(password, user?.password || "");

  if (!user || !isValidPassword) {
    return {
      errors: {
        name: ["Invalid username or password"],
      },
    };
  }
  const userInfo = {
    id: user.id,
    name: user.name,
  };
  const accessToken = await generateAccessToken(userInfo);
  const refreshToken = await generateRefreshToken(userInfo);
  await prisma.refresh_tokens.create({
    data: {
      token: refreshToken,
      user_id: userInfo.id,
      expires_at: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000), // 7 days
    },
  });
  const cookieStore = await cookies();
  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    maxAge: ACCESS_TOKEN_EXPIRES_IN,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: REFRESH_TOKEN_EXPIRES_IN,
    secure: process.env.NODE_ENV === "production",
  });
  return redirect("/");
}
