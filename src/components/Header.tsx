import { APP_NAME, STYLES_GENERAL_BTN } from "../constants.ts";
import { useMyContext } from "../context/AppContext.tsx";

export default function Header() {
  const { activeView, setActiveView, editingEntryId, setEditingEntryId, setPracticeEntries, setPracticeLanguage } = useMyContext();
  const headerBtnStyles: string = STYLES_GENERAL_BTN;

  const headerBtnNamesTitles: Record<string, string[]> = {
    addNew: ["Add", "Add a new word or words. Hotkey: Ctrl + 1"],
    viewAll: ["View", "View your added words. Hotkey: Ctrl + 2"],
    practice: ["Practice", "Practice by recalling your words. Hotkey: Ctrl + 3"],
  };

  if (editingEntryId) {
    headerBtnNamesTitles.addNew = ["Edit", "Edit your entry"];
  }

  // const activeBtn: string = "border-solid";

  return (
    <header className="w-full font-mono text-green-400 sm:mb-20 mb-14">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3 border-b border-emerald-600">
        <div className="text-lg tracking-wide">{APP_NAME}</div>

        <div className="flex gap-6 sm:gap-8 text-md text-emerald-400">
          <button
            onClick={() => {
              setActiveView("add");
              setPracticeEntries(null);
              setPracticeLanguage(null);
            }}
            className={`${headerBtnStyles} ${activeView === "add" ? "border-solid border-emerald-300" : "border-dashed border-emerald-600"}`}
            title={headerBtnNamesTitles.addNew[1]}
          >
            {headerBtnNamesTitles.addNew[0]}
          </button>
          <button
            onClick={() => {
              setEditingEntryId(null);
              setActiveView("view");
              setPracticeEntries(null);
              setPracticeLanguage(null);
            }}
            className={`${headerBtnStyles} ${activeView === "view" ? "border-solid border-emerald-400" : "border-dashed border-emerald-600"}`}
            title={headerBtnNamesTitles.viewAll[1]}
          >
            {headerBtnNamesTitles.viewAll[0]}
          </button>
          <button
            onClick={() => {
              setActiveView("practice");
              setPracticeEntries(null);
              setPracticeLanguage(null);
            }}
            className={`${headerBtnStyles} ${activeView === "practice" ? "border-solid border-emerald-400" : "border-dashed border-emerald-600"}`}
            title={headerBtnNamesTitles.practice[1]}
          >
            {headerBtnNamesTitles.practice[0]}
          </button>
        </div>
      </div>
    </header>
  );
}
