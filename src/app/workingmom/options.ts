export type ServiceType = "emergency" | "short";

export const SERVICE_TYPE_OPTIONS: { value: ServiceType; label: string }[] = [
  { value: "emergency", label: "긴급돌봄" },
  { value: "short", label: "단기돌봄" },
];

export const CARE_SCOPE_OPTIONS = ["학교·학원 픽업", "가정돌봄", "숙제지원 및 기타"];
