// For static values reused everywhere (project name, fixed styles, config, etc.)

export const APP_NAME: string = "Langer";

export const APP_SHORT_SLOGAN: string = "Your language learning companion";

export const STYLES_GENERAL_BTN: string = "hover:text-emerald-200 border-b  hover:border-emerald-200 transition-all duration-200 ease-out"; // border-dashed border-emerald-600

export const APP_LANGUAGES: Record<string, string[]> = {
  english: ["en", "#38BDF8", "🇺🇸", "English"], // #C084FC violet
  // spanish: ["es", "#F7C8E0", "🇪🇸", "Spanish"],
  spanish: ["es", "gold", "🇪🇸", "Spanish"], // #DCCB7A
  french: ["fr", "dodgerblue", "🇫🇷", "French"],
  german: ["de", "coral", "🇩🇪", "German"],
  italian: ["it", "#FAD6A5", "🇮🇹", "Italian"],
  portuguese: ["pt", "#B8E0D2", "🇵🇹", "Portuguese"],
  russian: ["ru", "#E2B5A5", "🇷🇺", "Russian"],
  chinese: ["zh", "#FF1F3D", "🇨🇳", "Chinese"],
  japanese: ["ja", "#C9D6FF", "🇯🇵", "Japanese"],
  korean: ["ko", "#FFD6A5", "🇰🇷", "Korean"],
  arabic: ["ar", "#22C55E", "🇸🇦", "Arabic"],
  hindi: ["hi", "#C8F7DC", "🇮🇳", "Hindi"],
  turkish: ["tr", "#FF6B7A", "🇹🇷", "Turkish"],
  greek: ["el", "#FAD4D4", "🇬🇷", "Greek"],
  czech: ["cs", "#94A3B8", "🇨🇿", "Czech"],
  persian: ["fa", "#34D399", "🇮🇷", "Persian"],
  icelandic: ["is", "cyan", "🇮🇸", "Icelandic"],
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
