import { STYLES_BLOCK_HEADER, STYLES_GENERAL_BTN, APP_ENTRIES_PER_PAGE } from "../constants.ts";
import { useMyContext } from "../context/AppContext.tsx";
import EntryCard from "./EntryCard.tsx";

export default function EntriesView() {
  const { entries, currentPage, setCurrentPage } = useMyContext();

  const totalPages: number = Math.ceil(entries.length / APP_ENTRIES_PER_PAGE);

  // ============================================================================

  type PaginateFlag = "increment" | "decrement";
  function paginate(flag?: PaginateFlag, pageToShow?: number) {
    if (flag === undefined && pageToShow === undefined) {
      throw new Error("Either flag or pageToShow must be provided");
    }
    if (flag === "increment") {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      return;
    }
    if (flag === "decrement") {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
      return;
    }
    if (typeof pageToShow === "number") {
      setCurrentPage(pageToShow);
    }
  }

  // ============================================================================

  // sort all by date, newest first
  const sortedEntries = [...entries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const startIndex = APP_ENTRIES_PER_PAGE * (currentPage - 1);
  const endIndex = startIndex + APP_ENTRIES_PER_PAGE;

  const paginatedEntries = sortedEntries.slice(startIndex, endIndex);

  // ============================================================================

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
        <div className="grid gap-8 mb-16">{paginatedEntries.length > 0 ? paginatedEntries.map((entry) => <EntryCard key={entry.id} entry={entry} />) : <div className="text-center font-mono text-gray italic">You have no entries so far.</div>}</div>

        {/* pagination */}
        {entries.length > 0 && (
          <div className="flex justify-center mt-6 gap-8 text-sm">
            <button onClick={() => paginate("decrement")} className={`${STYLES_GENERAL_BTN} border-dashed border-emerald-600`}>
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} className={`${STYLES_GENERAL_BTN} border-dashed border-emerald-600`} onClick={() => paginate(undefined, i + 1)}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => paginate("increment")} className={`${STYLES_GENERAL_BTN} border-dashed border-emerald-600`}>
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
