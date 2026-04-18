"use client";

import { useDraggable } from "@dnd-kit/react";
import { FaBug, FaTasks } from "react-icons/fa";
import { Task } from "@/types";
import { capitalize } from "@/lib/utils";
import { PRIORITY_STYLES, TYPE_ICON_COLOR, BORDER_LEFT_COLOR } from "@/lib/taskStyles";

interface TaskCardProps {
    task: Task;
    draggable?: boolean;
    draggableId?: string;
    draggableBacklogId?: number;
    onClick?: () => void;
}

export default function TaskCardKanban({ task, draggable = false, draggableId, draggableBacklogId, onClick }: TaskCardProps) {
    const Icon = task.type === "bug" ? FaBug : FaTasks;
    const { isDragging, ref } = useDraggable({
        id: draggableId ?? `task-${task.id}`,
        type: "task",
        data: {
            taskId: task.id,
            backlogId: draggableBacklogId ?? task.backlog_id,
            status: task.status,
        },
        disabled: !draggable,
    });

    return (
        <article
            ref={ref}
            onClick={!isDragging ? onClick : undefined}
            tabIndex={draggable || onClick ? 0 : undefined}
            aria-label={task.title}
            aria-roledescription={draggable ? "Draggable task" : undefined}
            className={`border-l-4 ${BORDER_LEFT_COLOR[task.type]} rounded-lg border border-slate-200 bg-white p-2.5 md:p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900
            ${draggable ? "cursor-grab active:cursor-grabbing select-none touch-none" : onClick ? "cursor-pointer" : ""} ${isDragging ? "opacity-60" : ""}`}
        >
            <div className="flex items-start justify-between gap-2 md:gap-4">
                <div className="flex gap-3 min-w-0">
                    <Icon className={`mt-1 text-base ${TYPE_ICON_COLOR[task.type]} dark:text-gray-400`} />

                    <div className="min-w-0">
                        <h3 className="font-semibold leading-tight text-slate-900 dark:text-slate-100 break-words">
                            {task.title}
                        </h3>
                    </div>
                </div>

                <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${PRIORITY_STYLES[task.priority]}`}>
                    {capitalize(task.priority)}
                </span>
            </div>
        </article>
    );
}
