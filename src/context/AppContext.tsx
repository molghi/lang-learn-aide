import { createContext, useState, useContext, useEffect } from "react";
import { APP_LOCAL_STORAGE_ENTRIES_KEY, APP_LOCAL_STORAGE_BG_KEY, APP_ROUNDS_PER_PRACTICE } from "../constants.ts";

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
}

type NotificationType = "success" | "error" | "warning";

type AppView = "add" | "view" | "practice";

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
  gatherPracticeRounds: () => void;
  currentRound: number | null;
  setCurrentRound: React.Dispatch<React.SetStateAction<number | null>>;
  userInputs: string[] | null;
  setUserInputs: React.Dispatch<React.SetStateAction<string[] | null>>;
  roundRatings: any[] | null;
  setRoundRatings: React.Dispatch<React.SetStateAction<any[] | null>>;
  spacedRepetition: () => void;
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

  // =========================

  function gatherPracticeRounds() {
    if (!practiceLanguage) return;
    // filter by lang
    const filtered = entries.filter((entry) => entry.language === practiceLanguage);
    const arr = [...filtered];
    /* Fisher-Yates shuffle below to randomize selection: 
        1. Start at the last element.
        2. Pick a random index from 0 to the current index.
        3. Swap the current element with the random element.
        4. Move one position left.
        5. Repeat until the whole array is shuffled.
    */
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // take only those entries that are due
    const available = arr.filter((entry) => !entry.nextPractice || entry.nextPractice <= Date.now());
    // get 5 (or less) entries
    const selected = available.slice(0, APP_ROUNDS_PER_PRACTICE);
    setCurrentRound(0);
    setPracticeEntries(selected);
  }

  // =========================

  function spacedRepetition() {
    // spaced repetition system intervals:
    const SRS_INTERVALS = {
      poor: 60 * 60 * 1000, // 1 hour in ms
      fair: 24 * 60 * 60 * 1000, // 1 day in ms
      good: 3 * 24 * 60 * 60 * 1000, // 3 days in ms
      perfect: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    };

    // create a smaller thing (from practiceEntries, which are essentially a subset of entries)
    const updatedPracticeEntries = practiceEntries?.map((practiceEntry) => {
      if (!roundRatings) return practiceEntry;

      const ratingObj = roundRatings.find((item) => item.entryId === practiceEntry.id);

      if (!ratingObj) return practiceEntry;

      const rating: "poor" | "fair" | "good" | "perfect" = ratingObj.recall.toLowerCase();

      return {
        ...practiceEntry,
        nextPractice: Date.now() + SRS_INTERVALS[rating], // calc when to practice next
      };
    });

    // update the bigger thing (entries)
    const updatedEntries = entries.map((entry) => {
      if (!updatedPracticeEntries) return entry;
      const updated = updatedPracticeEntries.find((item) => item.id === entry.id);
      return updated ?? entry;
    });
    setEntries(updatedEntries);
  }

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

  return <AppContext.Provider value={{ entries, setEntries, notificationContent, setNotificationContent, isNotificationShown, setIsNotificationShown, activeView, setActiveView, animBgUrl, setAnimBgUrl, editingEntryId, setEditingEntryId, currentPage, setCurrentPage, practiceLanguage, setPracticeLanguage, practiceEntries, setPracticeEntries, gatherPracticeRounds, currentRound, setCurrentRound, userInputs, setUserInputs, roundRatings, setRoundRatings, spacedRepetition }}>{children}</AppContext.Provider>;
}

// ============================================================================

export function useMyContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
