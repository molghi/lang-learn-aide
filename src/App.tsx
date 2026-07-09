import { useEffect } from "react";
import { APP_NAME, APP_SHORT_SLOGAN } from "./constants.ts";
import { useMyContext } from "./context/AppContext.tsx";
import Header from "./components/Header.tsx";
import AddEditForm from "./components/AddEditForm.tsx";
import Notification from "./components/Notification.tsx";
import EntriesView from "./components/EntriesView.tsx";
import AnimatedBackground from "./components/AnimatedBackground.tsx";
import LanguageSelect from "./components/LanguageSelect.tsx";
import Round from "./components/Round.tsx";
import PracticeSummary from "./components/PracticeSummary.tsx";
import NoPractice from "./components/NoPractice.tsx";
import ExportImport from "./components/ExportImport.tsx";
import BulkAddEasy from "./components/BulkAddEasy.tsx";

function App() {
  const { isNotificationShown, activeView, editingEntryId, practiceEntries, currentRound } = useMyContext();

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

  return (
    <div className="pb-[150px] relative">
      <Header />

      {addOrWithEditEntry && <AddEditForm />}
      {activeView === "bulk-add" && <BulkAddEasy />}
      {viewAndNoEdit && <EntriesView />}
      {practiceAndNoPracticeEntries && <LanguageSelect />}
      {onPracticeScreen && practiceEntries && practiceEntries.length === 0 && <NoPractice />}

      {onPracticeScreen && currentRound !== null && practiceEntries && practiceEntries.length > 0 && stillPlaying && <Round roundData={practiceEntries[currentRound]} />}

      {onPracticeScreen && currentRound !== null && practiceEntries && practiceEntries.length > 0 && finishedPlaying && <PracticeSummary />}

      {isNotificationShown && <Notification />}

      <ExportImport />
      <AnimatedBackground />
    </div>
  );
}

export default App;
