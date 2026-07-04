import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";

export const metadata: Metadata = {
  title: "西農スマートアグリLab | 愛媛県立西条農業高等学校",
  description:
    "西条農業高校のスマート農業実践と、ラズパイを使ったセンサーづくりの教材を日本中に発信するプラットフォーム。",
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
