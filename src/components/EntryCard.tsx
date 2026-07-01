import { APP_LANGUAGES } from "../constants.ts";
import type { Entry } from "../context/AppContext.tsx";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getLanguageMeta(code: string) {
  const entry = Object.entries(APP_LANGUAGES).find(([, value]) => value[0] === code);
  return entry ? entry[1] : null;
}

export default function EntryCard({ entry }: { entry: Entry }) {
  const langMeta = getLanguageMeta(entry.language);
  let langCode, langColor, langFlag, langFullName;
  if (langMeta) {
    [langCode, langColor, langFlag, langFullName] = langMeta;
  } else {
    [langCode, langColor, langFlag, langFullName] = ["", "", "", ""];
  }
  // border-emerald-500/20

  const borderColor = `border-[${langColor}]`;

  return (
    <div className={`relative border ${borderColor} bg-black/40 p-3 font-mono text-emerald-100`}>
      {entry.language && entry.word && (
        <div className="top-2 left-2 text-lg flex gap-4">
          <span title={langFullName}>{langFlag}</span>
          <span className="text-lg mb-2" style={{ color: langColor }}>
            {entry.word}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-emerald-200/80">
        {entry.translation && (
          <div className="flex gap-2">
            <span className="opacity-50">translation:</span>
            <span>{entry.translation}</span>
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
            <span>{entry.imageUrl}</span>
          </div>
        )}

        {entry.createdAt && (
          <div className="flex gap-2">
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

        {entry.lastPracticed && (
          <div className="flex gap-2">
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
    </div>
  );
}
