import Link from "next/link";
import {
  ChevronRight,
  CircuitBoard,
  FlaskConical,
  MapPin,
  ScanSearch,
} from "lucide-react";
import { SensorCard } from "@/components/sensor-card";
import { TutorialCard } from "@/components/tutorial-card";
import { ReportCard } from "@/components/post-card";
import { reports, tutorials } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="space-y-5">
      {/* ヒーロー */}
      <section className="rounded-2xl border border-soil-200 bg-white p-5 shadow-sm">
        <p className="flex items-center gap-1.5 text-[13px] font-bold text-leaf-700">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          愛媛県西条市から、日本中へ
        </p>
        <h1 className="mt-1 text-2xl font-bold leading-snug">
          高校生がつくる、
          <br />
          スマート農業のリアル。
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-soil-700">
          西条農業高校の実践レポートと、ラズパイでできるセンサーづくりの教材を無料で公開しています。全国の農業高校・農家のみなさん、一緒にやりましょう!
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { value: `${tutorials.length}本`, label: "公開教材" },
            { value: "48件", label: "実践レポート" },
            { value: "23県", label: "からアクセス" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-leaf-50 py-2.5">
              <p className="text-xl font-bold text-leaf-800">{s.value}</p>
              <p className="text-[12px] font-bold text-soil-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <SensorCard />

      {/* 注目の教材 */}
      <section aria-labelledby="tutorial-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2
            id="tutorial-heading"
            className="flex items-center gap-2 text-[17px] font-bold"
          >
            <CircuitBoard className="h-5 w-5 text-leaf-700" aria-hidden="true" />
            人気の教材
          </h2>
          <Link
            href="/learn"
            className="flex min-h-11 items-center gap-1 rounded-xl px-2 font-bold text-leaf-700 hover:bg-leaf-50"
          >
            すべて見る
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
        <TutorialCard tutorial={tutorials[0]} />
      </section>

      {/* PLANTDOC の紹介 */}
      <section
        aria-labelledby="plantdoc-heading"
        className="flex items-start gap-3 rounded-2xl border-2 border-leaf-300 bg-leaf-50 p-4"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-leaf-700 text-white">
          <ScanSearch className="h-7 w-7" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 id="plantdoc-heading" className="font-bold text-leaf-900">
            AI病害虫診断「西農PLANTDOC」
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-leaf-700">
              <FlaskConical className="h-3 w-3" aria-hidden="true" />
              本校開発
            </span>
          </h2>
          <p className="mt-1 text-[14px] leading-relaxed text-soil-700">
            作物の写真を撮るだけで、AIが病害虫の可能性を診断する本校開発のアプリ。授業・実習で活用中です(近日このサイトからも利用できるようにします)。
          </p>
        </div>
      </section>

      {/* 最新の活動 */}
      <section aria-labelledby="recent-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="recent-heading" className="text-[17px] font-bold">
            最新の活動記録
          </h2>
          <Link
            href="/reports"
            className="flex min-h-11 items-center gap-1 rounded-xl px-2 font-bold text-leaf-700 hover:bg-leaf-50"
          >
            すべて見る
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
        {reports.slice(0, 2).map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </section>
    </div>
  );
}
