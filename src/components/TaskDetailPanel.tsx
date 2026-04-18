"use client";

import { useEffect } from "react";
import { FaBug, FaTasks } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Task, TaskStatus } from "@/types";
import { MOCK_USERS } from "@/mocks/users";
import { capitalize } from "@/lib/utils";
import { PRIORITY_STYLES, STATUS_LABELS } from "@/lib/taskStyles";

interface TaskDetailPanelProps {
    task: Task;
    backlogName: string;
    onClose: () => void;
}

const STATUS_STYLES: Record<TaskStatus, string> = {
    todo: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
    in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    done: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    ready_for_handoff: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
    });
}

function Avatar({ name }: { name: string }) {
    const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    return (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            {initials}
        </span>
    );
}

export default function TaskDetailPanel({ task, backlogName, onClose }: TaskDetailPanelProps) {
    const Icon = task.type === "bug" ? FaBug : FaTasks;
    const iconColor = task.type === "bug" ? "text-red-500" : "text-blue-500";
    const assignee = task.assignee_id ? MOCK_USERS[task.assignee_id] : null;
    const createdBy = task.created_by ? MOCK_USERS[task.created_by] : null;

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

            {/* Panel */}
            <aside className="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl dark:bg-slate-900">

                {/* ── Top bar: close only ── */}
                <div className="flex justify-end p-4 border-b border-slate-200 dark:border-slate-700">
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                    >
                        <IoClose className="h-5 w-5" />
                    </button>
                </div>

                {/* ── Scrollable body ── */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">

                    {/* Type + backlog breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Icon className={`text-base ${iconColor}`} />
                        <span>{capitalize(task.type)}</span>
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span>{backlogName}</span>
                    </div>

                    {/* Title — first thing to read */}
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {task.title}
                    </h2>

                    {/* Status + priority badges */}
                    <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[task.status]}`}>
                            {STATUS_LABELS[task.status]}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${PRIORITY_STYLES[task.priority]}`}>
                            {capitalize(task.priority)} priority
                        </span>
                    </div>

                    {/* Description */}
                    {task.description && (
                        <>
                            <hr className="border-slate-200 dark:border-slate-700" />
                            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                                {task.description}
                            </p>
                        </>
                    )}

                    {/* Meta rows */}
                    <hr className="border-slate-200 dark:border-slate-700" />
                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                            <dt className="text-slate-700 dark:text-slate-300">Backlog</dt>
                            <dd className="font-medium text-slate-900 dark:text-slate-100">{backlogName}</dd>
                        </div>
                        {assignee && (
                            <div className="flex justify-between items-center">
                                <dt className="text-slate-700 dark:text-slate-300">Assignee</dt>
                                <dd className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                                    <Avatar name={assignee.name} />
                                    {assignee.name}
                                </dd>
                            </div>
                        )}
                        {createdBy && (
                            <div className="flex justify-between items-center">
                                <dt className="text-slate-700 dark:text-slate-300">Created by</dt>
                                <dd className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                                    <Avatar name={createdBy.name} />
                                    {createdBy.name}
                                </dd>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <dt className="text-slate-700 dark:text-slate-300">Created</dt>
                            <dd className="font-medium text-slate-900 dark:text-slate-100">{formatDate(task.created_at)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-slate-700 dark:text-slate-300">Updated</dt>
                            <dd className="font-medium text-slate-900 dark:text-slate-100">{formatDate(task.updated_at)}</dd>
                        </div>
                        {task.status === "done" && task.finished_at && (
                            <div className="flex justify-between">
                                <dt className="text-slate-700 dark:text-slate-300">Finished</dt>
                                <dd className="font-medium text-slate-900 dark:text-slate-100">{formatDate(task.finished_at)}</dd>
                            </div>
                        )}
                    </dl>
                </div>
            </aside>
        </div>
    );
}
