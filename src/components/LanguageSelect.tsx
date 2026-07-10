import { STYLES_BLOCK_HEADER, APP_LANGUAGES } from "../constants.ts";
import { useMyContext } from "../context/AppContext.tsx";
import { useEffect } from "react";

export default function LanguageSelect() {
  const { entries, practiceLanguage, setPracticeLanguage, gatherPracticeRounds } = useMyContext();

  const uniqueLanguageCodes: string[] = [...new Set(entries.map((entry) => entry.language))];
  const uniqueLanguageTitles = uniqueLanguageCodes.map((code) => {
    const lang = Object.values(APP_LANGUAGES).find(([c]) => c === code);
    if (!lang) return code;
    const [, , flag, name] = lang;
    return `${flag} ${name}`;
  });

  useEffect(() => {
    setPracticeLanguage(null);
  }, []);

  return (
    <div className="mx-auto max-w-lg rounded font-mono px-4">
      {/* border border-emerald-500/30 bg-black/40 p-6  */}

      {/* <h2 className="mb-6 text-xl text-emerald-200">Select a language</h2> */}
      <h2 className={`${STYLES_BLOCK_HEADER} text-emerald-400 mb-3`}>SELECT LANGUAGE</h2>

      <div className="text-[12px] italic text-center text-emerald-200/60 opacity-50 hover:opacity-100 transition mb-10">Practice is available only for languages with existing entries.</div>

      <div className="flex flex-col gap-4 mb-9">
        {uniqueLanguageTitles.length > 0 ? (
          uniqueLanguageTitles.map((title) => (
            <button
              key={title}
              onClick={() => {
                const index = uniqueLanguageTitles.indexOf(title);
                setPracticeLanguage(uniqueLanguageCodes[index]);
              }}
              className={`rounded border px-4 py-2 text-left transition ${practiceLanguage === uniqueLanguageCodes[uniqueLanguageTitles.indexOf(title)] ? "border-emerald-400 bg-emerald-500/20 text-emerald-100" : "border-emerald-500/30 bg-emerald-900/10 text-emerald-100 hover:bg-emerald-500/10"}`}
            >
              {title}
            </button>
          ))
        ) : (
          <div className="text-center text-emerald-400 leading-loose">
            Nothing to review at the moment. <br /> Add entries to enable practice.
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        {uniqueLanguageTitles.length > 0 && (
          <button disabled={!practiceLanguage} title={!practiceLanguage ? "Please select a language first" : ""} onClick={() => gatherPracticeRounds()} className="rounded border border-emerald-500/40 bg-emerald-500/10 px-5 py-2 text-emerald-100 transition hover:bg-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed">
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
