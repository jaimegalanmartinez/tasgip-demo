"use client";

import { useState } from "react";
import TaskList from "@/components/TaskList";
import TaskDetailPanel from "@/components/TaskDetailPanel";
import { Task } from "@/types";
import { track } from "@vercel/analytics";

interface BacklogTasksClientProps {
    backlogName: string;
    tasks: Task[];
}

export default function BacklogTasksClient({ backlogName, tasks }: BacklogTasksClientProps) {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{backlogName} Backlog</h1>
            <p className="text-sm text-gray-500 mb-4">Tasks list</p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="h-[calc(100vh-160px)] overflow-y-auto">
                    <TaskList tasks={tasks} onTaskClick={(task) => { track("task_detail_opened", { task_type: task.type, task_status: task.status, view: "backlog" }); setSelectedTask(task); }} />
                </div>
            </div>

            {selectedTask && (
                <TaskDetailPanel
                    task={selectedTask}
                    backlogName={backlogName}
                    onClose={() => setSelectedTask(null)}
                />
            )}
        </div>
    );
}
