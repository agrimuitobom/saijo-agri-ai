"use client";

import { useRef, useState } from "react";
import { Camera, CheckCircle2, Send, X } from "lucide-react";
import type { ReportCategory } from "@/lib/data";

const categories: ReportCategory[] = [
  "実践レポート",
  "栽培記録",
  "お知らせ",
  "質問",
];

export default function NewPostPage() {
  const [category, setCategory] = useState<ReportCategory>("実践レポート");
  const [body, setBody] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    setPhotos((prev) => [...prev, ...Array.from(files).map((f) => f.name)]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // モック: 実際のAPI送信は未実装
    setSubmitted(true);
    setBody("");
    setPhotos([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">投稿する</h1>
        <p className="mt-1 text-[15px] leading-relaxed text-soil-600">
          活動の報告や、教材についての質問をどうぞ。校外のみなさんの「作ってみた」報告も大歓迎です。
        </p>
      </div>

      {submitted && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-2xl border-2 border-leaf-300 bg-leaf-50 p-4"
        >
          <CheckCircle2
            className="h-7 w-7 shrink-0 text-leaf-700"
            aria-hidden="true"
          />
          <p className="flex-1 font-bold text-leaf-800">
            投稿しました!(デモのため実際には送信されません)
          </p>
          <button
            type="button"
            aria-label="このお知らせを閉じる"
            onClick={() => setSubmitted(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-leaf-700 hover:bg-leaf-100"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <fieldset>
          <legend className="mb-2 font-bold">カテゴリを選ぶ</legend>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={`min-h-12 rounded-xl border-2 text-[15px] font-bold transition-colors ${
                    active
                      ? "border-leaf-700 bg-leaf-700 text-white"
                      : "border-soil-300 bg-white text-soil-700 hover:border-leaf-500"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="post-body" className="mb-2 block font-bold">
            本文
          </label>
          <textarea
            id="post-body"
            required
            rows={7}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="例:土壌水分センサーを自分の学校でも作ってみました。DRY/WETの調整で質問があります…"
            className="w-full rounded-2xl border-2 border-soil-300 bg-white p-4 text-[16px] leading-relaxed placeholder:text-soil-400 focus:border-leaf-600"
          />
        </div>

        <div>
          <span className="mb-2 block font-bold">写真(あとから追加もOK)</span>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            className="sr-only"
            aria-label="写真を選択"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="flex min-h-24 w-full flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-leaf-500 bg-leaf-50 font-bold text-leaf-800 transition-colors hover:bg-leaf-100 active:bg-leaf-200"
          >
            <Camera className="h-8 w-8" aria-hidden="true" />
            写真を撮る・選ぶ
          </button>
          {photos.length > 0 && (
            <ul className="mt-2 space-y-1 text-[14px] text-soil-700">
              {photos.map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  className="flex items-center justify-between rounded-xl bg-soil-100 px-3 py-2"
                >
                  <span className="truncate">📷 {name}</span>
                  <button
                    type="button"
                    aria-label={`${name} を削除`}
                    onClick={() =>
                      setPhotos((prev) => prev.filter((_, j) => j !== i))
                    }
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-soil-600 hover:bg-soil-200"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-leaf-700 text-lg font-bold text-white shadow-md transition-colors hover:bg-leaf-800 active:bg-leaf-900"
        >
          <Send className="h-5 w-5" aria-hidden="true" />
          この内容で投稿する
        </button>
      </form>
    </div>
  );
}
