import { APP_LOCAL_STORAGE_LAST_PRACTICED } from "../constants.ts";
import { useEffect, useState } from "react";
import { useMyContext } from "../context/AppContext.tsx";

export default function Calendar() {
  const { entries } = useMyContext();
  const [practiceDays, setPracticeDays] = useState<string[]>([]);

  useEffect(() => {
    // pull practice days from LS
    const saved = localStorage.getItem(APP_LOCAL_STORAGE_LAST_PRACTICED);
    setPracticeDays(saved ? JSON.parse(saved) : []);
  }, [entries]);

  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth(); // zero-based

  const today: number = new Date().getDate();

  const lastPracticeDay: string | null = practiceDays.at(-1) ?? null; // take either last el or null
  const lastPracticedDaysAgo: number | null = lastPracticeDay === null ? null : getDifferenceInDays(lastPracticeDay);

  // Last day of current month
  const daysInMonth: number = new Date(year, month + 1, 0).getDate();

  // Day of week when month starts (0 = Sunday)
  const firstDayOffset: number = new Date(year, month, 1).getDay();

  const calendarDays: number[] = [...Array(firstDayOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const todayStyles: string = `border border-emerald-600 text-emerald-100 shadow-[inset_0_0_12px_rgba(110,231,183,0.94)]`;
  const practicedDayStyles: string = `bg-emerald-700/50 text-emerald-100`;
  const todayPracticedStyles: string = `bg-emerald-700/60 border border-emerald-200 text-white shadow-[0_0_10px_rgba(110,231,183,0.5)]`;

  // ============================================================================

  return (
    <div className="w-72 bg-black/80 backdrop-blur-md border border-emerald-800 rounded p-4 pb-6 font-mono text-emerald-400 shadow-lg shadow-emerald-900/20">
      <h2 className={`mb-3 text-emerald-200 ${lastPracticedDaysAgo === null ? "text-[13px]" : "text-sm"}`}>
        <span className="font-bold">Last practiced:</span>{" "}
        <span className="text-emerald-400">
          {lastPracticedDaysAgo === null && "None recorded"}
          {lastPracticedDaysAgo === 0 && "Today"}
          {lastPracticedDaysAgo === 1 && "Yesterday"}
          {lastPracticedDaysAgo !== null && lastPracticedDaysAgo > 1 && `${lastPracticedDaysAgo} days ago`}
        </span>
      </h2>

      <h3 className="text-center text-sm uppercase tracking-widest mb-4 text-emerald-300">
        {now.toLocaleString("default", {
          month: "long",
        })}{" "}
        '{year.toString().slice(2)}
      </h3>

      <div className="flex flex-wrap border-t border-l border-emerald-900">
        {calendarDays.map((day, index) => {
          const isToday: boolean = day === today;
          const dayFullDate: string = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isPracticeDay: boolean = practiceDays.includes(dayFullDate);
          const isTodayAndPracticed: boolean = isToday && isPracticeDay;
          return (
            <div title={isTodayAndPracticed ? "Today practiced" : isToday ? "Today" : isPracticeDay ? "Practice day" : ""} key={index} className={`w-[14.285%] aspect-square flex items-center justify-center text-sm border-r border-b border-emerald-900/70 hover:opacity-80 transition ${isToday && !isTodayAndPracticed && todayStyles} ${isPracticeDay && !isTodayAndPracticed && practicedDayStyles} ${isTodayAndPracticed && todayPracticedStyles}`}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================

function getDifferenceInDays(dateString: string): number {
  const now = new Date();

  const targetDate = new Date(dateString);
  // set the stored date to midnight to avoid partial-day issues
  targetDate.setHours(0, 0, 0, 0);

  // calc timestamp
  const difference = now.getTime() - targetDate.getTime();

  const millisecondsInDay = 1000 * 60 * 60 * 24;

  return Math.floor(difference / millisecondsInDay);
}
