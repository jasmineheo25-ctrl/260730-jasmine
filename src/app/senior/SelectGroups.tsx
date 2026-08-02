"use client";

export function SingleSelectGroup({
  options,
  selected,
  onSelect,
  columns = 4,
}: {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  columns?: number;
}) {
  return (
    <div
      className="mt-3 grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((option) => (
        <button
          type="button"
          key={option}
          onClick={() => onSelect(option)}
          className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
            selected === option
              ? "border-teal-600 bg-teal-50 text-teal-700"
              : "border-zinc-300 text-zinc-600 hover:border-zinc-400"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function MultiSelectGroup({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          type="button"
          key={option}
          onClick={() => onToggle(option)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            selected.includes(option)
              ? "border-teal-600 bg-teal-600 text-white"
              : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
