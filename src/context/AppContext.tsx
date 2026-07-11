import { createContext, useState, useContext, useEffect } from "react";
import { APP_LOCAL_STORAGE_ENTRIES_KEY, APP_LOCAL_STORAGE_BG_KEY, APP_LOCAL_STORAGE_LAST_LANG_KEY } from "../constants.ts";
import paginate from "../utils/paginate.ts";
import gatherPracticeRounds from "../utils/gatherPracticeRounds.ts";
import spacedRepetition from "../utils/spacedRepetition.ts";

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
  nextPractice?: number;
  ease?: number; // for spaced rep sys
  repetitionCount?: number; // how many times practiced this word
  note?: string;
}

type NotificationType = "success" | "error" | "warning";

type AppView = "add" | "view" | "practice" | "bulk-add" | "about";

interface AppContextType {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  notificationContent: [NotificationType, string] | null;
  setNotificationContent: React.Dispatch<React.SetStateAction<[NotificationType, string] | null>>;
  isNotificationShown: boolean;
  setIsNotificationShown: React.Dispatch<React.SetStateAction<boolean>>;
  activeView: AppView;
  setActiveView: React.Dispatch<React.SetStateAction<AppView>>;
  animBgUrl: string | null;
  setAnimBgUrl: React.Dispatch<React.SetStateAction<string | null>>;
  editingEntryId: string | null;
  setEditingEntryId: React.Dispatch<React.SetStateAction<string | null>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  practiceLanguage: string | null;
  setPracticeLanguage: React.Dispatch<React.SetStateAction<string | null>>;
  practiceEntries: any[] | null;
  setPracticeEntries: React.Dispatch<React.SetStateAction<any[] | null>>;
  gatherPracticeRounds: (practiceLanguage: string | null, entries: Entry[], setPracticeEntries: React.Dispatch<React.SetStateAction<any[] | null>>) => void;
  currentRound: number | null;
  setCurrentRound: React.Dispatch<React.SetStateAction<number | null>>;
  userInputs: string[] | null;
  setUserInputs: React.Dispatch<React.SetStateAction<string[] | null>>;
  roundRatings: any[] | null;
  setRoundRatings: React.Dispatch<React.SetStateAction<any[] | null>>;
  spacedRepetition: (practiceEntries: any[] | null, roundRatings: any[] | null, entries: Entry[]) => any[];
  lastSelectedLang: string | null;
  setLastSelectedLang: React.Dispatch<React.SetStateAction<string | null>>;
  paginate: (filteredEntriesLength: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>, flag?: "increment" | "decrement", pageToShow?: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

// ============================================================================

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>(() => {
    const stored = localStorage.getItem(APP_LOCAL_STORAGE_ENTRIES_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [notificationContent, setNotificationContent] = useState<[NotificationType, string] | null>(null);
  const [isNotificationShown, setIsNotificationShown] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<AppView>("view");
  const [animBgUrl, setAnimBgUrl] = useState<string | null>(() => {
    const stored = localStorage.getItem(APP_LOCAL_STORAGE_BG_KEY);
    return stored ? stored : null;
  });
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [practiceLanguage, setPracticeLanguage] = useState<string | null>(null);
  const [practiceEntries, setPracticeEntries] = useState<any[] | null>(null);
  const [currentRound, setCurrentRound] = useState<number | null>(null);
  const [userInputs, setUserInputs] = useState<string[] | null>(null);
  const [roundRatings, setRoundRatings] = useState<any[] | null>(null);
  const [lastSelectedLang, setLastSelectedLang] = useState<string | null>(() => {
    const stored = localStorage.getItem(APP_LOCAL_STORAGE_LAST_LANG_KEY);
    return stored ? stored : null;
  });

  // =========================

  // pull from localStorage (LS)
  useEffect(() => {
    const stored = localStorage.getItem(APP_LOCAL_STORAGE_ENTRIES_KEY);
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  // save to LS
  useEffect(() => {
    localStorage.setItem(APP_LOCAL_STORAGE_ENTRIES_KEY, JSON.stringify(entries));
  }, [entries]);

  // hide & reset noti
  useEffect(() => {
    if (!isNotificationShown) return;
    const timer = setTimeout(() => {
      setIsNotificationShown(false);
      setNotificationContent(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isNotificationShown]);

  // set last selected language
  useEffect(() => {
    localStorage.setItem(APP_LOCAL_STORAGE_LAST_LANG_KEY, lastSelectedLang || "");
  }, [lastSelectedLang]);

  return <AppContext.Provider value={{ entries, setEntries, notificationContent, setNotificationContent, isNotificationShown, setIsNotificationShown, activeView, setActiveView, animBgUrl, setAnimBgUrl, editingEntryId, setEditingEntryId, currentPage, setCurrentPage, practiceLanguage, setPracticeLanguage, practiceEntries, setPracticeEntries, gatherPracticeRounds, currentRound, setCurrentRound, userInputs, setUserInputs, roundRatings, setRoundRatings, spacedRepetition, lastSelectedLang, setLastSelectedLang, paginate }}>{children}</AppContext.Provider>;
}

// ============================================================================

export function useMyContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
