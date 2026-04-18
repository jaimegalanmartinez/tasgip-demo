import { TaskStatus, TaskType } from "@/types";

export const STATUS_LABELS: Record<TaskStatus, string> = {
    todo: "To Do",
    in_progress: "In Progress",
    done: "Done",
    ready_for_handoff: "Ready for Handoff",
};

export const PRIORITY_STYLES: Record<string, string> = {
    urgent: "bg-purple-200 text-purple-700",
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
};

export const TYPE_ICON_COLOR: Record<TaskType, string> = {
    bug: "text-red-500",
    task: "text-blue-500",
};

export const BORDER_LEFT_COLOR: Record<TaskType, string> = {
    bug: "border-red-500",
    task: "border-blue-500",
};
