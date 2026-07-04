import Link from "next/link";
import { ChevronRight, Clock, JapaneseYen, Wrench } from "lucide-react";
import type { Tutorial, TutorialLevel } from "@/lib/data";

const levelStyles: Record<TutorialLevel, string> = {
  かんたん: "bg-leaf-100 text-leaf-800 border-leaf-300",
  ふつう: "bg-sky-50 text-sky-800 border-sky-300",
  チャレンジ: "bg-amber-50 text-amber-800 border-amber-300",
};

export function LevelBadge({ level }: { level: TutorialLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[13px] font-bold ${levelStyles[level]}`}
    >
      {level}
    </span>
  );
}

export function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <Link
      href={`/learn/${tutorial.id}`}
      className="block rounded-2xl border border-soil-200 bg-white p-4 shadow-sm transition-colors hover:border-leaf-400 active:bg-leaf-50"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex-1 text-[17px] font-bold leading-snug">
          {tutorial.title}
        </h3>
        <ChevronRight
          className="mt-0.5 h-6 w-6 shrink-0 text-leaf-700"
          aria-hidden="true"
        />
      </div>

      <p className="mt-2 text-[14px] leading-relaxed text-soil-700">
        {tutorial.summary}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px] font-bold text-soil-700">
        <LevelBadge level={tutorial.level} />
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4 text-soil-500" aria-hidden="true" />
          {tutorial.timeRequired}
        </span>
        <span className="inline-flex items-center gap-1">
          <JapaneseYen className="h-4 w-4 text-soil-500" aria-hidden="true" />
          {tutorial.cost}
        </span>
        <span className="inline-flex items-center gap-1">
          <Wrench className="h-4 w-4 text-soil-500" aria-hidden="true" />
          部品{tutorial.parts.length}点
        </span>
      </div>
    </Link>
  );
}
