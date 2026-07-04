import { Bell, Sprout } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-leaf-800/20 bg-leaf-800 text-white shadow-sm">
      <div className="mx-auto flex h-14 w-full max-w-lg items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sprout className="h-6 w-6 text-leaf-200" aria-hidden="true" />
          <span className="text-lg font-bold tracking-wide">アグリシェア</span>
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
