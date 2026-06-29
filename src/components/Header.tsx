import { APP_NAME, STYLES_GENERAL_BTN } from "../constants.ts";

export default function Header() {
  const headerBtnStyles: string = STYLES_GENERAL_BTN;

  const headerBtnNamesTitles: Record<string, string[]> = {
    addNew: ["Add", "Add new word or words"],
    viewAll: ["View", "View your added words"],
    practice: ["Practice", "Practice by recalling your words"],
  };

  return (
    <header className="w-full font-mono text-green-400 mb-14">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3 border-b border-emerald-600">
        <div className="text-lg tracking-wide">{APP_NAME}</div>

        <div className="flex gap-8 text-md text-emerald-400">
          <button className={headerBtnStyles} title={headerBtnNamesTitles.addNew[1]}>
            {headerBtnNamesTitles.addNew[0]}
          </button>
          <button className={headerBtnStyles} title={headerBtnNamesTitles.viewAll[1]}>
            {headerBtnNamesTitles.viewAll[0]}
          </button>
          <button className={headerBtnStyles} title={headerBtnNamesTitles.practice[1]}>
            {headerBtnNamesTitles.practice[0]}
          </button>
        </div>
      </div>
    </header>
  );
}
