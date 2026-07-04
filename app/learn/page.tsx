import { GraduationCap } from "lucide-react";
import { TutorialCard } from "@/components/tutorial-card";
import { tutorials } from "@/lib/data";

export const metadata = {
  title: "つくる — 教材一覧 | 西農スマートアグリLab",
};

export default function LearnPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">つくる</h1>
        <p className="mt-1 text-[15px] leading-relaxed text-soil-600">
          西農の授業・実習で使っているセンサーづくり教材を、部品リスト・手順・コードまでまるごと公開。だれでも自由に使えます。
        </p>
      </div>

      <div className="flex items-start gap-2.5 rounded-2xl bg-leaf-50 p-4 text-[14px] leading-relaxed text-leaf-900">
        <GraduationCap
          className="mt-0.5 h-5 w-5 shrink-0 text-leaf-700"
          aria-hidden="true"
        />
        <p>
          初めての方は<strong>「かんたん」</strong>
          から。学校の授業で使う場合の相談も歓迎です(投稿ページからどうぞ)。
        </p>
      </div>

      <div className="space-y-3">
        {tutorials.map((t) => (
          <TutorialCard key={t.id} tutorial={t} />
        ))}
      </div>
    </div>
  );
}
