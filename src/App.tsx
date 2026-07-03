import { useEffect } from "react";
import { APP_NAME, APP_SHORT_SLOGAN } from "./constants.ts";
import { useMyContext } from "./context/AppContext.tsx";
import Header from "./components/Header.tsx";
import AddEditForm from "./components/AddEditForm.tsx";
import Notification from "./components/Notification.tsx";
import EntriesView from "./components/EntriesView.tsx";
import AnimatedBackground from "./components/AnimatedBackground.tsx";

function App() {
  const { isNotificationShown, activeView, editingEntryId } = useMyContext();

  useEffect(() => {
    document.title = `${APP_NAME} | ${APP_SHORT_SLOGAN}`;
  }, []);

  return (
    <div className="pb-[150px] relative">
      <Header />

      {(activeView === "add" || editingEntryId !== null) && <AddEditForm />}
      {activeView === "view" && editingEntryId === null && <EntriesView />}
      {activeView === "practice" && <div className="text-center font-mono text-gray">Practice will be here...</div>}

      {isNotificationShown && <Notification />}

      <AnimatedBackground />
    </div>
  );
}

export default App;
