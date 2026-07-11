import type { Entry } from "../context/AppContext.tsx";

export default function spacedRepetition(practiceEntries: any[] | null, roundRatings: any[] | null, entries: Entry[]) {
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

  return updatedEntries;
}
