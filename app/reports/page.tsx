"use client";

import { useState } from "react";
import { ReportCard } from "@/components/post-card";
import { reports, type ReportCategory } from "@/lib/data";

const filters = [
  "すべて",
  "実践レポート",
  "栽培記録",
  "お知らせ",
  "質問",
] as const;
type Filter = (typeof filters)[number];

export default function ReportsPage() {
  const [filter, setFilter] = useState<Filter>("すべて");

  const visible =
    filter === "すべて"
      ? reports
      : reports.filter((r) => r.category === (filter as ReportCategory));

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">活動記録</h1>
        <p className="mt-1 text-[15px] leading-relaxed text-soil-600">
          西農の日々の実践と、全国のみなさんからの報告・質問。
        </p>
      </div>

      <div
        role="group"
        aria-label="カテゴリで絞り込む"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1"
      >
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`min-h-11 shrink-0 rounded-full border-2 px-5 font-bold transition-colors ${
                active
                  ? "border-leaf-700 bg-leaf-700 text-white"
                  : "border-soil-300 bg-white text-soil-700 hover:border-leaf-500"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="space-y-3" aria-live="polite">
        {visible.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
        {visible.length === 0 && (
          <p className="rounded-2xl border border-soil-200 bg-white p-6 text-center text-soil-600">
            このカテゴリの投稿はまだありません。
          </p>
        )}
      </div>
    </div>
  );
}
