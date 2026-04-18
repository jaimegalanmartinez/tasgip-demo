"use client";

import { Task } from "@/types"; // define a Task type matching your backend
import TaskCardList from "./TaskCardList";

interface TaskListProps {
    tasks: Task[];
    onTaskClick?: (task: Task) => void;
}

export default function TaskList({ tasks, onTaskClick }: TaskListProps) {
    if (!tasks.length)
        return <p className="text-gray-500 dark:text-gray-400">No tasks yet</p>;

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <TaskCardList key={task.id} task={task} onClick={onTaskClick ? () => onTaskClick(task) : undefined} />
            ))}
        </div>
    );
}
