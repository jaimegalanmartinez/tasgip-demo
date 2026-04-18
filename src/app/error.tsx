"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                Something went wrong
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Unexpected error
            </h1>
            <p className="mt-3 max-w-md text-slate-600 dark:text-slate-400">
                An unexpected error occurred. You can try again, or head back to the board.
            </p>
            <div className="mt-6 flex gap-3">
                <button
                    onClick={reset}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                    Back to board
                </Link>
            </div>
        </div>
    );
}
