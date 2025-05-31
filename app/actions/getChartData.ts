"use server"

import { getCurrentUser } from "@/lib/auth";
import { getTransactions } from "@/lib/db/transactions";

export async function getChartData() {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not found");
  const transactions = await getTransactions(user);  
  const data = transactions.map((transaction) => ({
    month: Intl.DateTimeFormat("en-US", { month: "long" }).format(transaction.created_at),
    amount: transaction.amount
  }));  
  return data;
}