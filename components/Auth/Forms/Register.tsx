"use client"

import { register } from "@/app/actions/auth/register";
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(register, undefined);
  return (
    <form
      action={action}
      className="bg-neutral-900/60 p-10 rounded-xl w-1/4"
    >
      <h1 className="text-2xl font-semibold mb-5 text-center">
        Create new Account
      </h1>
      <label className="flex flex-col gap-2 mt-5">
        <span className="text-sm font-semibold text-neutral-600">
          User Name
        </span>
        <input
          name="username"
          autoComplete="off"
          className="bg-neutral-900/70 border border-zinc-800 p-2 rounded-md"
          type="text"
        />
      </label>
        {state?.errors?.name && (
          <p className="text-red-500 text-sm mt-2">
            {state.errors.name[0]}
          </p>
        )}
      <label className="flex flex-col gap-2 mt-5">
        <span className="text-sm font-semibold text-neutral-600">Password</span>
        <input
          name="password"
          className="bg-neutral-900/70 border border-zinc-800 p-2 rounded-md"
          type="password"
        />
      </label>
        {state?.errors?.password && (
          <p className="text-red-500 text-sm mt-2">
            {state.errors.password[0]}
          </p>
        )}
      <button
        disabled={pending}
        type="submit"
        className="bg-blue-900 cursor-pointer duration-300 text-neutral-100 p-2 rounded-xl mt-5 w-full font-medium"
      >
        Create
      </button>
      {state?.error?.fieldErrors?.name && (
        <p className="text-red-500 text-center text-sm mt-2">
          {state.error.fieldErrors.name}
        </p>
      )}
    </form>
  );
}