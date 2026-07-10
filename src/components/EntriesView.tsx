import { STYLES_BLOCK_HEADER, STYLES_GENERAL_BTN, APP_ENTRIES_PER_PAGE, APP_LANGUAGES } from "../constants.ts";
import { useMyContext } from "../context/AppContext.tsx";
import EntryCard from "./EntryCard.tsx";
import { useEffect, useState, useMemo, useRef } from "react";

export default function EntriesView() {
  const { entries, currentPage, setCurrentPage, paginate } = useMyContext();
  const [filter, setFilter] = useState("");
  const prevBtn = useRef<HTMLButtonElement | null>(null);
  const nextBtn = useRef<HTMLButtonElement | null>(null);

  const totalPages: number = Math.ceil(entries.length / APP_ENTRIES_PER_PAGE);

  // ============================================================================

  // REACT TO CHANGE ON ENTRIES
  useEffect(() => {
    const totalPages = Math.ceil(filteredEntries.length / APP_ENTRIES_PER_PAGE);
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(totalPages, 1));
    }
    if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [entries]);

  // ============================================================================

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // don’t trigger hotkeys while the user is typing in an input or textarea:
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return;
      }

      if (e.key === "ArrowLeft") {
        // paginate, prev page
        prevBtn.current?.click();
      }
      if (e.key === "ArrowRight") {
        // paginate, next page
        nextBtn.current?.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ============================================================================

  // FOR FILTERING
  const allTags: any[] = entries.map((entry) => entry.tag).filter((entry) => entry);
  const monthYearPeriods: string[] = [...new Set(entries.map((entry) => entry.createdAt.slice(0, 7)))];
  const uniqueLanguageCodes: string[] = [...new Set(entries.map((entry) => entry.language))];
  const uniqueLanguageTitles = uniqueLanguageCodes.map((code) => {
    const lang = Object.values(APP_LANGUAGES).find(([c]) => c === code);
    if (!lang) return code;
    const [, , flag, name] = lang;
    return `${flag} ${name}`;
  });
  const allAppLangCodes: string[] = Object.values(APP_LANGUAGES).map((i) => i[0]);

  const formatPeriod = (period: string) => {
    const [year, month] = period.split("-");
    const date = new Date(Number(year), Number(month) - 1);
    const shortYear = date.toLocaleString("en-US", { year: "2-digit" }).replace(/^0/, "");
    const monthName = date.toLocaleString("en-US", { month: "short" });
    return `${monthName} '${shortYear}`;
  };

  const languageOptions = uniqueLanguageTitles.map((label, i) => ({
    value: uniqueLanguageCodes[i],
    label: "By lang: " + label,
  }));
  const tagOptions = allTags.map((tag) => ({
    value: tag,
    label: "By tag: " + tag,
  }));

  const dateOptions = monthYearPeriods.map((period) => ({
    value: period,
    label: "By period: " + formatPeriod(period),
  }));
  const filterOptions = [...languageOptions, ...tagOptions, ...dateOptions];

  const filteredEntries = useMemo(() => {
    if (!filter) return entries;
    // language filter
    if (allAppLangCodes.includes(filter)) {
      return entries.filter((entry) => entry.language === filter);
    }
    // date filter (YYYY-MM)
    if (/^\d{4}-\d{2}$/.test(filter)) {
      return entries.filter((entry) => entry.createdAt.startsWith(filter));
    }
    // tag filter (fallback)
    return entries.filter((entry) => entry.tag === filter);
  }, [entries, filter]);

  // ============================================================================

  // FOR PAGINATION
  // sort all by date, newest first
  const sortedEntries = [...filteredEntries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const startIndex = APP_ENTRIES_PER_PAGE * (currentPage - 1);
  const endIndex = startIndex + APP_ENTRIES_PER_PAGE;

  const paginatedEntries = sortedEntries.slice(startIndex, endIndex);

  // ============================================================================

  return (
    <section className="w-full font-mono text-emerald-100">
      <div className="max-w-4xl mx-auto px-4 pb-6 text-emerald-400">
        <h2 className={`${STYLES_BLOCK_HEADER} mb-7 sm:mb-14`}>VIEW ENTRIES</h2>

        {/* top bar */}
        {entries.length > 0 && (
          <div className="flex items-center justify-between mb-8 flex-col gap-4 sm:flex-row">
            <div className="text-emerald-200/80">
              {filteredEntries.length} {filteredEntries.length > 1 ? "entries" : "entry"}
            </div>

            {/* Filter */}
            <div className="flex gap-4">
              <span>Filter: </span>
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-black/40 border rounded border-emerald-500/30 px-2 py-1 text-sm cursor-pointer">
                <option value="">None</option>
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* cards container */}
        <div className="grid gap-8 mb-16">
          {paginatedEntries.length > 0 ? (
            paginatedEntries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
          ) : (
            <div className="text-center font-mono text-gray italic leading-9 text-emerald-100">
              You have no entries so far. <br />
              Add your first entry to begin reviewing and practicing.
            </div>
          )}
        </div>

        {/* pagination */}
        {filteredEntries.length > 0 && (
          <div className="flex justify-center mt-6 gap-8 text-sm">
            {filteredEntries.length > 10 && (
              <button ref={prevBtn} onClick={() => paginate(filteredEntries.length, "decrement", undefined)} className={`${STYLES_GENERAL_BTN} border-dashed border-emerald-600`}>
                Prev
              </button>
            )}

            {Array.from({ length: Math.ceil(filteredEntries.length / APP_ENTRIES_PER_PAGE) }, (_, i) => (
              <button key={i + 1} className={`${STYLES_GENERAL_BTN} min-w-[17px]  ${i + 1 === currentPage ? "border-solid border-emerald-400" : "border-dashed border-emerald-600"}`} onClick={() => paginate(filteredEntries.length, undefined, i + 1)}>
                {i + 1}
              </button>
            ))}

            {filteredEntries.length > 10 && (
              <button ref={nextBtn} onClick={() => paginate(filteredEntries.length, "increment", undefined)} className={`${STYLES_GENERAL_BTN} border-dashed border-emerald-600`}>
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
