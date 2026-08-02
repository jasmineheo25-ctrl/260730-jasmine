import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { seniorApplications } from "@/db/schema";
import EditForm from "./EditForm";

export const dynamic = "force-dynamic";

export default async function AdminSeniorEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [row] = await db
    .select()
    .from(seniorApplications)
    .where(eq(seniorApplications.id, id));

  if (!row) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold text-zinc-900">시니어 지원자 수정</h1>
      <p className="mt-2 text-sm text-zinc-600">{row.name} 님의 지원 내용을 수정합니다.</p>
      <div className="mt-6">
        <EditForm row={row} />
      </div>
    </div>
  );
}
