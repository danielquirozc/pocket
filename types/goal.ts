export enum GoalStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  description: string;
  status: string; // GoalStatus
  createdAt: string;
}