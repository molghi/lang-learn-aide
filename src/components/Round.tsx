import { useMyContext } from "../context/AppContext.tsx";
import { useState, useEffect, useRef } from "react";
import { APP_LANGUAGES } from "../constants.ts";
import type { Entry } from "../context/AppContext.tsx";

type RoundProps = {
  roundData: Entry;
};

export default function Round({ roundData }: RoundProps) {
  const { practiceLanguage, currentRound, practiceEntries, setCurrentRound, setUserInputs } = useMyContext();
  const [roundInput, setRoundInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activeLanguageEntry = Object.values(APP_LANGUAGES).find((entry) => entry[0] === practiceLanguage);

  const progress = practiceEntries?.length && currentRound !== null ? Math.floor(((currentRound + 1) / practiceEntries.length) * 100) : 0;

  useEffect(() => {
    setRoundInput("");
    inputRef.current?.focus();
  }, [currentRound]);

  return (
    <div className="mx-auto max-w-xl font-mono text-emerald-100">
      {/* top progress */}
      <div className="mb-10 flex gap-5 items-center justify-between">
        <span title={activeLanguageEntry && activeLanguageEntry[3]} className="text-3xl">
          {activeLanguageEntry && activeLanguageEntry[2]}
        </span>
        <span className="text-sm text-emerald-200/70">
          Round {typeof currentRound === "number" && currentRound + 1} of {practiceEntries?.length}
        </span>

        <div className="h-1 flex-1 bg-emerald-900/30 rounded">
          <div className="h-1 bg-emerald-400/60 rounded transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* instruction */}
      <div className="mb-7 italic text-lg text-center text-emerald-200/60">Recall what this means:</div>

      {/* word */}
      <div className="mb-10 text-center text-3xl text-emerald-100">{roundData.word}</div>

      {roundData.definition && (
        <div className="text-sm text-emerald-200/70 mb-10">
          <span className="text-emerald-300">Definition:</span> {roundData.definition}
        </div>
      )}
      {roundData.hint && (
        <div className="text-sm text-emerald-200/70 mb-10">
          <span className="text-emerald-300">Hint:</span> {roundData.hint}
        </div>
      )}
      {roundData.tag && (
        <div className="text-sm text-emerald-200/70 mb-10">
          <span className="text-emerald-300">Tag:</span> {roundData.tag}
        </div>
      )}
      {roundData.imageUrl && (
        <div className="text-sm text-emerald-200/70 flex gap-4 mb-14">
          <span className="text-emerald-300">Image:</span>
          <img alt="round img" src={roundData.imageUrl} className="max-w-[300px]" />
        </div>
      )}

      {/* input */}
      <input ref={inputRef} value={roundInput} onChange={(e) => setRoundInput(e.target.value)} autoFocus className="w-full rounded border border-emerald-500/30 bg-black/40 px-3 py-2 text-emerald-100 outline-none focus:border-emerald-400" placeholder="Type your answer..." />

      {/* continue */}
      <div className="mt-10 flex justify-end">
        <button
          disabled={!roundInput}
          onClick={() => {
            setCurrentRound((num) => (num !== null ? num + 1 : null));
            setUserInputs((prev) => {
              if (Array.isArray(prev)) return [...prev, roundInput.trim()];
              else return [roundInput.trim()];
            });
          }}
          className="rounded border border-emerald-500/40 bg-emerald-500/10 px-5 py-2 text-emerald-100 transition hover:bg-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {currentRound && currentRound + 1 === practiceEntries?.length ? "Finish" : "Continue"}
        </button>
      </div>
    </div>
  );
}
