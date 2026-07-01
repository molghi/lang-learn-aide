import { useEffect } from "react";
import { APP_NAME, APP_SHORT_SLOGAN } from "./constants.ts";
import { useMyContext } from "./context/AppContext.tsx";
import Header from "./components/Header.tsx";
import AddEditForm from "./components/AddEditForm.tsx";
import Notification from "./components/Notification.tsx";
import EntriesView from "./components/EntriesView.tsx";

function App() {
  const { isNotificationShown } = useMyContext();

  useEffect(() => {
    document.title = `${APP_NAME} | ${APP_SHORT_SLOGAN}`;
  }, []);

  return (
    <>
      <Header />
      <EntriesView />
      {/* <AddEditForm /> */}
      {isNotificationShown && <Notification />}
    </>
  );
}

export default App;
