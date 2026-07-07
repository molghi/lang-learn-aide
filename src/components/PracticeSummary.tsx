import { useMyContext } from "../context/AppContext.tsx";
import { STYLES_BLOCK_HEADER } from "../constants.ts";

export default function PracticeSummary() {
  const { practiceEntries, userInputs, roundRatings, setRoundRatings, practiceLanguage } = useMyContext();

  const btns: any[] = [
    { name: "Poor", title: "You failed to recall this word", difficulty: 3, classes: "border-red-500/30 hover:bg-red-500/10" },
    { name: "Fair", title: "You recalled it with some difficulty", difficulty: 2, classes: "border-yellow-500/30 hover:bg-yellow-500/10" },
    { name: "Good", title: "You recalled it correctly", difficulty: 1, classes: "border-emerald-500/30 hover:bg-emerald-500/10" },
    { name: "Perfect", title: "You recalled it instantly and confidently", difficulty: 0, classes: "border-cyan-500/30 hover:bg-cyan-500/10" },
  ];

  return (
    <div className="mx-auto max-w-3xl font-mono text-emerald-100">
      <h1 className={`${STYLES_BLOCK_HEADER} text-emerald-400 mb-5`}>PRACTICE SUMMARY</h1>

      <div className="mb-10 text-center text-sm leading-5 text-emerald-200/70 opacity-60 hover:opacity-100 transition">
        Evaluate how well you recalled each entry. <br /> Your ratings will be used to personalize future practice sessions.
      </div>

      {/* PRINT ENTRIES + USER INPUTS */}
      <div className="space-y-6">
        {practiceEntries?.map((entry, index) => (
          <div key={entry.id} className="rounded border border-emerald-500/30 bg-black/30 p-5 relative transition duration-700 hover:shadow-[inset_0_0_15px_rgba(156,163,175,0.4)]">
            <div title={`Round ${index + 1}`} className="absolute top-4 right-4 font-bold opacity-30 transition hover:opacity-60 text-5xl">
              {index + 1}
            </div>

            <div className="mb-4 text-xl text-emerald-100">{entry.word}</div>

            <div className="mb-4 text-sm text-emerald-200/70">
              Translation: <span className="text-emerald-100">{entry.translation}</span>
            </div>

            <div className="mb-6 text-sm text-emerald-200/70">
              Your answer: <span className="text-emerald-100">{userInputs?.[index]}</span>
            </div>

            <div className="mb-3 text-xs uppercase tracking-wider text-emerald-300/60">Evaluate your recall:</div>

            {/* BTNS */}
            <div className="flex flex-wrap gap-3">
              {btns.map((item, ind) => {
                const isSelected = roundRatings?.some((rating) => rating.entryId === practiceEntries[index].id && rating.recall === item.name);
                return (
                  <button
                    key={ind}
                    title={item.title}
                    className={`rounded border px-3 py-2 transition ${item.classes} ${isSelected ? "bg-gray-100/20 text-emerald-100" : ""}`}
                    onClick={() => {
                      setRoundRatings((prev) => {
                        const newRating = {
                          entryId: practiceEntries[index].id,
                          recall: item.name,
                        };
                        if (prev === null) {
                          return [newRating];
                        }
                        const alreadyRated = prev.some((rating) => rating.entryId === newRating.entryId);
                        if (alreadyRated) {
                          return [...prev.filter((rating) => rating.entryId !== newRating.entryId), newRating];
                        }
                        return [...prev, newRating];
                      });
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={() => {
            console.warn(`do spaced rep sys (edit 'entries', calc 'nextPractice' field or sth like that)

show noti 

throw back to View `);
          }}
          disabled={roundRatings?.length !== practiceEntries?.length}
          title={roundRatings?.length !== practiceEntries?.length ? "You must rate each round." : ""}
          className="rounded border border-emerald-500/40 bg-emerald-500/10 px-5 py-2 transition hover:bg-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
