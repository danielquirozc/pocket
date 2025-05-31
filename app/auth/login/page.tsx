import LoginForm from "@/components/Auth/Forms/Login";
import Header from "@/components/Auth/Header";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Header>
        <Link
          href="/auth/register"
          className="text-zinc-50 font-medium cursor-pointer bg-zinc-900 px-4 py-2 rounded-md"
        >
          Create an account
        </Link>
      </Header>
      <main className="my-30 flex flex-col justify-center items-center">
        <LoginForm />
      </main>
    </>
  );
}