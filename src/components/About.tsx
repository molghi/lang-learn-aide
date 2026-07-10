import { STYLES_BLOCK_HEADER, APP_NAME } from "../constants.ts";

export default function About() {
  return (
    <div className="mx-auto w-full max-w-4xl font-mono px-4">
      <h1 className={`${STYLES_BLOCK_HEADER} text-emerald-400`}>ABOUT THIS APP</h1>

      <p className="mt-6 text-emerald-100/80">{APP_NAME} is a small and minimalist helper tool for those exploring new languages. It helps you collect, practice, and remember new words through a simple personal learning system.</p>

      <div className="mt-10 max-w-lg mx-auto space-y-5 text-emerald-100/80">
        <p className="font-bold">You can:</p>

        <ul className="space-y-3 text-sm text-emerald-200/80">
          <li>✦ Add entries individually or in bulk</li>
          <li>✦ Build your personal word archive</li>
          <li>✦ Practice through adaptive recall rounds</li>
          <li>✦ Reinforce memory with spaced repetition</li>
          <li>✦ Import and export your knowledge archive</li>
          {/* <li>✦ Track your progress across languages</li> */}
        </ul>

        <p className="pt-4 text-sm text-emerald-400/70">Your data remains yours. No external systems. No noise.</p>
      </div>
    </div>
  );
}
