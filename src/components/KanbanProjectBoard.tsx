"use client";

import { DragDropProvider, type DragDropEventHandlers } from "@dnd-kit/react";
import KanbanBacklog from "@/components/KanbanBacklog";
import { Task, TaskStatus } from "@/types";
import { useState } from "react";
import { STATUS_LABELS } from "@/lib/taskStyles";
import { track } from "@vercel/analytics";

interface BacklogSummary {
  id: string;
  id_number: number;
  name: string;
}

interface KanbanProjectBoardProps {
  tasks: Task[];
  backlogs: BacklogSummary[];
  onTaskClick?: (task: Task) => void;
}

function getTaskIdFromSourceData(source: { data?: Record<string, unknown> } | null | undefined): number | null {
  const taskId = source?.data?.taskId;
  return typeof taskId === "number" ? taskId : null;
}

function getDropDestination(target: { data?: Record<string, unknown> } | null | undefined): {
  backlogId: number;
  status: TaskStatus;
} | null {
  const backlogId = target?.data?.backlogId;
  const status = target?.data?.status;

  if (typeof backlogId !== "number") {
    return null;
  }

  if (status !== "todo" && status !== "in_progress" && status !== "done" && status !== "ready_for_handoff") {
    return null;
  }

  return { backlogId, status };
}

export default function KanbanProjectBoard({ tasks, backlogs, onTaskClick }: KanbanProjectBoardProps) {
  const [workspaceTasks, setWorkspaceTasks] = useState(tasks);
  const [announcement, setAnnouncement] = useState("");

  const handleDragEnd: NonNullable<DragDropEventHandlers["onDragEnd"]> = (event) => {
    if (event.canceled) {
      return;
    }

    const taskId = getTaskIdFromSourceData(event.operation.source);
    const destination = getDropDestination(event.operation.target);

    if (!taskId || !destination) {
      return;
    }

    const moved = workspaceTasks.find((t) => t.id === taskId);
    if (moved && (moved.backlog_id !== destination.backlogId || moved.status !== destination.status)) {
      const destBacklog = backlogs.find((b) => b.id_number === destination.backlogId);
      setAnnouncement(
        `Moved "${moved.title}" to ${destBacklog?.name ?? "another backlog"} — ${STATUS_LABELS[destination.status]}`
      );
      if (moved.backlog_id !== destination.backlogId) {
        track("task_moved_between_backlogs", {
          from_backlog: moved.backlog_id,
          to_backlog: destination.backlogId,
          from_status: moved.status,
          to_status: destination.status,
        });
      } else if (moved.status !== destination.status) {
        track("task_moved_between_states", {
          backlog: destination.backlogId,
          from_status: moved.status,
          to_status: destination.status,
        });
      }
    }

    setWorkspaceTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId &&
        (task.backlog_id !== destination.backlogId || task.status !== destination.status)
          ? { ...task, backlog_id: destination.backlogId, status: destination.status }
          : task
      )
    );
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="space-y-6">
        {backlogs.map((backlog) => (
          <KanbanBacklog
            key={backlog.id}
            title={`${backlog.name} backlog`}
            backlogId={backlog.id_number}
            tasks={workspaceTasks.filter((task) => task.backlog_id === backlog.id_number)}
            enableDnd
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </DragDropProvider>
  );
}
