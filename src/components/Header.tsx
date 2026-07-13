import { APP_NAME, STYLES_GENERAL_BTN } from "../constants.ts";
import { useMyContext } from "../context/AppContext.tsx";
import Calendar from "./Calendar.tsx";
import { useState } from "react";

export default function Header() {
  const { activeView, setActiveView, editingEntryId, setEditingEntryId, setPracticeEntries, setPracticeLanguage } = useMyContext();
  const [isCalendarShown, setIsCalendarShown] = useState(false);

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
        <div onMouseEnter={() => setIsCalendarShown(true)} onMouseLeave={() => setIsCalendarShown(false)} className="relative text-lg tracking-wide">
          <span>{APP_NAME}</span>
          <div className={`absolute top-[100%] left-0 z-10 transition-all duration-300 ease-out ${isCalendarShown ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-4"}`}>
            <Calendar />
          </div>
        </div>

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
