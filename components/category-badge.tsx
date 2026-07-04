import type { AuthorRole, ReportCategory } from "@/lib/data";

const categoryStyles: Record<ReportCategory, string> = {
  実践レポート: "bg-leaf-100 text-leaf-800 border-leaf-300",
  栽培記録: "bg-sky-50 text-sky-800 border-sky-300",
  お知らせ: "bg-amber-50 text-amber-800 border-amber-300",
  質問: "bg-purple-50 text-purple-800 border-purple-300",
};

export function CategoryBadge({ category }: { category: ReportCategory }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[13px] font-bold ${categoryStyles[category]}`}
    >
      {category}
    </span>
  );
}

const roleStyles: Record<AuthorRole, string> = {
  生徒: "bg-leaf-700 text-white",
  先生: "bg-soil-700 text-white",
  部活動: "bg-sky-700 text-white",
  校外: "bg-purple-700 text-white",
};

export function RoleBadge({ role }: { role: AuthorRole }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded px-1.5 py-px text-[11px] font-bold ${roleStyles[role]}`}
    >
      {role}
    </span>
  );
}
