import { STYLES_BLOCK_HEADER } from "../constants.ts";
import { useMyContext } from "../context/AppContext.tsx";
import { useEffect, useState } from "react";

export default function NoPractice() {
  const { entries, practiceLanguage } = useMyContext();
  const [now, setNow] = useState("");

  const nextPracticeEntry = entries
    .filter((entry) => entry.language === practiceLanguage)
    .filter((entry) => entry.nextPractice)
    .sort((a, b) => a.nextPractice! - b.nextPractice!)[0];

  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const nextPracticeWhen = new Date(nextPracticeEntry.nextPractice!).toLocaleString("en-UK", timeFormatOptions);

  // recalc 'now' every minute
  useEffect(() => {
    const updateNow = () => {
      setNow(new Date().toLocaleString("en-UK", timeFormatOptions));
    };

    updateNow();

    const timer = setInterval(updateNow, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto flex flex-col items-center text-center font-mono px-4">
      <h1 className={`${STYLES_BLOCK_HEADER} text-emerald-400 uppercase mb-9`}>No Practice for Now</h1>

      <p className="sm:leading-8 leading-6 text-emerald-200/100 mb-12 text-sm sm:text-md">
        All available entries in the selected language have already been reviewed. <br /> Add new words to continue practicing now, or return when your next review is due.
      </p>

      <div className="w-full max-w-md rounded-xl border border-emerald-500/20 bg-emerald-900/10 p-6 shadow-[0_0_30px_rgba(16,185,129,0.08)] backdrop-blur-sm">
        <div className="text-xs uppercase tracking-[0.3em] text-emerald-400/70">Next Practice:</div>

        <div className="mt-3 text-2xl font-medium text-emerald-100">{nextPracticeWhen}</div>

        <div className="mt-6 border-t border-emerald-500/20 pt-4 transition opacity-60 hover:opacity-100">
          <div className="text-xs uppercase tracking-[0.3em] text-emerald-400/70">Currently:</div>

          <div className="mt-3 text-lg font-medium text-emerald-100">{now}</div>
        </div>
      </div>
    </div>
  );
}
