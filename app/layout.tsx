import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";

export const metadata: Metadata = {
  title: "アグリシェア | 農家のための情報共有プラットフォーム",
  description:
    "天気・市況・病害虫情報をひと目で。農家同士でノウハウを共有できるアグリテックプラットフォーム。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="min-h-dvh antialiased">
        <Header />
        {/* 下部ナビに隠れないよう余白を確保した1カラムレイアウト */}
        <main className="mx-auto w-full max-w-lg px-4 pb-28 pt-4">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
