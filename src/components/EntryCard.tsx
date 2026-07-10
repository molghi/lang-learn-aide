import { APP_LANGUAGES } from "../constants.ts";
import type { Entry } from "../context/AppContext.tsx";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { useMyContext } from "../context/AppContext.tsx";

// ============================================================================

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ============================================================================

function getLanguageMeta(code: string) {
  const entry = Object.entries(APP_LANGUAGES).find(([, value]) => value[0] === code);
  return entry ? entry[1] : null;
}

// ============================================================================

export default function EntryCard({ entry }: { entry: Entry }) {
  const [open, setOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const { setEditingEntryId, setActiveView, setEntries, setIsNotificationShown, setNotificationContent } = useMyContext();

  const langMeta = getLanguageMeta(entry.language);

  let [langCode, langColor, langFlag, langFullName] = ["", "", "", ""];
  if (langMeta) {
    [langCode, langColor, langFlag, langFullName] = langMeta;
  }

  const borderColor = `border-[${langColor}]`;

  const lightboxStyles = `
  .yarl__container {
      background: rgba(10, 10, 15, 0.75) !important;
      backdrop-filter: blur(6px) !important;
    }
`;

  function deleteEntry() {
    if (!window.confirm(`Are you sure you want to delete this entry?\n\n ${langFlag} ${langCode.toUpperCase()} — ${entry.word}\n\nThis action is irreversible.`)) {
      return;
    }

    setEntries((prev) => prev.filter((item) => item.id !== entry.id));
    setIsNotificationShown(true);
    setNotificationContent(["success", "Entry deleted"]);
  }

  // ============================================================================

  return (
    <div className={`relative border rounded ${borderColor} bg-black/40 hover:bg-black/70 p-3 pt-9 font-mono text-emerald-100 transition duration-700 hover:shadow-[inset_0_0_40px_rgba(156,163,175,0.4)] sm:pt-3`}>
      <style>{lightboxStyles}</style>

      {/* Btns */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => {
            setEditingEntryId(entry.id);
            setActiveView("add");
          }}
          className="px-2 py-1 text-xs border border-emerald-500/30 bg-black/40 text-emerald-200 opacity-60 hover:opacity-100 hover:border-emerald-300 hover:text-emerald-100 transition-all duration-200 backdrop-blur-sm rounded-sm"
        >
          edit
        </button>
        <button onClick={() => deleteEntry()} className="px-2 py-1 text-xs border border-red-500/30 bg-black/40 text-red-300 opacity-60 hover:opacity-100 hover:border-red-400 hover:text-red-200 transition-all duration-200 backdrop-blur-sm rounded-sm">
          delete
        </button>
      </div>

      {/* Word card data */}
      {entry.language && entry.word && (
        <div className="top-2 left-2 text-lg flex gap-4">
          <span title={langFullName}>{langFlag}</span>
          <span className="text-lg mb-2" style={{ color: langColor }}>
            {entry.word}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-1 text-sm text-emerald-200/80">
        {entry.translation && (
          <div className="flex gap-2 items-start">
            <span className="opacity-50">translation:</span>

            <span className="relative group">
              {/* hidden word (still word-sized hover trigger) */}
              <span className="inline-flex relative">
                <span className="text-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">{entry.translation}</span>
              </span>

              {/* full-width metal cover */}
              <span className="absolute inset-0 px-2 py-0.5 rounded-sm border border-gray-300/30 bg-gradient-to-b from-gray-500/50 to-gray-700/90 backdrop-blur-[1px] pointer-events-none group-hover:opacity-0 transition-opacity duration-700 overflow-hidden">
                <span className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(255,255,255,0.98)_6px,rgba(255,255,255,0.98)_12px)]" />
              </span>
            </span>
          </div>
        )}
        {entry.definition && (
          <div className="flex gap-2">
            <span className="opacity-50">def:</span>
            <span>{entry.definition}</span>
          </div>
        )}

        {entry.hint && (
          <div className="flex gap-2">
            <span className="opacity-50">hint:</span>
            <span>{entry.hint}</span>
          </div>
        )}

        {entry.tag && (
          <div className="flex gap-2">
            <span className="opacity-50">tag:</span>
            <span>{entry.tag}</span>
          </div>
        )}

        {entry.imageUrl && (
          <div className="flex gap-2">
            <span className="opacity-50">img:</span>
            <img
              src={entry.imageUrl}
              alt="word img"
              className="w-[80%] h-32 object-cover cursor-pointer transition duration-500 ease-out opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
              onClick={() => {
                if (!entry.imageUrl) return;
                setImage(entry.imageUrl);
                setOpen(true);
              }}
            />
          </div>
        )}

        {entry.createdAt && (
          <div className="flex gap-2 text-[12px] transition opacity-50 hover:opacity-100">
            <span className="opacity-50">created:</span>
            <span>{formatDate(entry.createdAt)}</span>
          </div>
        )}

        {/* {entry.modifiedAt && (
          <div className="flex gap-2">
            <span className="opacity-50">modified:</span>
            <span>{formatDate(entry.modifiedAt)}</span>
          </div>
        )} */}

        {entry.note && (
          <div className="flex gap-2">
            <span className="opacity-50">note:</span>
            <span>{entry.note}</span>
          </div>
        )}

        {entry.lastPracticed && (
          <div className="flex gap-2 text-[12px]">
            <span className="opacity-50">practiced:</span>
            <span>{formatDate(entry.lastPracticed)}</span>
          </div>
        )}

        {typeof entry.ease === "number" && (
          <div className="flex gap-2">
            <span className="opacity-50">ease:</span>
            <span>{entry.ease}</span>
          </div>
        )}

        {typeof entry.repetitionCount === "number" && (
          <div className="flex gap-2">
            <span className="opacity-50">reps:</span>
            <span>{entry.repetitionCount}</span>
          </div>
        )}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: image }]}
        controller={{
          closeOnBackdropClick: true,
        }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </div>
  );
}
