import { useEffect } from "react";
import { APP_NAME, APP_SHORT_SLOGAN } from "./constants.ts";
import { useMyContext } from "./context/AppContext.tsx";
import Header from "./components/Header.tsx";
import AddEditForm from "./components/AddEditForm.tsx";
import Notification from "./components/Notification.tsx";
import EntriesView from "./components/EntriesView.tsx";
import LanguageSelect from "./components/LanguageSelect.tsx";
import Round from "./components/Round.tsx";
import PracticeSummary from "./components/PracticeSummary.tsx";
import NoPractice from "./components/NoPractice.tsx";
import BulkAddEasy from "./components/BulkAddEasy.tsx";
import Footer from "./components/Footer.tsx";
import About from "./components/About.tsx";

function App() {
  const { isNotificationShown, activeView, editingEntryId, practiceEntries, currentRound, setActiveView, setPracticeEntries, setPracticeLanguage, setEditingEntryId } = useMyContext();

  useEffect(() => {
    document.title = `${APP_NAME} | ${APP_SHORT_SLOGAN}`;
  }, []);

  // SHOW LOGIC
  const addOrWithEditEntry: boolean = activeView === "add" || editingEntryId !== null;
  const viewAndNoEdit: boolean = activeView === "view" && editingEntryId === null;
  const onPracticeScreen: boolean = activeView === "practice";
  const practiceEntriesDefined: boolean = practiceEntries !== null;
  const practiceAndNoPracticeEntries: boolean = onPracticeScreen && !practiceEntriesDefined;

  const stillPlaying: boolean = currentRound !== null && practiceEntries !== null && currentRound + 1 <= practiceEntries.length;
  const finishedPlaying: boolean = currentRound !== null && practiceEntries !== null && currentRound + 1 === practiceEntries.length + 1;

  // hotkey support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // don’t trigger hotkeys while the user is typing in an input or textarea:
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (e.ctrlKey && e.key === "1") {
        // Add
        setActiveView("add");
        setPracticeEntries(null);
        setPracticeLanguage(null);
      }

      if (e.ctrlKey && e.key === "2") {
        // View
        setEditingEntryId(null);
        setActiveView("view");
        setPracticeEntries(null);
        setPracticeLanguage(null);
      }

      if (e.ctrlKey && e.key === "3") {
        // Practice
        setActiveView("practice");
        setPracticeEntries(null);
        setPracticeLanguage(null);
      }
      /*
      if (e.key === "ArrowLeft" && activeView === "view") {
        // paginate, prev page
        paginate("decrement");
      }
      if (e.key === "ArrowRight" && activeView === "view") {
        // paginate, next page
        paginate("increment");
      }
      */
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative flex-1 pb-[70px]">
        <Header />

        {addOrWithEditEntry && <AddEditForm />}
        {activeView === "bulk-add" && <BulkAddEasy />}
        {viewAndNoEdit && <EntriesView />}
        {practiceAndNoPracticeEntries && <LanguageSelect />}
        {activeView === "about" && <About />}

        {onPracticeScreen && practiceEntries && practiceEntries.length === 0 && <NoPractice />}

        {onPracticeScreen && currentRound !== null && practiceEntries && practiceEntries.length > 0 && stillPlaying && <Round roundData={practiceEntries[currentRound]} />}

        {onPracticeScreen && currentRound !== null && practiceEntries && practiceEntries.length > 0 && finishedPlaying && <PracticeSummary />}

        {isNotificationShown && <Notification />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
