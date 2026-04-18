export type TaskStatus = "todo" | "in_progress" | "done" | "ready_for_handoff";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskType = "task" | "bug";

export interface Task {
    id: number;
    backlog_id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    type: TaskType;
    assignee_id?: number;
    created_by?: number;
    created_at: string;
    updated_at: string;
    finished_at?: string | null;
}

export interface Backlog {
    id: string;
    id_number: number;
    name: string;
}

export interface StatusColumn {
    key: TaskStatus;
    label: string;
}
