import { logout } from "@/app/actions/auth/logout";
import { getCurrentUser } from "@/lib/auth";
import { DoorOpen } from "lucide-react";

export default async function Header() {
  const user = await getCurrentUser()

  return (
    <header className="flex items-center justify-between px-5 py-3 mx-10">
      <div className="flex text-slate-50 items-center gap-3">
        <h2>
          Welcome, <strong>{user?.name}</strong>
        </h2>
      </div>
      <button onClick={logout} className="flex items-center duration-300 cursor-pointer text-red-400 gap-2 bg-red-950/40 px-4 py-2 rounded-md">
        Cerrar Sesión
        <DoorOpen className="size-5" />
      </button>
    </header>
  );
}