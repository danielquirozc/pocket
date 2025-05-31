"use client"
import { useModalStore } from "@/stores/useModal";
import { ModalType } from "@/types/modal";
import { Handshake, Minus, Plus } from "lucide-react";

export default function FloatingButtons({ }) {
  const { openModal } = useModalStore()
  const handleDeposit = () => {
    openModal(ModalType.DEPOSIT)
  };

  const handleWithdraw = () => {
    openModal(ModalType.WITHDRAW)
  };
  
  const handleInvite = () => {
    openModal(ModalType.INVITE)
  };

  return (
    <section className="flex justify-center items-center gap-5">
      <label
        htmlFor=""
        onClick={handleDeposit}
        className="flex flex-col items-center gap-2 cursor-pointer"
      >
        <Plus className="bg-neutral-900 border border-neutral-800 text-neutral-600 w-10 h-10 p-2 rounded-full" />
        <input id="deposit" type="button" value="Deposit" />
      </label>
      <label
        htmlFor=""
        onClick={handleWithdraw}
        className="flex mb-5 flex-col items-center gap-2 cursor-pointer"
      >
        <Minus className="bg-neutral-900 border border-neutral-800 text-neutral-600 w-10 h-10 p-2 rounded-full" />
        <input type="button" value="Withdraw" />
      </label>
      <label
        htmlFor=""
        onClick={handleInvite}
        className="flex flex-col items-center gap-2 cursor-pointer"
      >
        <Handshake className="bg-neutral-900 border border-neutral-800 text-neutral-600 w-10 h-10 p-2 rounded-full" />
        <input type="button" value="Invite" />
      </label>
    </section>
  );
}