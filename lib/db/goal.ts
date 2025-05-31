import { $Enums } from "@/app/generated/prisma";
import { prisma } from "../prisma";
import { createTransactions } from "./transactions";

export async function getGoals(user: {
  id: string;
  name: string;
}) {
  const goals = await prisma.goals.findMany({
    where: {
      user_id: user?.id,
    },
  });

  return goals;
}

export async function createGoal({ userID, goalName, targetAmount }: {
  userID: string;
  goalName: string;
  targetAmount: number;
}) {
  const newGoal = await prisma.goals.create({
    data: {
      user_id: userID,
      name: goalName,
      target_amount: targetAmount,
    },
  });
  if (!newGoal) {
    throw new Error("Failed to create goal");
  }
  return newGoal;
}

export async function deposit(amount: number, id: string) {
  const goal = await prisma.goals.update({
    where: { id },
    data: {
      saved_amount: {
        increment: amount,
      },
    },
  });
  if (!goal) {
    throw new Error("Failed to deposit amount");
  }
  await createTransactions(id, amount, $Enums.type_enum.income);
  return goal;
}

export async function withdraw(amount: number, id: string) {
  const goal = await prisma.goals.update({
    where: { id },
    data: {
      saved_amount: {
        decrement: amount,
      },
    },
  });
  if (!goal) {
    throw new Error("Failed to withdraw amount");
  }
  await createTransactions(id, amount, $Enums.type_enum.expense);
  return goal;
}

export async function getStatistics(user: { id: string }) {
  const statistics = await prisma.goals.aggregate({
    where: {
      user_id: user?.id,
    },
    _sum: {
      saved_amount: true,
    },
  });
  if (!statistics) {
    throw new Error("Failed to get statistics");
  }
  const activeGoals = await prisma.goals.count({
    where: {
      user_id: user?.id,
      target_amount: {
        gt: 0,
      },
    },
  })
  
  return {
    totalMoney: statistics._sum.saved_amount,
    activeGoals,
  };
}

export async function deleteGoal(id: string) {
  const goal = await prisma.goals.delete({
    where: { id },
  });
  if (!goal) {
    throw new Error("Failed to delete goal");
  }
  return goal;
}