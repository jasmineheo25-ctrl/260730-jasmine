import type { Metadata } from "next";
import AdminNav from "@/components/AdminNav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <AdminNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
