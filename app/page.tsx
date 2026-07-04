import Link from "next/link";
import { ChevronRight, TriangleAlert } from "lucide-react";
import { WeatherCard } from "@/components/weather-card";
import { MarketCard } from "@/components/market-card";
import { PostCard } from "@/components/post-card";
import { posts } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">おはようございます 🌱</h1>
        <p className="mt-1 text-[15px] text-soil-600">
          今日も安全に、良い一日を。
        </p>
      </div>

      <WeatherCard />

      {/* 病害虫アラート */}
      <Link
        href="/timeline"
        className="flex items-center gap-3 rounded-2xl border-2 border-red-300 bg-red-50 p-4 transition-colors hover:bg-red-100"
      >
        <TriangleAlert
          className="h-8 w-8 shrink-0 text-red-700"
          aria-hidden="true"
        />
        <span className="flex-1">
          <span className="block font-bold text-red-800">
            病害虫注意報が出ています
          </span>
          <span className="block text-[14px] text-red-900/80">
            トマト葉かび病の報告が近隣で3件。投稿を確認する
          </span>
        </span>
        <ChevronRight className="h-6 w-6 shrink-0 text-red-700" aria-hidden="true" />
      </Link>

      <MarketCard />

      <section aria-labelledby="recent-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="recent-heading" className="text-[17px] font-bold">
            みんなの最新投稿
          </h2>
          <Link
            href="/timeline"
            className="flex min-h-11 items-center gap-1 rounded-xl px-2 font-bold text-leaf-700 hover:bg-leaf-50"
          >
            すべて見る
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
        {posts.slice(0, 2).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
