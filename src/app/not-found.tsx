import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <p className="text-8xl font-extrabold text-blue-600 dark:text-blue-400">
                404
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Page not found
            </h1>
            <p className="mt-3 max-w-md text-slate-600 dark:text-slate-400">
                We couldn&apos;t find the page you were looking for.
            </p>
            <Link
                href="/"
                className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
            >
                Back to board
            </Link>
        </div>
    );
}
