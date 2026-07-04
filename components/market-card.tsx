import { ArrowDownRight, ArrowUpRight, Minus, TrendingUp } from "lucide-react";
import { marketPrices } from "@/lib/data";

function Diff({ value }: { value: number }) {
  if (value > 0) {
    return (
      <span className="flex items-center justify-end gap-0.5 font-bold text-red-700">
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">前日比プラス</span>
        {value}%
      </span>
    );
  }
  if (value < 0) {
    return (
      <span className="flex items-center justify-end gap-0.5 font-bold text-sky-700">
        <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">前日比マイナス</span>
        {value}%
      </span>
    );
  }
  return (
    <span className="flex items-center justify-end gap-0.5 font-bold text-soil-500">
      <Minus className="h-4 w-4" aria-hidden="true" />
      0%
    </span>
  );
}

export function MarketCard() {
  return (
    <section
      aria-labelledby="market-heading"
      className="rounded-2xl border border-soil-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h2
          id="market-heading"
          className="flex items-center gap-2 text-[17px] font-bold"
        >
          <TrendingUp className="h-5 w-5 text-leaf-700" aria-hidden="true" />
          今日の市況
        </h2>
        <span className="text-[13px] text-soil-600">卸売価格・前日比</span>
      </div>

      <ul className="mt-3 divide-y divide-soil-100">
        {marketPrices.map((m) => (
          <li key={m.crop} className="flex items-center py-3">
            <span className="flex-1 font-bold">{m.crop}</span>
            <span className="w-28 text-right tabular-nums">
              <span className="text-xl font-bold">{m.price}</span>
              <span className="text-[13px] text-soil-600">円/{m.unit}</span>
            </span>
            <span className="w-20 text-right text-[14px] tabular-nums">
              <Diff value={m.diff} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
