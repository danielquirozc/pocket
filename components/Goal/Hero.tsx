import { Decimal } from "@prisma/client/runtime/library";
import FloatingButtons from "./FloatingButtons";

export default function Hero({ currentAmount, targetAmount }: {
  currentAmount: number | null;
  targetAmount: number | null;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center my-10">
        <h3 className="text-md font-medium text-neutral-500">Total raised</h3>
        <div className="flex items-center gap-2">
          <h2 className="text-5xl font-semibold text-zinc-50">
            ${Intl.NumberFormat().format(currentAmount ?? 0)}
          </h2>
          <span className="text-3xl -ml-2 text-neutral-500 font-medium">
            /{Intl.NumberFormat().format(targetAmount ?? 0)}
          </span>
        </div>
      </div>
      <FloatingButtons />
    </>
  );
}