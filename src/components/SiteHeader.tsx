import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
          돌봄이음
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium">
          <Link
            href="/workingmom"
            className="rounded-full px-4 py-2 text-rose-700 transition-colors hover:bg-rose-50"
          >
            워킹맘 신청
          </Link>
          <Link
            href="/senior"
            className="rounded-full px-4 py-2 text-teal-700 transition-colors hover:bg-teal-50"
          >
            시니어 지원
          </Link>
        </nav>
      </div>
    </header>
  );
}
