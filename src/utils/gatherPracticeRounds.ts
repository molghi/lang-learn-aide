import { APP_ROUNDS_PER_PRACTICE } from "../constants.ts";
import type { Entry } from "../context/AppContext.tsx";

export default function gatherPracticeRounds(practiceLanguage: string | null, entries: Entry[], setPracticeEntries: React.Dispatch<React.SetStateAction<any[] | null>>) {
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

  setPracticeEntries(selected);
}
