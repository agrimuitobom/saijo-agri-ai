import { CheckCircle2, Cpu, TriangleAlert } from "lucide-react";
import { sensorReadings, type SensorStatus } from "@/lib/data";

function StatusChip({ status, note }: { status: SensorStatus; note: string }) {
  if (status === "注意") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[12px] font-bold text-amber-200">
        <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
        注意・{note}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-leaf-400/20 px-2 py-0.5 text-[12px] font-bold text-leaf-200">
      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
      適正・{note}
    </span>
  );
}

export function SensorCard() {
  return (
    <section
      aria-labelledby="sensor-heading"
      className="rounded-2xl bg-gradient-to-br from-leaf-800 to-leaf-900 p-5 text-white shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <h2
          id="sensor-heading"
          className="flex items-center gap-2 text-[15px] font-bold text-leaf-100"
        >
          <Cpu className="h-5 w-5" aria-hidden="true" />
          トマトハウス3号 いまの環境
        </h2>
        <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[12px] font-bold">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
          </span>
          LIVE
        </span>
      </div>
      <p className="mt-1 text-[12px] text-leaf-200">
        校内のRaspberry Piセンサーが5分ごとに計測(3分前 更新)
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-2">
        {sensorReadings.map((s) => (
          <div key={s.id} className="rounded-xl bg-white/10 p-3">
            <dt className="text-[13px] text-leaf-100">{s.label}</dt>
            <dd className="mt-0.5">
              <span className="text-3xl font-semibold tabular-nums">
                {s.value}
              </span>
              <span className="ml-0.5 text-[14px] text-leaf-100">{s.unit}</span>
            </dd>
            <dd className="mt-1.5">
              <StatusChip status={s.status} note={s.note} />
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 rounded-xl bg-white/10 px-3 py-2 text-[13px] leading-relaxed text-leaf-50">
        この仕組みは生徒の手づくりです。作り方は「つくる」ページで全部公開しています。
      </p>
    </section>
  );
}
