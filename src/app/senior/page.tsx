"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { submitSeniorApplication, type SeniorFormState } from "./actions";
import {
  AGE_GROUP_OPTIONS,
  CAREER_LENGTH_OPTIONS,
  JOB_TYPE_OPTIONS,
  PREFERRED_SERVICE_OPTIONS,
} from "./options";
import { MultiSelectGroup, SingleSelectGroup } from "./SelectGroups";

const initialState: SeniorFormState = { status: "idle" };

export default function SeniorPage() {
  const [ageGroup, setAgeGroup] = useState<string | null>(null);
  const [careerLength, setCareerLength] = useState<string | null>(null);
  const [jobType, setJobType] = useState<string | null>(null);
  const [preferredServices, setPreferredServices] = useState<string[]>([]);
  const [state, formAction, isPending] = useActionState(
    submitSeniorApplication,
    initialState,
  );

  function togglePreferredService(option: string) {
    setPreferredServices((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-1 flex-col bg-zinc-50">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-6 py-24">
          <div className="max-w-md rounded-2xl border border-teal-200 bg-white p-10 text-center shadow-sm">
            <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
              지원 완료
            </span>
            <h1 className="mt-4 text-2xl font-bold text-zinc-900">
              지원서가 접수되었습니다
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
          <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
            워킹맘 출신 시니어
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            육아 경력을 다시, 자유로운 시간에 일로
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base">
            1~2시간의 짧은 돌봄부터 며칠간의 단기 돌봄까지, 원하는 시간만큼만 일할 수
            있는 긱 일자리를 소개해 드립니다.
          </p>
        </section>

        <section className="mx-auto max-w-2xl px-6 pb-20">
          <form
            action={formAction}
            className="space-y-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <input type="hidden" name="ageGroup" value={ageGroup ?? ""} />
            <input type="hidden" name="careerLength" value={careerLength ?? ""} />
            <input type="hidden" name="jobType" value={jobType ?? ""} />
            <input
              type="hidden"
              name="preferredServices"
              value={preferredServices.join(",")}
            />

            {state.status === "error" && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {state.message}
              </p>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-zinc-900">
                  이름 <span className="text-teal-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="홍길동"
                  className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-900">
                  전화번호 <span className="text-teal-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="010-1234-5678"
                  className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-900">
                  이메일 <span className="text-teal-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-zinc-900">
                  거주지 (거주 동) <span className="text-teal-600">*</span>
                </label>
                <input
                  type="text"
                  name="addressDong"
                  required
                  placeholder="예: 서울시 강남구 역삼동"
                  className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-900">
                연령대 <span className="text-teal-600">*</span>
              </label>
              <SingleSelectGroup
                options={AGE_GROUP_OPTIONS}
                selected={ageGroup}
                onSelect={setAgeGroup}
                columns={4}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-900">
                워킹맘 재직기간 <span className="text-teal-600">*</span>
              </label>
              <SingleSelectGroup
                options={CAREER_LENGTH_OPTIONS}
                selected={careerLength}
                onSelect={setCareerLength}
                columns={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-900">
                워킹맘 재직시 근무직종 <span className="text-teal-600">*</span>
              </label>
              <SingleSelectGroup
                options={JOB_TYPE_OPTIONS}
                selected={jobType}
                onSelect={setJobType}
                columns={3}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-900">
                선호 시터서비스 (중복 선택 가능) <span className="text-teal-600">*</span>
              </label>
              <MultiSelectGroup
                options={PREFERRED_SERVICE_OPTIONS}
                selected={preferredServices}
                onToggle={togglePreferredService}
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-teal-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "제출 중..." : "지원서 제출하기"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
