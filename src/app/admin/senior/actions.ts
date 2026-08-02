"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { seniorApplications } from "@/db/schema";

export type SeniorEditState = {
  status: "idle" | "error";
  message?: string;
};

export async function deleteSeniorApplication(id: string) {
  await db.delete(seniorApplications).where(eq(seniorApplications.id, id));
  revalidatePath("/admin/senior");
  revalidatePath("/admin");
}

export async function updateSeniorApplication(
  id: string,
  _prevState: SeniorEditState,
  formData: FormData,
): Promise<SeniorEditState> {
  const preferredServices = (formData.get("preferredServices") as string) ?? "";

  try {
    await db
      .update(seniorApplications)
      .set({
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        addressDong: formData.get("addressDong") as string,
        ageGroup: formData.get("ageGroup") as string,
        careerLength: formData.get("careerLength") as string,
        jobType: formData.get("jobType") as string,
        preferredServices: preferredServices ? preferredServices.split(",") : [],
      })
      .where(eq(seniorApplications.id, id));
  } catch {
    return {
      status: "error",
      message: "수정 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  revalidatePath("/admin/senior");
  redirect("/admin/senior");
}
