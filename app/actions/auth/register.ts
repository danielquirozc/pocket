"use server";
import { registerFormSchema, } from "@/validators/auth"; 
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { LoginFormState } from "@/types/formState";

export async function register(state: LoginFormState, formData: FormData) {
  const validatedFields = registerFormSchema.safeParse({
    name: formData.get("username"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }
  const { name, password } = validatedFields.data;

  const existingUser = await prisma.users.findUnique({
    where: {
      name,
    },
  });
  if (existingUser) {
    return { error: { fieldErrors: { name: "User already exists" } } };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      name,
      password: hashedPassword,
    },
  });
  if (!user) {
    return { error: { fieldErrors: { name: "User creation failed" } } };
  }
  return redirect("/auth/login");
}
