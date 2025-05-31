"use client"
import { motion } from "motion/react";
import { useGoalsStore } from "@/stores/useGoals";
import { goals } from "@/app/generated/prisma";
import GoalCard from "./GoalCard";
import { Plus } from "lucide-react";
import { useModalStore } from "@/stores/useModal";
import { ModalType } from "@/types/modal";

export default function GoalList({ listOfGoals }: { listOfGoals: goals[] }) {
  const { showArchived } = useGoalsStore()
  const { openModal } = useModalStore()

  const handleCreateGoal = () => {
    openModal(ModalType.CREATE_GOAL)
  }

  const renderGoals = listOfGoals.map((goal) => {
    if (!showArchived && !goal.archived) {
      return <GoalCard key={goal.id} {...goal} />;
    };
    if (showArchived && goal.archived) {
      return <GoalCard key={goal.id} {...goal} />;
    };
  });

  const animations = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <motion.section
      key={showArchived ? "archived" : "active"}
      {...animations}
      className="flex flex-wrap m-10 gap-x-10"
    >
      {renderGoals}
      {showArchived ? null : (
        <div onClick={handleCreateGoal} className="bg-neutral-900 cursor-pointer flex flex-col justify-center items-center w-52 min-h-40 rounded-2xl mb-4">
          <Plus size={28} className="text-zinc-300" />
          <h3 className="text-sm font-sans text-zinc-500 font-medium">Create a new Goal</h3>
        </div>
      )}
    </motion.section>
  );
}
