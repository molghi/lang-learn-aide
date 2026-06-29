import { useEffect } from "react";
import { APP_NAME, APP_SHORT_SLOGAN } from "./constants.ts";
import Header from "./components/Header.tsx";
import AddEditForm from "./components/AddEditForm.tsx";

function App() {
  useEffect(() => {
    document.title = `${APP_NAME} | ${APP_SHORT_SLOGAN}`;
  }, []);

  return (
    <>
      <Header />
      <AddEditForm />
    </>
  );
}

export default App;
