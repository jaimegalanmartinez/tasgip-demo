'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import { BACKLOGS } from "@/mocks/backlogs";
import { track } from "@vercel/analytics";

const TALLY_FORM_ID = "PdBBgP";

interface SidebarProps {
    onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
    const pathname = usePathname();

    useEffect(() => {
        function handleTallyEvent(e: MessageEvent) {
            if (typeof e.data !== "string" || !e.data.includes("Tally.FormSubmitted")) return;
            try {
                const payload = JSON.parse(e.data);
                if (payload.event === "Tally.FormSubmitted" && payload.payload?.formId === TALLY_FORM_ID) {
                    track("notify_form_submitted");
                }
            } catch {
                // Ignore non-JSON messages from other postMessage sources
            }
        }
        window.addEventListener("message", handleTallyEvent);
        return () => window.removeEventListener("message", handleTallyEvent);
    }, []);

    return (
        <aside className={`w-64 min-h-screen h-full overflow-y-auto bg-white dark:bg-gray-900 px-4 flex flex-col ${!onClose ? "hidden md:flex" : ""}`}>
            {onClose && (
                <div className="flex justify-end pt-3 md:hidden">
                    <button
                        onClick={onClose}
                        aria-label="Close navigation"
                        className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    >
                        <IoClose className="h-5 w-5" />
                    </button>
                </div>
            )}
            <div className="flex justify-center mb-4">
                <Image
                    src="/tasgip_icon.svg"
                    alt="Tasgip Logo"
                    width={96}
                    height={96}
                    priority
                    className="object-contain"
                />
            </div>

            {/* Workspace */}
            <div className="flex items-center gap-2 px-1 mb-1">
                <span className="text-xs text-gray-400 dark:text-gray-500">▸</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Demo Workspace</span>
            </div>

            {/* Project */}
            <div className="flex items-center gap-2 px-1 pl-5 mb-3">
                <span className="text-xs text-gray-400 dark:text-gray-500">▸</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Demo Project</span>
            </div>

            {/* Views under the project */}
            <div className="pl-8">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                    Views
                </div>
                <nav className="flex flex-col gap-1 mb-4">
                    <Link
                        href="/"
                        className={`px-3 py-2 rounded-md text-sm transition-colors ${pathname === "/"
                            ? "bg-blue-600 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                    >
                        Multi-backlog Kanban
                    </Link>
                </nav>

                <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
                    Backlogs
                </div>
                <nav className="flex flex-col gap-1 mb-6">
                    {BACKLOGS.map((b) => {
                        const isActive = pathname === `/backlogs/${b.id}`;
                        return (
                            <Link
                                key={b.id}
                                href={`/backlogs/${b.id}`}
                                className={`px-3 py-2 rounded-md text-sm transition-colors ${isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                            >
                                {b.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="space-y-3 mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        Built by Jaime. One task, any team, zero duplicates. Interested in cross-team work flows? Let&apos;s talk.
                    </p>
                    <button
                        type="button"
                        data-tally-open={TALLY_FORM_ID}
                        data-tally-layout="modal"
                        data-tally-overlay="1"
                        data-tally-emoji-animation="none"
                        data-tally-auto-close="3000"
                        data-tally-form-events-forwarding="1"
                        onClick={() => track("notify_form_opened")}
                        className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                        Notify me when it ships
                    </button>
                    <a
                        href="https://www.linkedin.com/in/jaimegalanmartinez/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track("linkedin_clicked")}
                        className="mt-2 flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        <BsLinkedin className="w-4 h-4" />
                        Reach out
                    </a>
                </div>
            </div>

            <div className="mt-auto px-2 pb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} Tasgip
                </p>
            </div>
        </aside>
    );
}
