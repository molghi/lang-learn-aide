import { useMyContext } from "../context/AppContext.tsx";

export default function Notification() {
  const { notificationContent } = useMyContext();

  if (!notificationContent) return null;

  const [type, text] = notificationContent;

  const colorMap = {
    success: "text-emerald-400 border-emerald-700 bg-emerald-500/15 shadow-[0_0_18px_rgba(34,197,94,0.75)]",
    error: "text-red-200 border-red-300/60 bg-red-500/10 shadow-[0_0_18px_rgba(239,68,68,0.25)]",
    warning: "text-yellow-100 border-yellow-300/60 bg-yellow-500/10 shadow-[0_0_18px_rgba(234,179,8,0.25)]",
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono sm:text-left text-center">
      <div className={`px-4 py-2 border bg-black/60 backdrop-blur-sm rounded-sm ${colorMap[type]}`}>{text}</div>
    </div>
  );
}
