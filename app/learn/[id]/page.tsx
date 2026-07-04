import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  FileCode2,
  JapaneseYen,
  ShieldAlert,
  ShoppingBasket,
} from "lucide-react";
import { LevelBadge } from "@/components/tutorial-card";
import { tutorials } from "@/lib/data";

export function generateStaticParams() {
  return tutorials.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutorial = tutorials.find((t) => t.id === id);
  return {
    title: tutorial
      ? `${tutorial.title} | 西農スマートアグリLab`
      : "教材 | 西農スマートアグリLab",
  };
}

export default async function TutorialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutorial = tutorials.find((t) => t.id === id);
  if (!tutorial) notFound();

  return (
    <div className="space-y-5">
      <Link
        href="/learn"
        className="inline-flex min-h-11 items-center gap-1 rounded-xl pr-3 font-bold text-leaf-700 hover:bg-leaf-50"
      >
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        教材一覧にもどる
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <LevelBadge level={tutorial.level} />
          {tutorial.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-soil-100 px-2.5 py-0.5 text-[13px] font-bold text-soil-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-2 text-2xl font-bold leading-snug">
          {tutorial.title}
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-soil-700">
          {tutorial.summary}
        </p>
        <div className="mt-3 flex gap-2">
          <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-leaf-50 py-2.5 font-bold text-leaf-900">
            <Clock className="h-5 w-5 text-leaf-700" aria-hidden="true" />
            {tutorial.timeRequired}
          </span>
          <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-leaf-50 py-2.5 font-bold text-leaf-900">
            <JapaneseYen className="h-5 w-5 text-leaf-700" aria-hidden="true" />
            {tutorial.cost}
          </span>
        </div>
      </div>

      {/* 部品リスト */}
      <section
        aria-labelledby="parts-heading"
        className="rounded-2xl border border-soil-200 bg-white p-4 shadow-sm"
      >
        <h2
          id="parts-heading"
          className="flex items-center gap-2 text-[17px] font-bold"
        >
          <ShoppingBasket className="h-5 w-5 text-leaf-700" aria-hidden="true" />
          用意するもの
        </h2>
        <ul className="mt-2 divide-y divide-soil-100">
          {tutorial.parts.map((p) => (
            <li key={p.name} className="flex items-center gap-2 py-2.5">
              <span className="flex-1 font-bold">{p.name}</span>
              <span className="text-[14px] text-soil-600">{p.qty}</span>
              <span className="w-24 text-right text-[14px] tabular-nums text-soil-600">
                {p.price}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 手順 */}
      <section aria-labelledby="steps-heading" className="space-y-3">
        <h2 id="steps-heading" className="text-[17px] font-bold">
          作り方
        </h2>
        <ol className="space-y-3">
          {tutorial.steps.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-3 rounded-2xl border border-soil-200 bg-white p-4 shadow-sm"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-leaf-700 text-lg font-bold text-white"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-bold">{step.title}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-soil-700">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* サンプルコード */}
      {tutorial.code && (
        <section aria-labelledby="code-heading">
          <h2
            id="code-heading"
            className="flex items-center gap-2 text-[17px] font-bold"
          >
            <FileCode2 className="h-5 w-5 text-leaf-700" aria-hidden="true" />
            サンプルコード
          </h2>
          <div className="mt-2 overflow-hidden rounded-2xl bg-soil-900 text-soil-50">
            <p className="border-b border-white/10 px-4 py-2 font-mono text-[13px] text-soil-300">
              {tutorial.code.filename}
            </p>
            <div className="overflow-x-auto">
              <pre className="px-4 py-3 font-mono text-[13px] leading-relaxed">
                <code>{tutorial.code.content}</code>
              </pre>
            </div>
          </div>
        </section>
      )}

      {/* 安全上の注意 */}
      <section
        aria-labelledby="caution-heading"
        className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4"
      >
        <h2
          id="caution-heading"
          className="flex items-center gap-2 font-bold text-amber-900"
        >
          <ShieldAlert className="h-5 w-5 text-amber-700" aria-hidden="true" />
          安全のために
        </h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-amber-950">
          {tutorial.cautions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <Link
        href="/post"
        className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-leaf-700 text-lg font-bold text-white shadow-md transition-colors hover:bg-leaf-800 active:bg-leaf-900"
      >
        作ってみた報告・質問はこちら
      </Link>
    </div>
  );
}
