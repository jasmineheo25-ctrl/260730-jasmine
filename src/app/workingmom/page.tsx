"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { submitWorkingMomRequest, type WorkingMomFormState } from "./actions";

type ServiceType = "emergency" | "short";

const CARE_SCOPE_OPTIONS = ["학교·학원 픽업", "가정돌봄", "숙제지원 및 기타"];

const initialState: WorkingMomFormState = { status: "idle" };

export default function WorkingMomPage() {
  const [serviceType, setServiceType] = useState<ServiceType>("emergency");
  const [careScope, setCareScope] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState(
    submitWorkingMomRequest,
    initialState,
  );

  function toggleScope(option: string) {
    setCareScope((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-1 flex-col bg-zinc-50">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-6 py-24">
          <div className="max-w-md rounded-2xl border border-rose-200 bg-white p-10 text-center shadow-sm">
            <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">
              신청 완료
            </span>
            <h1 className="mt-4 text-2xl font-bold text-zinc-900">
              신청서가 접수되었습니다
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              입력하신 연락처로 담당자가 확인 후 순차적으로 연락드리겠습니다.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-6 py-12 text-center sm:py-16">
          <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">
            돌봄이 필요한 워킹맘
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            믿고 맡길 시터, 지금 신청하세요
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base">
            갑작스러운 야근, 출장, 경조사까지 — 육아 경험이 풍부한 워킹맘 출신 시니어
            시터가 아이를 안전하게 돌봐드립니다.
          </p>
        </section>

        <section className="mx-auto max-w-2xl px-6 pb-20">
          <form
            action={formAction}
            className="space-y-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <input type="hidden" name="serviceType" value={serviceType} />
            <input type="hidden" name="careScope" value={careScope.join(",")} />

            {state.status === "error" && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {state.message}
              </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-zinc-900">
                  신청인 이름 <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="홍길동"
                  className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900">
                  전화번호 <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="010-1234-5678"
                  className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-900">
                  이메일 <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-900">
                  자녀 나이 <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  name="childAge"
                  required
                  placeholder="예: 7세, 10세"
                  className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-900">
                시터 서비스 종류 <span className="text-rose-600">*</span>
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(
                  [
                    { value: "emergency", label: "긴급돌봄" },
                    { value: "short", label: "단기돌봄" },
                  ] as { value: ServiceType; label: string }[]
                ).map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => setServiceType(option.value)}
                    className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
                      serviceType === option.value
                        ? "border-rose-600 bg-rose-50 text-rose-700"
                        : "border-zinc-300 text-zinc-600 hover:border-zinc-400"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {serviceType === "emergency" ? (
              <div className="space-y-6 rounded-xl bg-rose-50/60 p-5">
                <p className="text-sm font-semibold text-rose-700">긴급돌봄 상세 정보</p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-900">
                      희망 날짜 <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-900">
                      희망 시간대 <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="timeRange"
                      required
                      placeholder="예: 오후 6시 ~ 9시"
                      className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                </div>
                <CareScopePicker selected={careScope} onToggle={toggleScope} />
                <div>
                  <label className="block text-sm font-semibold text-zinc-900">
                    돌봄 관련 특이 요청사항
                  </label>
                  <textarea
                    name="specialRequests"
                    rows={3}
                    placeholder="아이의 알레르기, 성향, 주의사항 등을 자유롭게 적어주세요."
                    className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6 rounded-xl bg-rose-50/60 p-5">
                <p className="text-sm font-semibold text-rose-700">단기돌봄 상세 정보</p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-900">
                      시작 날짜 <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-900">
                      돌봄 기간 <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="duration"
                      required
                      placeholder="예: 3일간"
                      className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-zinc-900">
                      희망 시간대 <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="timeRange"
                      required
                      placeholder="예: 매일 오후 3시 ~ 7시"
                      className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                </div>
                <CareScopePicker selected={careScope} onToggle={toggleScope} />
                <div>
                  <label className="block text-sm font-semibold text-zinc-900">
                    돌봄 관련 특이 요청사항
                  </label>
                  <textarea
                    name="specialRequests"
                    rows={3}
                    placeholder="아이의 알레르기, 성향, 주의사항 등을 자유롭게 적어주세요."
                    className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-zinc-900">문의사항</label>
              <textarea
                name="inquiry"
                rows={3}
                placeholder="그 밖에 궁금하신 점을 남겨주세요."
                className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-rose-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "제출 중..." : "신청서 제출하기"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

function CareScopePicker({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-zinc-900">
        돌봄 범위 선택 <span className="text-rose-600">*</span>
      </label>
      <div className="mt-3 flex flex-wrap gap-2">
        {CARE_SCOPE_OPTIONS.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onToggle(option)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selected.includes(option)
                ? "border-rose-600 bg-rose-600 text-white"
                : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
