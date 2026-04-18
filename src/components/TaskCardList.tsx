"use client";

import { FaBug, FaTasks } from "react-icons/fa";
import { Task } from "@/types";
import { capitalize } from "@/lib/utils";
import { PRIORITY_STYLES, TYPE_ICON_COLOR, BORDER_LEFT_COLOR } from "@/lib/taskStyles";

interface TaskCardProps {
    task: Task;
    onClick?: () => void;
}

function formatLabel(value: string) {
    const specialCases: Record<string, string> = {
        todo: "To do",
    };

    if (specialCases[value]) {
        return specialCases[value];
    }

    return value
        .split("_")
        .map(capitalize)
        .join(" ");
}

export default function TaskCardList({ task, onClick }: TaskCardProps) {
    const Icon = task.type === "bug" ? FaBug : FaTasks;

    const STATUS_STYLES: Record<string, string> = {
        todo: "bg-gray-100 text-gray-700",
        in_progress: "bg-blue-100 text-blue-700",
        done: "bg-green-100 text-green-700",
        ready_for_handoff: "bg-violet-100 text-violet-700",
    };

    return (
        <div onClick={onClick} className={`border-l-4 ${BORDER_LEFT_COLOR[task.type]} rounded-md p-3 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md
        transition hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer`}>
            <div className="flex items-start justify-between gap-4">
                {/* Left side */}
                <div className="flex gap-3">
                    <Icon className={`mt-1 ${TYPE_ICON_COLOR[task.type]} dark:text-gray-400`} />

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            {task.title}
                        </h3>

                        {task.description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {task.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Right side meta */}
                <div className="flex flex-col items-end gap-2 text-xs">
                    {/* Priority */}
                    <span className={`px-2 py-0.5 rounded-md whitespace-nowrap font-medium ${PRIORITY_STYLES[task.priority]}`}>
                        {capitalize(task.priority)}
                    </span>

                    {/* Status */}
                    <span className={`px-2 py-0.5 rounded-md whitespace-nowrap text-xs font-medium ${STATUS_STYLES[task.status]}`}>
                        {formatLabel(task.status)}
                    </span>
                </div>
            </div>
        </div>
    );
}
