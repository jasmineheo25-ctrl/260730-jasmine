"use server";

import { db } from "@/db";
import { seniorApplications } from "@/db/schema";

export type SeniorFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitSeniorApplication(
  _prevState: SeniorFormState,
  formData: FormData,
): Promise<SeniorFormState> {
  const preferredServices = (formData.get("preferredServices") as string) ?? "";

  try {
    await db.insert(seniorApplications).values({
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      addressDong: formData.get("addressDong") as string,
      ageGroup: formData.get("ageGroup") as string,
      careerLength: formData.get("careerLength") as string,
      jobType: formData.get("jobType") as string,
      preferredServices: preferredServices ? preferredServices.split(",") : [],
    });
  } catch {
    return {
      status: "error",
      message: "지원 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  return { status: "success" };
}
