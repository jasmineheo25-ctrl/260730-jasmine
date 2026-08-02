import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { workingMomRequests } from "@/db/schema";
import DeleteButton from "@/components/DeleteButton";
import { deleteWorkingMomRequest } from "./actions";

export const dynamic = "force-dynamic";

const SERVICE_TYPE_LABEL: Record<string, string> = {
  emergency: "긴급돌봄",
  short: "단기돌봄",
};

export default async function AdminWorkingMomListPage() {
  const rows = await db
    .select()
    .from(workingMomRequests)
    .orderBy(desc(workingMomRequests.createdAt));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">워킹맘 요청 목록</h1>
        <span className="text-sm text-zinc-500">총 {rows.length}건</span>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-zinc-200 text-sm">
          <thead className="bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">신청일시</th>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3">연락처</th>
              <th className="px-4 py-3">이메일</th>
              <th className="px-4 py-3">서비스</th>
              <th className="px-4 py-3">날짜</th>
              <th className="px-4 py-3">시간대</th>
              <th className="px-4 py-3">돌봄범위</th>
              <th className="px-4 py-3">특이사항</th>
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
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600">
                  {SERVICE_TYPE_LABEL[row.serviceType] ?? row.serviceType}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600">
                  {row.date}
                  {row.duration ? ` (${row.duration})` : ""}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600">{row.timeRange}</td>
                <td className="px-4 py-3 text-zinc-600">{row.careScope.join(", ")}</td>
                <td
                  className="max-w-[200px] truncate px-4 py-3 text-zinc-600"
                  title={row.specialRequests ?? undefined}
                >
                  {row.specialRequests ?? "-"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/workingmom/${row.id}`}
                      className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
                    >
                      수정
                    </Link>
                    <DeleteButton
                      action={deleteWorkingMomRequest.bind(null, row.id)}
                      confirmMessage={`${row.name} 님의 요청을 삭제하시겠습니까?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-10 text-center text-zinc-400">
                  아직 접수된 요청이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
