import GoalsViewSelector from "@/components/Home/GoalsViewSelector";
import GoalWrapper from "@/components/Home/GoalWrapper";
import Header from "@/components/Home/Header";
import Statistics from "@/components/Home/Statistics";
import Modal from "@/components/Modal";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-t font-sans relative from-neutral-900 to-transparent">
        <Header />
        <div className="noise-texture opacity-2"></div>
        <main className="relative m-10">
          <Statistics />
        </main>
        <GoalsViewSelector />
      </div>
      <GoalWrapper />
      <Modal />
    </>
  );
}
