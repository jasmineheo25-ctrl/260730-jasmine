import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { seniorApplications } from "@/db/schema";
import DeleteButton from "@/components/DeleteButton";
import { deleteSeniorApplication } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSeniorListPage() {
  const rows = await db
    .select()
    .from(seniorApplications)
    .orderBy(desc(seniorApplications.createdAt));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">시니어 지원자 목록</h1>
        <span className="text-sm text-zinc-500">총 {rows.length}건</span>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-zinc-200 text-sm">
          <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">지원일시</th>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3">연락처</th>
              <th className="px-4 py-3">이메일</th>
              <th className="px-4 py-3">거주지</th>
              <th className="px-4 py-3">연령대</th>
              <th className="px-4 py-3">재직기간</th>
              <th className="px-4 py-3">근무직종</th>
              <th className="px-4 py-3">선호 서비스</th>
              <th className="px-4 py-3 text-right">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map((row) => (
              <tr key={row.id} className="align-top">
                <td className="whitespace-nowrap px-4 py-3 text-zinc-500">
                  {row.createdAt.toLocaleString("ko-KR")}
                </td>
                <td className="px-4 py-3 font-medium text-zinc-900">{row.name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600">{row.phone}</td>
                <td className="px-4 py-3 text-zinc-600">{row.email}</td>
                <td className="px-4 py-3 text-zinc-600">{row.addressDong}</td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600">{row.ageGroup}</td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600">
                  {row.careerLength}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600">{row.jobType}</td>
                <td className="px-4 py-3 text-zinc-600">
                  {row.preferredServices.join(", ")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/senior/${row.id}`}
                      className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
                    >
                      수정
                    </Link>
                    <DeleteButton
                      action={deleteSeniorApplication.bind(null, row.id)}
                      confirmMessage={`${row.name} 님의 지원서를 삭제하시겠습니까?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-zinc-400">
                  아직 접수된 지원서가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
