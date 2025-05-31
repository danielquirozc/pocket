import { getChartDataByID } from "@/app/actions/getChartDataByID";
import { getGoalByID } from "@/app/actions/getGoalByID";
import Header from "@/components/Goal/Header";
import Hero from "@/components/Goal/Hero";
import LatestTransactions from "@/components/Goal/LatestTransactions";
import Chart from "@/components/Home/Chart";
import Modal from "@/components/Modal";

export default async function Goal({ params }: {
  params: Promise<{ id: string }>,
}) {
  const { id } = await params
  const goal = await getGoalByID(id);
  const chartData = await getChartDataByID({ id });
  const { saved_amount: currentAmount, target_amount: targetAmount } = goal || {};

  return (
    <main className="flex flex-col bg-gradient-to-b h-screen relative from-neutral-950">
      <div className="noise-texture opacity-2"></div>
      <Header goalID={id} />
      <Hero currentAmount={currentAmount} targetAmount={targetAmount} />
      <section className="flex items-center font-sans justify-around flex-1">
        <LatestTransactions id={id} />
        <Chart data={chartData} />
      </section>
      <Modal />
    </main>
  );
}
