import { notFound } from "next/navigation";
import BacklogTasksClient from "@/components/BacklogTasksClient";
import { mockTasks } from "@/mocks/tasks";
import { BACKLOGS } from "@/mocks/backlogs";

export function generateStaticParams() {
    return BACKLOGS.map((b) => ({ id: b.id }));
}

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function BacklogTasksPage({ params }: PageProps) {
    const { id } = await params;
    const backlog = BACKLOGS.find(b => b.id === id);
    if (!backlog) notFound();
    const tasksForBacklog = mockTasks.filter(task => task.backlog_id === backlog.id_number);

    return (
        <BacklogTasksClient
            backlogName={backlog?.name ?? ""}
            tasks={tasksForBacklog}
        />
    );
}
