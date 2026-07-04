import { ImageIcon, MapPin, MessageCircle, ThumbsUp } from "lucide-react";
import type { Post } from "@/lib/data";
import { CategoryBadge } from "@/components/category-badge";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-2xl border border-soil-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-lg font-bold text-white"
        >
          {post.author.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold">{post.author}</p>
          <p className="flex items-center gap-1 text-[13px] text-soil-600">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {post.region}・{post.crop}・{post.time}
          </p>
        </div>
        <CategoryBadge category={post.category} />
      </div>

      <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed">
        {post.body}
      </p>

      {post.hasPhoto && (
        <div
          role="img"
          aria-label="投稿された写真(サンプル)"
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
          参考になった
          <span className="text-leaf-700">{post.likes}</span>
        </button>
        <button
          type="button"
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl font-bold text-soil-700 transition-colors hover:bg-leaf-50 active:bg-leaf-100"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          コメント
          <span className="text-leaf-700">{post.comments}</span>
        </button>
      </div>
    </article>
  );
}
