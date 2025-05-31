"use client"

import { AnimatePresence, motion } from "motion/react";
import { ModalType } from "@/types/modal";
import Deposit from "./Goal/Forms/Deposit";
import Invite from "./Goal/Forms/Invite";
import CreateGoal from "./Home/Forms/CreateGoal";
import Withdraw from "./Goal/Forms/Withdraw";
import { useModalStore } from "@/stores/useModal";
import { X } from "lucide-react";
import { JSX } from "react";

const forms: Record<ModalType, JSX.Element | null> = {
  [ModalType.DEPOSIT]: <Deposit />,
  [ModalType.WITHDRAW]: <Withdraw />,
  [ModalType.INVITE]: <Invite />,
  [ModalType.CREATE_GOAL]: <CreateGoal />,
};

export default function Modal() {
  const { closeModal, isOpen, type } = useModalStore()

  const handleClose = () => {
    closeModal()
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ scale: 0, opacity: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`fixed inset-0 z-50 duration-200 font-sans flex items-center justify-center`}
        >
          <div className="bg-zinc-900/50 p-3 w-1/4 rounded-xl backdrop-blur">
            <div
              className="fixed right-0 top-0 cursor-pointer p-5"
              onClick={handleClose}
            >
              <X className="text-neutral-400 hover:text-neutral-200 duration-200" />
            </div>
            <div>{type && forms[type]}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
