import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { workingMomRequests } from "@/db/schema";
import EditForm from "./EditForm";

export const dynamic = "force-dynamic";

export default async function AdminWorkingMomEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [row] = await db
    .select()
    .from(workingMomRequests)
    .where(eq(workingMomRequests.id, id));

  if (!row) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold text-zinc-900">워킹맘 요청 수정</h1>
      <p className="mt-2 text-sm text-zinc-600">{row.name} 님의 신청 내용을 수정합니다.</p>
      <div className="mt-6">
        <EditForm row={row} />
      </div>
    </div>
  );
}
