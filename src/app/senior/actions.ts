"use server";

import { db } from "@/db";
import { seniorApplications } from "@/db/schema";
import { sendAdminNotification } from "@/lib/resend";

export type SeniorFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitSeniorApplication(
  _prevState: SeniorFormState,
  formData: FormData,
): Promise<SeniorFormState> {
  const preferredServices = (formData.get("preferredServices") as string) ?? "";

  const values = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    addressDong: formData.get("addressDong") as string,
    ageGroup: formData.get("ageGroup") as string,
    careerLength: formData.get("careerLength") as string,
    jobType: formData.get("jobType") as string,
    preferredServices: preferredServices ? preferredServices.split(",") : [],
  };

  try {
    await db.insert(seniorApplications).values(values);
  } catch {
    return {
      status: "error",
      message: "지원 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  await sendAdminNotification(
    `[시니어 지원] ${values.name} 님`,
    `
      <h2>새 시니어 지원서가 접수되었습니다</h2>
      <ul>
        <li>이름: ${values.name}</li>
        <li>전화번호: ${values.phone}</li>
        <li>이메일: ${values.email}</li>
        <li>거주지: ${values.addressDong}</li>
        <li>연령대: ${values.ageGroup}</li>
        <li>워킹맘 재직기간: ${values.careerLength}</li>
        <li>재직시 근무직종: ${values.jobType}</li>
        <li>선호 시터서비스: ${values.preferredServices.join(", ") || "-"}</li>
      </ul>
    `,
  );

  return { status: "success" };
}
