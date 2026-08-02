import Link from "next/link";

export default function AdminNav() {
  return (
    <header className="w-full border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/admin" className="text-lg font-bold tracking-tight text-zinc-900">
          돌봄이음 관리자
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium">
          <Link
            href="/admin/workingmom"
            className="rounded-full px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            워킹맘 요청
          </Link>
          <Link
            href="/admin/senior"
            className="rounded-full px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            시니어 지원자
          </Link>
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-zinc-500 transition-colors hover:bg-zinc-100"
          >
            사이트로
          </Link>
        </nav>
      </div>
    </header>
  );
}
