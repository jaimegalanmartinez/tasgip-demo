"use client";

import { track } from "@vercel/analytics";

interface BoardHeaderProps {
  onReset: () => void;
}

export default function BoardHeader({ onReset }: BoardHeaderProps) {
  return (
    <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 p-4 md:p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Tasgip demo
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Drag tasks across teams and states. One task, any team. Try it out!
        </p>
      </div>
      <button
        onClick={() => { track("demo_reset"); onReset(); }}
        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100"
      >
        Reset demo
      </button>
    </header>
  );
}
