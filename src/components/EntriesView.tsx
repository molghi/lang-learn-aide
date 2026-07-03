import { STYLES_BLOCK_HEADER, STYLES_GENERAL_BTN } from "../constants.ts";
import { useMyContext } from "../context/AppContext.tsx";
import EntryCard from "./EntryCard.tsx";

export default function EntriesView() {
  const { entries } = useMyContext();

  return (
    <section className="w-full font-mono text-emerald-100">
      <div className="max-w-4xl mx-auto px-4 pb-6 text-emerald-400">
        <h2 className={STYLES_BLOCK_HEADER}>VIEW ENTRIES</h2>

        {/* top bar */}
        {entries.length > 0 && (
          <div className="flex items-center justify-between mb-8">
            <div className="text-emerald-200/80">{entries.length} entries</div>

            <div className="flex gap-4">
              <span>Filter: </span>
              <select className="bg-black/40 border border-emerald-500/30 px-2 py-1 text-sm cursor-pointer">
                <option>By language</option>
                <option>By tag</option>
                <option>By month & year added</option>
              </select>
            </div>
          </div>
        )}

        {/* cards container */}
        <div className="grid gap-8 mb-16">{entries.length > 0 ? [...entries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((entry) => <EntryCard key={entry.id} entry={entry} />) : <div className="text-center font-mono text-gray italic">You have no entries so far.</div>}</div>

        {/* pagination */}
        {entries.length > 0 && (
          <div className="flex justify-center mt-6 gap-8 text-sm">
            <button className={`${STYLES_GENERAL_BTN} border-dashed border-emerald-600`}>Prev</button>
            <button className={`${STYLES_GENERAL_BTN} border-dashed border-emerald-600`}>1</button>
            <button className={`${STYLES_GENERAL_BTN} border-dashed border-emerald-600`}>Next</button>
          </div>
        )}
      </div>
    </section>
  );
}
