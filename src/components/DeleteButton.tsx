"use client";

export default function DeleteButton({
  action,
  confirmMessage,
}: {
  action: () => Promise<void>;
  confirmMessage: string;
}) {
  return (
    <form action={action}>
      <button
        type="submit"
        onClick={(event) => {
          if (!confirm(confirmMessage)) {
            event.preventDefault();
          }
        }}
        className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        삭제
      </button>
    </form>
  );
}
