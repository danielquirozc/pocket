"use client"
import { depositAction } from "@/app/actions/deposit";
import { useParams } from "next/navigation";
import { useActionState } from "react";

export default function Deposit() {
  const [state, action, pending] = useActionState(depositAction, undefined)
  const params = useParams()
  const { id } = params as { id: string }

  return (
    <form action={action} className="flex flex-col gap-3 my-10 mx-5">
      <label className="flex relative bg-neutral-900 border border-neutral-700 p-3 rounded-2xl flex-col gap-2 mb-5">
        <span className="text-sm font-semibold text-gray-500">
          ID
        </span>
        <input
          defaultValue={id}
          name="goalID"
          readOnly
          className="ring-0 opacity-50 cursor-not-allowed truncate w-28 text-sm font-semibold"
          type="text"
        />
        <span className="font-semibold absolute top-1/2 right-3">#</span>
      </label>
      <label className="flex relative bg-neutral-900 border border-neutral-700 p-3 rounded-2xl flex-col gap-2 mb-5">
        <span className="text-sm font-semibold text-gray-500">
          Savings Amount
        </span>
        <input
          defaultValue="0.00"
          name="amount"
          className="ring-0 text-sm font-semibold"
          type="text"
        />
        <span className="font-semibold absolute top-1/2 right-3">$</span>
      </label>
      {state?.errors?.amount && (
        <span className="text-red-500 text-sm font-semibold">
          {state.errors.amount[0]}
        </span>
      )}
      <button
        disabled={pending}
        type="submit"
        className="w-full text-sm cursor-pointer bg-emerald-700/20 hover:bg-emerald-700 duration-300 text-emerald-700 hover:text-white font-semibold py-3 rounded-full"
      >
        Deposit
      </button>
    </form>
  );
}
