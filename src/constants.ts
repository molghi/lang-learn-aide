// For static values reused everywhere (project name, fixed styles, config, etc.)

export const APP_NAME: string = "Langer";

export const APP_SHORT_SLOGAN: string = "Your language learning aide";

export const STYLES_GENERAL_BTN: string = "hover:text-emerald-200 border-b  hover:border-emerald-200 transition-all duration-200 ease-out"; // border-dashed border-emerald-600

export const APP_LANGUAGES: Record<string, string[]> = {
  english: ["en", "#A7C7E7", "🇺🇸", "English"],
  // spanish: ["es", "#F7C8E0", "🇪🇸", "Spanish"],
  spanish: ["es", "#DCCB7A", "🇪🇸", "Spanish"],
  french: ["fr", "#CDE7BE", "🇫🇷", "French"],
  german: ["de", "#D7C9F1", "🇩🇪", "German"],
  italian: ["it", "#FAD6A5", "🇮🇹", "Italian"],
  portuguese: ["pt", "#B8E0D2", "🇵🇹", "Portuguese"],
  russian: ["ru", "#E2B5A5", "🇷🇺", "Russian"],
  chinese: ["zh", "#F6EAC2", "🇨🇳", "Chinese"],
  japanese: ["ja", "#C9D6FF", "🇯🇵", "Japanese"],
  korean: ["ko", "#FFD6A5", "🇰🇷", "Korean"],
  arabic: ["ar", "#E3C6FF", "🇸🇦", "Arabic"],
  hindi: ["hi", "#C8F7DC", "🇮🇳", "Hindi"],
  turkish: ["tr", "#F9C6C9", "🇹🇷", "Turkish"],
  greek: ["el", "#FAD4D4", "🇬🇷", "Greek"],
  czech: ["cs", "#E6F0FF", "🇨🇿", "Czech"],
  persian: ["fa", "#F5E6FF", "🇮🇷", "Persian"],
  icelandic: ["is", "#E6FFF5", "🇮🇸", "Icelandic"],
  latin: ["la", "#FFF7E6", "🇻🇦", "Latin"],
  hebrew: ["he", "#FFF0E6", "🇮🇱", "Hebrew"],
  //   dutch: ["nl", "#BDE0FE", "🇳🇱"],
  //   swedish: ["sv", "#D0F4DE", "🇸🇪"],
  //   polish: ["pl", "#FFF1C1", "🇵🇱"],
  //   ukrainian: ["uk", "#CDE4FF", "🇺🇦"],
  //   thai: ["th", "#D7F9F1", "🇹🇭"],
  //   vietnamese: ["vi", "#E8DFF5", "🇻🇳"],
};

export const APP_LOCAL_STORAGE_ENTRIES_KEY: string = "app_entries";

export const STYLES_BLOCK_HEADER: string = "text-center text-3xl mb-14 tracking-wide";

export const APP_LOCAL_STORAGE_BG_KEY: string = "app_bg";

export const APP_ENTRIES_PER_PAGE: number = 10;

export const APP_ROUNDS_PER_PRACTICE: number = 5;

export const APP_LOCAL_STORAGE_LAST_LANG_KEY: string = "app_last_selected_lang";
