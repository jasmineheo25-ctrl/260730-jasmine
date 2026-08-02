"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { workingMomRequests } from "@/db/schema";

export type WorkingMomEditState = {
  status: "idle" | "error";
  message?: string;
};

export async function deleteWorkingMomRequest(id: string) {
  await db.delete(workingMomRequests).where(eq(workingMomRequests.id, id));
  revalidatePath("/admin/workingmom");
  revalidatePath("/admin");
}

export async function updateWorkingMomRequest(
  id: string,
  _prevState: WorkingMomEditState,
  formData: FormData,
): Promise<WorkingMomEditState> {
  const careScope = (formData.get("careScope") as string) ?? "";

  try {
    await db
      .update(workingMomRequests)
      .set({
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        childAge: formData.get("childAge") as string,
        serviceType: formData.get("serviceType") as string,
        date: formData.get("date") as string,
        duration: (formData.get("duration") as string) || null,
        timeRange: formData.get("timeRange") as string,
        careScope: careScope ? careScope.split(",") : [],
        specialRequests: (formData.get("specialRequests") as string) || null,
        inquiry: (formData.get("inquiry") as string) || null,
      })
      .where(eq(workingMomRequests.id, id));
  } catch {
    return {
      status: "error",
      message: "수정 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  revalidatePath("/admin/workingmom");
  redirect("/admin/workingmom");
}
