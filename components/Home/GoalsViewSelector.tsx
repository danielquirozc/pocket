"use client"

import { useGoalsStore } from "@/stores/useGoals";

export default function GoalsViewSelector() {
  const { toggleCurrentView, showArchived } = useGoalsStore()
  
  const disableStyle = "text-zinc-500 cursor-pointer"
  const activeStyle = "text-zinc-50 border-b-2 pb-3 cursor-pointer"
  return (
    <div className="flex gap-10 mx-15 font-medium">
      <button
        onClick={() => toggleCurrentView(false)}
        className={showArchived ? disableStyle : activeStyle}
      >
        Active Goals
      </button>
      <button
        onClick={() => toggleCurrentView(true)}
        className={showArchived ? activeStyle : disableStyle}
      >
        Archive Goals
      </button>
    </div>
  );
}