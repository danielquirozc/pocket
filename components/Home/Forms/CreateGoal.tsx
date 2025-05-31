"use client"
import createGoal from "@/app/actions/createGoal";
import { useActionState } from "react";

export default function CreateGoalForm() {
  const [state, action, pending] = useActionState(createGoal, undefined)
  return (
    <form action={action} className="p-5 rounded-xl">
      <label className="flex flex-col gap-2 mt-5">
        <span className="text-sm font-semibold text-neutral-600">Name</span>
        <input
          name="name"
          autoComplete="off"
          className="bg-neutral-900/70 border border-zinc-800 p-2 rounded-md"
          type="text"
        />
      </label>
      {state?.errors?.name && (
        <p className="text-red-500 text-sm font-medium mt-2">
          {state.errors.name[0]}
        </p>
      )}
      <label className="flex flex-col gap-2 mt-5">
        <span className="text-sm font-semibold text-neutral-600">
          Target Amount
        </span>
        <input
          name="targetAmount"
          className="bg-neutral-900/70 border border-zinc-800 p-2 rounded-md"
          type="number"
        />
      </label>
      {state?.errors?.targetAmount && (
        <p className="text-red-500 text-sm font-medium mt-2">
          {state.errors.targetAmount[0]}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-900 cursor-pointer duration-300 text-neutral-100 p-2 rounded-xl mt-5 w-full font-medium"
      >
        Create Goal
      </button>
      {state?.message && (
        <p className="text-red-500 text-sm font-medium mt-2">{state.message}</p>
      )}
    </form>
  );
}
