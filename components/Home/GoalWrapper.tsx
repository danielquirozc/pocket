import { getGoalsAction } from "@/app/actions/getGoals";
import GoalList from "./GoalList";

export default async function GoalWrapper() {
  const goals = await getGoalsAction();
  return (
    <GoalList listOfGoals={goals} />
  )
}