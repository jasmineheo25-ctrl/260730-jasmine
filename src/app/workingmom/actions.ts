"use server";

import { db } from "@/db";
import { workingMomRequests } from "@/db/schema";

export type WorkingMomFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitWorkingMomRequest(
  _prevState: WorkingMomFormState,
  formData: FormData,
): Promise<WorkingMomFormState> {
  const careScope = (formData.get("careScope") as string) ?? "";

  try {
    await db.insert(workingMomRequests).values({
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
    });
  } catch {
    return {
      status: "error",
      message: "신청 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  return { status: "success" };
}
