import { getStatisticsAction } from "@/app/actions/getStatistics";
import Chart from "./Chart";
import { getChartData } from "@/app/actions/getChartData";

const DEFAULT_DATA = [{
  month: "",
  amount: 0
}]

export default async function Statistics() {
  const { activeGoals, totalMoney, moneyDepositedToday } = await getStatisticsAction()
  const chartData = await getChartData();
  
  return (
    <section className="flex justify-between items-center p-10 flex-wrap">
      <div className="flex gap-20">
        <div className="flex flex-col gap-2">
          <h3 className="text-md font-semibold text-zinc-500">Total money</h3>
          <p className="text-5xl font-semibold text-zinc-50">${totalMoney}</p>
          <p className="text-sm font-bold text-emerald-800">+{moneyDepositedToday} today</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-md font-semibold text-zinc-500">Active Goals</h3>
          <p className="text-5xl bg-purpl font-semibold text-zinc-50">{activeGoals}</p>
        </div>
      </div>
      <Chart data={chartData.length > 0 ? chartData : DEFAULT_DATA} />
    </section>
  );
}
