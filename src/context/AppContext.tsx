import { createContext, useState, useContext, useEffect } from "react";
import { APP_LOCAL_STORAGE_ENTRIES_KEY } from "../constants.ts";

export interface Entry {
  id: string; // unique
  word: string;
  language: string; // of word
  translation: string; // into comfortable lang
  definition?: string;
  hint?: string; // used in practice later
  tag?: string; // category, part of speech, topic -- sth to categorize it
  imageUrl?: string; // web img path
  createdAt: string;
  modifiedAt: string;
  lastPracticed?: string;
  ease?: number; // for spaced rep sys
  repetitionCount?: number; // how many times practiced this word
}

type NotificationType = "success" | "error" | "warning";

interface AppContextType {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  notificationContent: [NotificationType, string] | null;
  setNotificationContent: React.Dispatch<React.SetStateAction<[NotificationType, string] | null>>;
  isNotificationShown: boolean;
  setIsNotificationShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>(() => {
    const stored = localStorage.getItem(APP_LOCAL_STORAGE_ENTRIES_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [notificationContent, setNotificationContent] = useState<[NotificationType, string] | null>(null);
  const [isNotificationShown, setIsNotificationShown] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(APP_LOCAL_STORAGE_ENTRIES_KEY);
    if (stored) {
      setEntries(JSON.parse(stored));
      console.log("Pulled from LS!");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(APP_LOCAL_STORAGE_ENTRIES_KEY, JSON.stringify(entries));
    console.log("Saved to LS!");
  }, [entries]);

  useEffect(() => {
    if (!isNotificationShown) return;
    const timer = setTimeout(() => {
      setIsNotificationShown(false);
      setNotificationContent(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isNotificationShown]);

  return <AppContext.Provider value={{ entries, setEntries, notificationContent, setNotificationContent, isNotificationShown, setIsNotificationShown }}>{children}</AppContext.Provider>;
}

// ============================================================================

export function useMyContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
