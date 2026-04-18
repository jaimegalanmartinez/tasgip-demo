"use client";

import { useCallback, useState } from "react";
import KanbanProjectBoard from "@/components/KanbanProjectBoard";
import BoardHeader from "@/components/BoardHeader";
import TaskDetailPanel from "@/components/TaskDetailPanel";
import { BACKLOGS } from "@/mocks/backlogs";
import { mockTasks } from "@/mocks/tasks";
import { Task } from "@/types";
import { track } from "@vercel/analytics";

export default function Home() {
  const [resetKey, setResetKey] = useState(0);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCloseTask = useCallback(() => setSelectedTask(null), []);
  const handleReset = useCallback(() => {
    setResetKey((k) => k + 1);
    setSelectedTask(null);
  }, []);

  const selectedBacklogName = selectedTask
    ? (BACKLOGS.find((b) => b.id_number === selectedTask.backlog_id)?.name ?? "")
    : "";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-7xl space-y-4 md:space-y-6 p-2 md:p-6 lg:p-8">
        <BoardHeader onReset={handleReset} />
        <KanbanProjectBoard
          key={resetKey}
          tasks={mockTasks}
          backlogs={BACKLOGS}
          onTaskClick={(task) => { track("task_detail_opened", { task_type: task.type, task_status: task.status, view: "kanban" }); setSelectedTask(task); }}
        />
      </div>

      {selectedTask && (
        <TaskDetailPanel
          task={selectedTask}
          backlogName={selectedBacklogName}
          onClose={handleCloseTask}
        />
      )}
    </main>
  );
}
