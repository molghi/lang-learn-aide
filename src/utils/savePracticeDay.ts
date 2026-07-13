import { APP_LOCAL_STORAGE_LAST_PRACTICED } from "../constants.ts";

export default function savePracticeDay() {
  const savedDays = localStorage.getItem(APP_LOCAL_STORAGE_LAST_PRACTICED);

  // parse it
  const practiceDays: string[] = savedDays ? JSON.parse(savedDays) : [];

  // get the date of today without time
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  // save practice day, avoid duplicates
  const updatedDays = [...new Set([...practiceDays, today])];

  localStorage.setItem(APP_LOCAL_STORAGE_LAST_PRACTICED, JSON.stringify(updatedDays));
}
