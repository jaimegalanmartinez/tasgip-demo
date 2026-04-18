"use client";

import { useDroppable } from "@dnd-kit/react";
import TaskCardKanban from "@/components/TaskCardKanban";
import { Task, TaskStatus } from "@/types";

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  backlogId: number;
  status?: TaskStatus;
  droppableId?: string;
  enableDrop?: boolean;
  enableDrag?: boolean;
  onTaskClick?: (task: Task) => void;
}

export default function KanbanColumn({
  title,
  tasks,
  backlogId,
  status,
  droppableId,
  enableDrop = false,
  enableDrag = false,
  onTaskClick,
}: KanbanColumnProps) {
  const columnId = droppableId ?? `column-${status ?? title}`;
  const isDroppable = enableDrop && Boolean(status);
  const { isDropTarget, ref } = useDroppable({
    id: columnId,
    type: "column",
    accept: ["task"],
    data: {
      backlogId,
      status,
    },
    disabled: !isDroppable,
  });

  return (
    <div
      ref={ref}
      aria-label={`${title} — ${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`}
      className={`w-full rounded-xl border p-2 md:p-3 transition-colors ${
        isDropTarget
          ? "border-blue-400 bg-blue-50/80 dark:border-blue-400 dark:bg-blue-950/40"
          : "border-slate-200 bg-slate-100/70 dark:border-slate-700 dark:bg-slate-800/60"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
          {title}
        </h3>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-300">
          {tasks.length}
        </span>
      </div>

      {status === "ready_for_handoff" && tasks.length > 0 && (
        <p className="mb-2 text-sm text-slate-400 dark:text-slate-500">
          Drag to another team&apos;s backlog to hand off.
        </p>
      )}

      <div className="space-y-2 md:space-y-3">
        {tasks.map((task) => (
          <TaskCardKanban
            key={task.id}
            task={task}
            draggable={enableDrag}
            draggableId={`task-${task.id}`}
            draggableBacklogId={backlogId}
            onClick={onTaskClick ? () => onTaskClick(task) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
