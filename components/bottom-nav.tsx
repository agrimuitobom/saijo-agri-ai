"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessagesSquare, PlusCircle } from "lucide-react";

const items = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/post", label: "投稿する", icon: PlusCircle, primary: true },
  { href: "/timeline", label: "みんなの広場", icon: MessagesSquare },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="メインメニュー"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-soil-200 bg-white/95 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] backdrop-blur"
    >
      <div className="mx-auto grid max-w-lg grid-cols-3 pb-[env(safe-area-inset-bottom)]">
        {items.map(({ href, label, icon: Icon, ...rest }) => {
          const active = pathname === href;
          const primary = "primary" in rest;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[64px] flex-col items-center justify-center gap-0.5 px-2 py-2 text-[13px] font-bold transition-colors ${
                primary
                  ? "text-leaf-700"
                  : active
                    ? "text-leaf-700"
                    : "text-soil-600 hover:text-soil-900"
              }`}
            >
              {primary ? (
                <span className="flex h-9 w-9 -translate-y-0.5 items-center justify-center rounded-full bg-leaf-700 text-white shadow-md">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
              ) : (
                <Icon
                  className="h-7 w-7"
                  strokeWidth={active ? 2.5 : 2}
                  aria-hidden="true"
                />
              )}
              <span>{label}</span>
              {active && !primary && (
                <span
                  className="h-1 w-8 rounded-full bg-leaf-700"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
