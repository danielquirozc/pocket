import RegisterForm from "@/components/Auth/Forms/Register";
import Header from "@/components/Auth/Header";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <Header>
        <Link
          href="/auth/login"
          className="text-zinc-50 font-medium cursor-pointer bg-zinc-900 px-4 py-2 rounded-md"
        >
          Sign in to your account
        </Link>
      </Header>
      <main className="my-30 flex flex-col justify-center items-center">
        <RegisterForm  />
      </main>
    </>
  );
}