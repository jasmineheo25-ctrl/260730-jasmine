"use server";

import { db } from "@/db";
import { workingMomRequests } from "@/db/schema";
import { sendAdminNotification } from "@/lib/resend";
import { SERVICE_TYPE_OPTIONS } from "./options";

export type WorkingMomFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitWorkingMomRequest(
  _prevState: WorkingMomFormState,
  formData: FormData,
): Promise<WorkingMomFormState> {
  const careScope = (formData.get("careScope") as string) ?? "";

  const values = {
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
  };

  try {
    await db.insert(workingMomRequests).values(values);
  } catch {
    return {
      status: "error",
      message: "신청 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  const serviceTypeLabel =
    SERVICE_TYPE_OPTIONS.find((option) => option.value === values.serviceType)?.label ??
    values.serviceType;

  await sendAdminNotification(
    `[워킹맘 신청] ${values.name} 님`,
    `
      <h2>새 워킹맘 돌봄 신청이 접수되었습니다</h2>
      <ul>
        <li>이름: ${values.name}</li>
        <li>전화번호: ${values.phone}</li>
        <li>이메일: ${values.email}</li>
        <li>자녀 나이: ${values.childAge}</li>
        <li>서비스 종류: ${serviceTypeLabel}</li>
        <li>날짜: ${values.date}${values.duration ? ` (${values.duration})` : ""}</li>
        <li>희망 시간대: ${values.timeRange}</li>
        <li>돌봄 범위: ${values.careScope.join(", ") || "-"}</li>
        <li>특이 요청사항: ${values.specialRequests ?? "-"}</li>
        <li>문의사항: ${values.inquiry ?? "-"}</li>
      </ul>
    `,
  );

  return { status: "success" };
}
