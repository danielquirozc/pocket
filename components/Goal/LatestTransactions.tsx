import { $Enums } from "@/app/generated/prisma";
import { getTransactionsByGoalID } from "@/lib/db/transactions";
import { formatDate } from "@/utils/formatDate";

export default async function LatestTransactions({ id }: { id: string }) {
  if (!id) return null;
  const latestTransactions = await getTransactionsByGoalID(id);
  const renderTransaction = latestTransactions.map((transaction, index) => {
    const { created_at, amount, type } = transaction;
    return (
      <li key={index} className="flex items-center py-3 rounded-md gap-2">
        <span
          className={`w-2 h-2 ${
            type == "income" ? "bg-green-500" : "bg-red-500"
          } rounded-full`}
        ></span>
        <div className="flex gap-10 items-center justify-between w-full">
          <span className="text-sm font-semibold text-zinc-300">
            {created_at && formatDate(created_at)}
          </span>
          <span className={`text-sm font-medium text-zinc-600`}>
            {type == $Enums.type_enum.expense ? "-" : "+"}
            {amount}$
          </span>
        </div>
      </li>
    );
  });
  return (
    <div className="flex flex-col font-sans gap-2 w-full rounded-lg max-w-md">
      <h2 className="font-medium bg-neutral-900/50 border border-neutral-800 p-3 px-4 rounded-xl">
        Latest Transactions
      </h2>
      <ul className="flex border min-h-52 border-neutral-800 flex-col gap-2 bg-neutral-900/20 p-3 px-4 rounded-xl">
        {latestTransactions.length > 0 ? (
          renderTransaction
        ) : (
          <h1 className="text-sm font-semibold text-zinc-400 text-center">
            No transactions yet
          </h1>
        )}
      </ul>
    </div>
  );
}
