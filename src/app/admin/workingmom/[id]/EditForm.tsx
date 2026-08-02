"use client";

import { useActionState, useState } from "react";
import {
  CARE_SCOPE_OPTIONS,
  SERVICE_TYPE_OPTIONS,
  type ServiceType,
} from "@/app/workingmom/options";
import { updateWorkingMomRequest, type WorkingMomEditState } from "../actions";

type WorkingMomRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  childAge: string;
  serviceType: string;
  date: string;
  duration: string | null;
  timeRange: string;
  careScope: string[];
  specialRequests: string | null;
  inquiry: string | null;
};

const initialState: WorkingMomEditState = { status: "idle" };

export default function EditForm({ row }: { row: WorkingMomRow }) {
  const [serviceType, setServiceType] = useState<ServiceType>(
    row.serviceType as ServiceType,
  );
  const [careScope, setCareScope] = useState<string[]>(row.careScope);
  const updateAction = updateWorkingMomRequest.bind(null, row.id);
  const [state, formAction, isPending] = useActionState(updateAction, initialState);

  function toggleScope(option: string) {
    setCareScope((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );
  }

  return (
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
            defaultValue={row.name}
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
            defaultValue={row.phone}
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
            defaultValue={row.email}
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
            defaultValue={row.childAge}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-zinc-900">
          시터 서비스 종류 <span className="text-rose-600">*</span>
        </label>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {SERVICE_TYPE_OPTIONS.map((option) => (
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

      <div className="space-y-6 rounded-xl bg-rose-50/60 p-5">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-zinc-900">
              {serviceType === "emergency" ? "희망 날짜" : "시작 날짜"}{" "}
              <span className="text-rose-600">*</span>
            </label>
            <input
              type="date"
              name="date"
              required
              defaultValue={row.date}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
          {serviceType === "short" && (
            <div>
              <label className="block text-sm font-semibold text-zinc-900">
                돌봄 기간 <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                name="duration"
                required
                defaultValue={row.duration ?? ""}
                placeholder="예: 3일간"
                className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          )}
          <div className={serviceType === "short" ? "sm:col-span-2" : ""}>
            <label className="block text-sm font-semibold text-zinc-900">
              희망 시간대 <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              name="timeRange"
              required
              defaultValue={row.timeRange}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-900">
            돌봄 범위 선택 <span className="text-rose-600">*</span>
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {CARE_SCOPE_OPTIONS.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => toggleScope(option)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  careScope.includes(option)
                    ? "border-rose-600 bg-rose-600 text-white"
                    : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-zinc-900">
            돌봄 관련 특이 요청사항
          </label>
          <textarea
            name="specialRequests"
            rows={3}
            defaultValue={row.specialRequests ?? ""}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-zinc-900">문의사항</label>
        <textarea
          name="inquiry"
          rows={3}
          defaultValue={row.inquiry ?? ""}
          className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-rose-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "저장 중..." : "변경사항 저장"}
      </button>
    </form>
  );
}
