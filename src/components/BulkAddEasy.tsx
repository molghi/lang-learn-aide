import { STYLES_GENERAL_BTN, APP_LANGUAGES, STYLES_BLOCK_HEADER } from "../constants.ts";
import { useState } from "react";
import { useMyContext } from "../context/AppContext.tsx";

export default function BulkAddEasy() {
  const { setEntries, setIsNotificationShown, setNotificationContent, setActiveView } = useMyContext();
  const [langSelect, setLangSelect] = useState("");
  const [textareaOne, setTextareaOne] = useState("");
  const [textareaTwo, setTextareaTwo] = useState("");

  // ============================================================================

  function bulkAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // check if forms have equal amount of lines
    const formOneEntries: string[] = textareaOne
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x);
    const formTwoEntries: string[] = textareaTwo
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x);
    const firstIsBigger: boolean = formOneEntries.length > formTwoEntries.length;

    if (formOneEntries.length !== formTwoEntries.length) return alert(`The number of entries and translations must match.\n\n${firstIsBigger ? "You have more entries than translations." : "You have more translations than entries."}`);

    if (!langSelect) return alert("Please select entry language");

    // if all good, make entries
    const now = new Date().toISOString();
    const newEntries = formOneEntries.map((word, index) => ({
      id: crypto.randomUUID(),
      word,
      language: langSelect,
      translation: formTwoEntries[index],
      createdAt: now,
      modifiedAt: now,
    }));
    // append them to 'entries'
    setEntries((prev) => [...prev, ...newEntries]);

    setIsNotificationShown(true);
    setNotificationContent(["success", "Batch added!"]);
    setActiveView("view");
  }

  // ============================================================================

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl font-mono">
      <h1 className={`${STYLES_BLOCK_HEADER} text-emerald-400 uppercase mb-5`}>Bulk Add Entries</h1>

      <h2 className="text-emerald-200 leading-6 mb-8 sm:mb-14 text-center text-sm opacity-50 px-4">
        Input words or phrases in the entry language. <br />
        Add their translations in your comfortable language.
      </h2>

      <form onSubmit={(e) => bulkAdd(e)} className="px-4">
        <select required value={langSelect} onChange={(e) => setLangSelect(e.target.value)} className="w-full rounded border border-emerald-500/30 bg-emerald-950/40 px-4 py-3 text-emerald-100 outline-none transition focus:border-emerald-400/60 cursor-pointer">
          <option disabled value="">
            Select entry language
          </option>
          {Object.values(APP_LANGUAGES).map((opt) => (
            <option key={opt[0]} value={opt[0]}>
              {opt[2]} {opt[3]}
            </option>
          ))}
        </select>

        <div className="flex gap-4 sm:gap-8 mt-4 mb-8 sm:my-8 text-sm">
          <textarea required value={textareaOne} onChange={(e) => setTextareaOne(e.target.value)} placeholder="Enter words or phrases in the entry language..." className="h-48 flex-1 resize-none rounded border border-emerald-500/30 bg-emerald-950/40 p-4 text-emerald-100 placeholder-emerald-400/40 outline-none transition focus:border-emerald-400/60" />

          <textarea required value={textareaTwo} onChange={(e) => setTextareaTwo(e.target.value)} placeholder="Enter translations in your comfortable language..." className="h-48 flex-1 resize-none rounded border border-cyan-500/30 bg-cyan-950/20 p-4 text-cyan-100 placeholder-cyan-400/40 outline-none transition focus:border-cyan-400/60" />
        </div>

        <div className="flex sm:justify-end justify-center">
          <button type="submit" className={`${STYLES_GENERAL_BTN} border-dashed border-emerald-600 text-emerald-400`}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
