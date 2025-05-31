import { goals } from "@/app/generated/prisma";
import ProgressBar from "./ProgressBar";
import Link from "next/link";

export default function GoalCard({ id, saved_amount, target_amount, name }: goals) {
  const progress = ((saved_amount || 0) / target_amount) * 100;
  return (
    <Link
      href={`/goal/${id}`}
      referrerPolicy="no-referrer"
      className="inline-flex font-sans relative opacity-90 group overflow-hidden duration-300 min-w-96 min-h-40 flex-col justify-between gap-2 bg-neutral-900 rounded-xl p-6 mb-4"
    >
      <div className="noise-texture opacity-3 group-hover:opacity-0 duration-300"></div>
      <div>
        <h2 className="text-sm">{name}</h2>
        <h2 className="text-4xl font-bold">
          ${Intl.NumberFormat().format(saved_amount || 0)}
          <span className="text-sm text-zinc-400">
            /{Intl.NumberFormat().format(target_amount)}
          </span>
        </h2>
      </div>
      <ProgressBar progress={progress} />
    </Link>
  );
}