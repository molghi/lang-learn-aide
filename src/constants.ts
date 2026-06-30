// For static values reused everywhere (project name, fixed styles, config, etc.)

export const APP_NAME: string = "Langer";

export const APP_SHORT_SLOGAN: string = "Your language learning aide";

export const STYLES_GENERAL_BTN: string = "hover:text-emerald-200 border-b border-dashed border-emerald-600 hover:border-emerald-200 transition-all duration-200 ease-out";

export const APP_LANGUAGES: Record<string, string[]> = {
  english: ["en", "#A7C7E7", "🇺🇸"],
  spanish: ["es", "#F7C8E0", "🇪🇸"],
  french: ["fr", "#CDE7BE", "🇫🇷"],
  german: ["de", "#D7C9F1", "🇩🇪"],
  italian: ["it", "#FAD6A5", "🇮🇹"],
  portuguese: ["pt", "#B8E0D2", "🇵🇹"],
  russian: ["ru", "#E2B5A5", "🇷🇺"],
  chinese: ["zh", "#F6EAC2", "🇨🇳"],
  japanese: ["ja", "#C9D6FF", "🇯🇵"],
  korean: ["ko", "#FFD6A5", "🇰🇷"],
  arabic: ["ar", "#E3C6FF", "🇸🇦"],
  hindi: ["hi", "#C8F7DC", "🇮🇳"],
  turkish: ["tr", "#F9C6C9", "🇹🇷"],
  //   dutch: ["nl", "#BDE0FE", "🇳🇱"],
  //   swedish: ["sv", "#D0F4DE", "🇸🇪"],
  //   polish: ["pl", "#FFF1C1", "🇵🇱"],
  //   ukrainian: ["uk", "#CDE4FF", "🇺🇦"],
  greek: ["el", "#FAD4D4", "🇬🇷"],
  //   thai: ["th", "#D7F9F1", "🇹🇭"],
  //   vietnamese: ["vi", "#E8DFF5", "🇻🇳"],
  czech: ["cs", "#E6F0FF", "🇨🇿"],
  persian: ["fa", "#F5E6FF", "🇮🇷"],
  icelandic: ["is", "#E6FFF5", "🇮🇸"],
  latin: ["la", "#FFF7E6", "🇻🇦"],
  hebrew: ["he", "#FFF0E6", "🇮🇱"],
};

export const APP_LOCAL_STORAGE_ENTRIES_KEY: string = "app_entries";
