import { Resend } from "resend";

const ADMIN_NOTIFICATION_EMAIL = "jasmineheo25@gmail.com";
const NOTIFICATION_FROM = "돌봄이음 <onboarding@resend.dev>";

let client: Resend | null = null;

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!client) {
    client = new Resend(apiKey);
  }
  return client;
}

export async function sendAdminNotification(subject: string, html: string) {
  const resend = getClient();
  if (!resend) {
    console.warn("RESEND_API_KEY가 설정되지 않아 알림 이메일을 보내지 않았습니다.");
    return;
  }

  try {
    await resend.emails.send({
      from: NOTIFICATION_FROM,
      to: ADMIN_NOTIFICATION_EMAIL,
      subject,
      html,
    });
  } catch (error) {
    console.error("알림 이메일 발송 실패:", error);
  }
}
