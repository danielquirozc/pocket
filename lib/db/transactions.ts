import { $Enums } from "@/app/generated/prisma";
import { prisma } from "../prisma";

export async function createTransactions(
  goalID: string,
  amount: number,
  type: $Enums.type_enum
) {
  const transaction = await prisma.transactions.create({
    data: {
      goal_id: goalID,
      amount,
      type,
    },
  });
  if (!transaction) {
    throw new Error("Failed to create transaction");
  }
  return transaction;
}

export async function getTransactionsByGoalID(goalID: string) {
  const transactions = await prisma.transactions.findMany({
    where: {
      goal_id: goalID,
    },
  });
  if (!transactions) {
    throw new Error("Failed to get transactions");
  }
  return transactions;
}

export async function getTransactions(user: { id: string }, goalID?: string) {
  const transactions = await prisma.transactions.findMany({
    where: {
      goals: {
        user_id: user?.id,
        id: goalID,
      },
      type: $Enums.type_enum.income,
    },
    orderBy: {
      created_at: "asc",
    },
  });

  if (!transactions) {
    throw new Error("Failed to get transactions");
  }
  return transactions;
}

export async function getMoneyDepositedToday(user: { id: string }) {
  const {
    _sum: { amount: moneyDepositedToday },
  } = await prisma.transactions.aggregate({
    where: {
      goals: {
        user_id: user?.id,
      },
      created_at: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  if (moneyDepositedToday === null) {
    return { moneyDepositedToday: 0 };
  }

  if (!moneyDepositedToday) {
    throw new Error("Failed to get money deposited today");
  }
  return { moneyDepositedToday };
}
