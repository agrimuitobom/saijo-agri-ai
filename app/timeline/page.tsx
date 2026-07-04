"use client";

import { useState } from "react";
import { PostCard } from "@/components/post-card";
import { posts, type Category } from "@/lib/data";

const filters = ["すべて", "ノウハウ", "病害虫", "質問", "市況"] as const;
type Filter = (typeof filters)[number];

export default function TimelinePage() {
  const [filter, setFilter] = useState<Filter>("すべて");

  const visible =
    filter === "すべて"
      ? posts
      : posts.filter((p) => p.category === (filter as Category));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">みんなの広場</h1>
      <p className="-mt-2 text-[15px] text-soil-600">
        近隣の農家のノウハウ・病害虫情報をチェックしましょう。
      </p>

      {/* カテゴリ絞り込み(横スクロール可の大きなチップ) */}
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
        {visible.map((post) => (
          <PostCard key={post.id} post={post} />
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
