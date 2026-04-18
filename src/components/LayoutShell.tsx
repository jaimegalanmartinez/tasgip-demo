"use client";

import { useState } from "react";
import Image from "next/image";
import { IoMenu } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { track } from "@vercel/analytics";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-40 flex items-center gap-3 bg-white border-b border-gray-200 px-4 py-3 md:hidden dark:bg-gray-900 dark:border-gray-700">
                <button
                    onClick={() => { track("mobile_nav_opened"); setSidebarOpen(true); }}
                    aria-label="Open navigation"
                    className="rounded-md p-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                    <IoMenu className="h-6 w-6" />
                </button>
                <Image src="/tasgip_icon.svg" alt="Tasgip" width={28} height={28} />
            </div>

            <Sidebar />

            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                    <div className="relative z-10 h-full w-64">
                        <Sidebar onClose={() => setSidebarOpen(false)} />
                    </div>
                </div>
            )}

            {/* Main content — top padding on mobile for fixed top bar */}
            <main className="flex-1 pt-14 p-3 md:pt-0 md:p-6">{children}</main>
        </>
    );
}
