import { Cloud, Droplets, Sun, Wind } from "lucide-react";
import { hourlyWeather } from "@/lib/data";

export function WeatherCard() {
  return (
    <section
      aria-labelledby="weather-heading"
      className="rounded-2xl bg-gradient-to-br from-leaf-700 to-leaf-900 p-5 text-white shadow-md"
    >
      <div className="flex items-center justify-between">
        <h2 id="weather-heading" className="text-[15px] font-bold text-leaf-100">
          今日の天気 <span className="font-normal">— 西条市</span>
        </h2>
        <span className="rounded-full bg-white/15 px-3 py-1 text-[13px] font-bold">
          7月4日(土)
        </span>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <Sun className="h-14 w-14 text-amber-300" aria-hidden="true" />
        <div>
          <p className="text-4xl font-bold leading-none">
            31<span className="text-xl">°C</span>
          </p>
          <p className="mt-1 text-[15px] text-leaf-100">晴れのち くもり</p>
        </div>
        <dl className="ml-auto space-y-1 text-[14px]">
          <div className="flex items-center gap-1.5">
            <dt>
              <Droplets className="h-4 w-4 text-sky-300" aria-hidden="true" />
              <span className="sr-only">降水確率</span>
            </dt>
            <dd className="font-bold">10%</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt>
              <Wind className="h-4 w-4 text-leaf-200" aria-hidden="true" />
              <span className="sr-only">風速</span>
            </dt>
            <dd className="font-bold">2m/s</dd>
          </div>
        </dl>
      </div>

      <ul className="mt-4 grid grid-cols-4 gap-2">
        {hourlyWeather.map((h) => (
          <li
            key={h.time}
            className="flex flex-col items-center rounded-xl bg-white/10 py-2 text-[14px]"
          >
            <span>{h.time}</span>
            {h.icon === "sun" ? (
              <Sun className="my-1 h-5 w-5 text-amber-300" aria-label="晴れ" />
            ) : (
              <Cloud className="my-1 h-5 w-5 text-leaf-100" aria-label="くもり" />
            )}
            <span className="font-bold">{h.temp}°</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 rounded-xl bg-white/10 px-3 py-2 text-[14px] leading-relaxed">
        <span className="font-bold text-amber-200">作業メモ:</span>{" "}
        日中は真夏日。水やり・防除は朝夕の涼しい時間帯がおすすめです。
      </p>
    </section>
  );
}
