"use server"

import { getCurrentUser } from "@/lib/auth";
import { getStatistics } from "@/lib/db/goal";
import { getMoneyDepositedToday } from "@/lib/db/transactions";

export async function getStatisticsAction() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const { moneyDepositedToday } = await getMoneyDepositedToday(user);
  const statistics = await getStatistics(user);
  return { ...statistics, moneyDepositedToday };
}