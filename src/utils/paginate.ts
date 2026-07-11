import { APP_ENTRIES_PER_PAGE } from "../constants.ts";

type PaginateFlag = "increment" | "decrement";

export default function paginate(filteredEntriesLength: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>>, flag?: PaginateFlag, pageToShow?: number) {
  // calc total pages
  const totalPages: number = Math.ceil(filteredEntriesLength / APP_ENTRIES_PER_PAGE);

  if (flag === undefined && pageToShow === undefined) {
    throw new Error("Either flag or pageToShow must be provided");
  }

  if (flag === "increment") {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    return;
  }

  if (flag === "decrement") {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    return;
  }

  if (typeof pageToShow === "number") {
    setCurrentPage(pageToShow);
  }
}
