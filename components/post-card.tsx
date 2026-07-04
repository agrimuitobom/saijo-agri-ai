import { ImageIcon, MessageCircle, ThumbsUp } from "lucide-react";
import type { Report } from "@/lib/data";
import { CategoryBadge, RoleBadge } from "@/components/category-badge";

export function ReportCard({ report }: { report: Report }) {
  return (
    <article className="rounded-2xl border border-soil-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-lg font-bold text-white"
        >
          {report.author.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5">
            <span className="truncate font-bold">{report.author}</span>
            <RoleBadge role={report.role} />
          </p>
          <p className="text-[13px] text-soil-600">{report.time}</p>
        </div>
        <CategoryBadge category={report.category} />
      </div>

      <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed">
        {report.body}
      </p>

      {report.hasPhoto && (
        <div
          role="img"
          aria-label="活動の写真(サンプル)"
          className="mt-3 flex h-44 w-full items-center justify-center rounded-xl bg-gradient-to-br from-leaf-100 to-leaf-300 text-leaf-700"
        >
          <ImageIcon className="h-10 w-10" aria-hidden="true" />
        </div>
      )}

      <div className="mt-3 flex gap-2 border-t border-soil-100 pt-2">
        <button
          type="button"
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl font-bold text-soil-700 transition-colors hover:bg-leaf-50 active:bg-leaf-100"
        >
          <ThumbsUp className="h-5 w-5" aria-hidden="true" />
          応援する
          <span className="text-leaf-700">{report.likes}</span>
        </button>
        <button
          type="button"
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl font-bold text-soil-700 transition-colors hover:bg-leaf-50 active:bg-leaf-100"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          コメント
          <span className="text-leaf-700">{report.comments}</span>
        </button>
      </div>
    </article>
  );
}
