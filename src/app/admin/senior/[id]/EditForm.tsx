"use client";

import { useActionState, useState } from "react";
import {
  AGE_GROUP_OPTIONS,
  CAREER_LENGTH_OPTIONS,
  JOB_TYPE_OPTIONS,
  PREFERRED_SERVICE_OPTIONS,
} from "@/app/senior/options";
import { MultiSelectGroup, SingleSelectGroup } from "@/app/senior/SelectGroups";
import { updateSeniorApplication, type SeniorEditState } from "../actions";

type SeniorRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  addressDong: string;
  ageGroup: string;
  careerLength: string;
  jobType: string;
  preferredServices: string[];
};

const initialState: SeniorEditState = { status: "idle" };

export default function EditForm({ row }: { row: SeniorRow }) {
  const [ageGroup, setAgeGroup] = useState<string | null>(row.ageGroup);
  const [careerLength, setCareerLength] = useState<string | null>(row.careerLength);
  const [jobType, setJobType] = useState<string | null>(row.jobType);
  const [preferredServices, setPreferredServices] = useState<string[]>(
    row.preferredServices,
  );
  const updateAction = updateSeniorApplication.bind(null, row.id);
  const [state, formAction, isPending] = useActionState(updateAction, initialState);

  function togglePreferredService(option: string) {
    setPreferredServices((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <input type="hidden" name="ageGroup" value={ageGroup ?? ""} />
      <input type="hidden" name="careerLength" value={careerLength ?? ""} />
      <input type="hidden" name="jobType" value={jobType ?? ""} />
      <input type="hidden" name="preferredServices" value={preferredServices.join(",")} />

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
            defaultValue={row.name}
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
            defaultValue={row.phone}
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
            defaultValue={row.email}
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
            defaultValue={row.addressDong}
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
        {isPending ? "저장 중..." : "변경사항 저장"}
      </button>
    </form>
  );
}
