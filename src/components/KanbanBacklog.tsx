import { Task, TaskStatus } from "@/types";
import KanbanColumn from "@/components/KanbanColumn";

const STATUS_COLUMNS: Array<{ status: TaskStatus; title: string }> = [
  { status: "todo", title: "To Do" },
  { status: "in_progress", title: "In Progress" },
  { status: "done", title: "Done" },
  { status: "ready_for_handoff", title: "Ready for Handoff" },
];

interface KanbanBacklogProps {
  title: string;
  backlogId: number;
  tasks: Task[];
  enableDnd?: boolean;
  onTaskClick?: (task: Task) => void;
}

export default function KanbanBacklog({ title, backlogId, tasks, enableDnd = false, onTaskClick }: KanbanBacklogProps) {
  const columns = STATUS_COLUMNS.map((column) => ({
    title: column.title,
    status: column.status,
    droppableId: `backlog-${backlogId}|status-${column.status}`,
    tasks: tasks.filter((task) => task.status === column.status),
  }));

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/80 p-3 md:p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h2>
      </div>
      <div className="overflow-x-auto -mx-1 px-1 pb-2">
        <div className="grid grid-cols-4 gap-2 md:gap-4 min-w-[700px]">
          {columns.map((column) => (
            <KanbanColumn
              key={`${title}-${column.title}`}
              title={column.title}
              tasks={column.tasks}
              status={column.status}
              droppableId={column.droppableId}
              backlogId={backlogId}
              enableDrop={enableDnd}
              enableDrag={enableDnd}
              onTaskClick={onTaskClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
