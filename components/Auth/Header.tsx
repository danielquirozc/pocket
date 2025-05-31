export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex items-center justify-between px-5 py-3 mx-10">
      <h1 className="text-2xl text-neutral-700 font-bold">Pocket+</h1>
      {children}
    </header>
  );
}