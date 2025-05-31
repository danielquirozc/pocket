import { withdrawAction } from "@/app/actions/withdraw";
import { useParams } from "next/navigation";
import { useActionState } from "react";

export default function Withdraw() {
  const [state, action, pending] = useActionState(withdrawAction, undefined)
  const params = useParams()
  const { id } = params as { id: string }
  return (
    <form action={action} className="my-10 mx-5">
      <label className="flex relative bg-neutral-900 border border-neutral-700 p-3 rounded-2xl flex-col gap-2 mb-5">
        <span className="text-sm font-semibold text-gray-500">ID</span>
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
          Withdraw Amount
        </span>
        <input
          defaultValue="0.00"
          className="ring-0 text-sm font-semibold"
          type="text"
          name="amount"
        />
        <span className="font-semibold absolute top-1/2 right-3">$</span>
      </label>
      {state?.errors?.amount && (
        <p className="text-red-500 text-sm font-semibold mb-5">
          {state.errors.amount[0]}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full cursor-pointer text-sm bg-red-700/20 hover:bg-red-700 duration-300 text-red-700 hover:text-white font-semibold py-3 rounded-full"
      >
        Withdraw
      </button>
    </form>
  );
}
