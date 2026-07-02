import { useEffect } from "react";
import { APP_NAME, APP_SHORT_SLOGAN } from "./constants.ts";
import { useMyContext } from "./context/AppContext.tsx";
import Header from "./components/Header.tsx";
import AddEditForm from "./components/AddEditForm.tsx";
import Notification from "./components/Notification.tsx";
import EntriesView from "./components/EntriesView.tsx";

function App() {
  const { isNotificationShown, activeView } = useMyContext();

  useEffect(() => {
    document.title = `${APP_NAME} | ${APP_SHORT_SLOGAN}`;
  }, []);

  return (
    <div className="pb-[150px]">
      <Header />

      {activeView === "add" && <AddEditForm />}
      {activeView === "view" && <EntriesView />}
      {activeView === "practice" && <div className="text-center font-mono text-gray">Practice will be here...</div>}

      {isNotificationShown && <Notification />}
    </div>
  );
}

export default App;
