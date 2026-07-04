import type { Category } from "@/lib/data";

const styles: Record<Category, string> = {
  ノウハウ: "bg-leaf-100 text-leaf-800 border-leaf-300",
  病害虫: "bg-red-50 text-red-800 border-red-300",
  質問: "bg-sky-50 text-sky-800 border-sky-300",
  市況: "bg-amber-50 text-amber-800 border-amber-300",
};

export function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[13px] font-bold ${styles[category]}`}
    >
      {category}
    </span>
  );
}
