import Link from "next/link";
import { count } from "drizzle-orm";
import { db } from "@/db";
import { seniorApplications, workingMomRequests } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [[workingMomCount], [seniorCount]] = await Promise.all([
    db.select({ value: count() }).from(workingMomRequests),
    db.select({ value: count() }).from(seniorApplications),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold text-zinc-900">리드 관리자</h1>
      <p className="mt-2 text-sm text-zinc-600">
        제출된 신청/지원 내역을 조회, 수정, 삭제할 수 있습니다.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/workingmom"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors hover:border-rose-300"
        >
          <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">
            워킹맘 요청
          </span>
          <p className="mt-4 text-3xl font-bold text-zinc-900">{workingMomCount.value}건</p>
          <p className="mt-1 text-sm text-zinc-500">목록 보기 →</p>
        </Link>

        <Link
          href="/admin/senior"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors hover:border-teal-300"
        >
          <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
            시니어 지원자
          </span>
          <p className="mt-4 text-3xl font-bold text-zinc-900">{seniorCount.value}건</p>
          <p className="mt-1 text-sm text-zinc-500">목록 보기 →</p>
        </Link>
      </div>
    </div>
  );
}
