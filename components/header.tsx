import { Bell, Sprout } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-leaf-800/20 bg-leaf-800 text-white shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-lg items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Sprout className="h-6 w-6 text-leaf-200" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-[17px] font-bold tracking-wide">
              西農スマートアグリLab
            </p>
            <p className="text-[11px] text-leaf-200">
              愛媛県立西条農業高等学校
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="お知らせを開く(未読2件)"
          className="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-leaf-700 active:bg-leaf-600"
        >
          <Bell className="h-6 w-6" aria-hidden="true" />
          <span
            className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-harvest-500 ring-2 ring-leaf-800"
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}
