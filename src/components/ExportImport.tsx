import { APP_LOCAL_STORAGE_ENTRIES_KEY, APP_NAME } from "../constants.ts";
import { useMyContext } from "../context/AppContext.tsx";

export default function ExportImport() {
  const { entries, setEntries, setNotificationContent, setIsNotificationShown, setActiveView } = useMyContext();

  // pull from LS and trigger browser download
  function exportEntries() {
    const data = localStorage.getItem(APP_LOCAL_STORAGE_ENTRIES_KEY);
    if (!data || !JSON.parse(data) || JSON.parse(data).length === 0) return alert("Nothing to export. You haven’t added any entries yet.");

    if (!data) return;

    const formattedData = JSON.stringify(JSON.parse(data), null, 2); // pretty-print it to make more readable
    const blob = new Blob([formattedData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const timestamp = new Date()
      .toLocaleString("en-UK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(" ", "_")
      .replace(":", "-")
      .replace(",", "");
    a.download = `${APP_NAME}_entries_${timestamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ============================================================================

  // called in importEntries()
  function reactToImport(file: File) {
    // read file
    const reader = new FileReader();
    reader.onload = () => {
      try {
        // parse JSON
        const parsed = JSON.parse(reader.result as string);

        // validate structure
        if (!Array.isArray(parsed)) throw new Error("Imported data must be an array.");

        // check if in exact needed format
        const isValid = parsed.every((entry) => {
          return typeof entry === "object" && entry !== null && typeof entry.id === "string" && typeof entry.word === "string" && typeof entry.language === "string" && typeof entry.translation === "string" && typeof entry.createdAt === "string" && typeof entry.modifiedAt === "string";
        });

        if (!isValid) throw new Error("Imported data has an invalid entry format.");

        const now = new Date().toISOString();

        const importedEntries = parsed;

        // reset createdAt and modifiedAt for each
        const importedEntriesWithNewDates = importedEntries.map((entry) => ({
          ...entry,
          createdAt: now,
          modifiedAt: now,
        }));

        // merge entries:
        // make a map/dictionary of importing entries (key-value pairs) for faster lookup
        const importedMap = new Map(importedEntriesWithNewDates.map((entry) => [entry.id, entry]));
        let updatedEntries;

        if (entries.length > 0) {
          // in case of having some entries: upsert
          const existingIds = new Set(entries.map((entry) => entry.id));
          const existingEntriesEdited = entries.map((entry) => importedMap.get(entry.id) ?? entry);
          const newEntries = importedEntriesWithNewDates.filter((entry) => !existingIds.has(entry.id));
          updatedEntries = [...existingEntriesEdited, ...newEntries];
        } else {
          // in case of having no entries
          updatedEntries = importedEntriesWithNewDates;
        }

        setEntries(updatedEntries);
        setIsNotificationShown(true);
        setNotificationContent(["success", "Imported successfully!"]);
        setActiveView("view");
      } catch {
        throw new Error("Failed to import entries.");
      }
    };

    reader.readAsText(file);
  }

  // ============================================================================

  function importEntries() {
    // create input file
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";

    input.onchange = () => {
      const file = input.files?.[0];

      if (!file) throw new Error("No file selected.");

      if (file.type !== "application/json" && !file.name.endsWith(".json")) {
        throw new Error("Only JSON files are allowed.");
      }

      // proceed if all good
      reactToImport(file);
    };

    input.click();
  }

  // ============================================================================

  return (
    <div className="fixed bottom-6 right-6 flex gap-3 font-mono text-sm opacity-50 transition hover:opacity-100">
      <button onClick={() => exportEntries()} title="Export your entries data" className="rounded border border-emerald-500/30 bg-emerald-900/10 px-4 py-1 text-emerald-100 transition hover:bg-emerald-500/10">
        Export
      </button>

      <button onClick={() => importEntries()} title="Restore previously exported entries data" className="rounded border border-cyan-500/30 bg-cyan-900/10 px-4 py-1 text-cyan-100 transition hover:bg-cyan-500/10">
        Import
      </button>
    </div>
  );
}
