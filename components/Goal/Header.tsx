"use client"
import { deleteGoalAction } from "@/app/actions/deleteGoal";
import { ArrowLeft, EllipsisVertical } from "lucide-react";

export default function Header({goalID} : {goalID: string}) {
  return (
    <header className="flex items-center justify-between p-10 mx-10">
      <a href="/" className="text-zinc-500 flex items-center gap-3">
        <ArrowLeft className="w-5 h-5 text-zinc-500" />
        <span className="font-medium">Volver al inicio</span>
      </a>
      <button onClick={() => deleteGoalAction(goalID)} className="bg-neutral-900 cursor-pointer rounded-md p-2">
        <EllipsisVertical className="w-5 h-5 text-zinc-500" />
      </button>
    </header>
  );
}