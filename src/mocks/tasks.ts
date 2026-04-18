import { Task } from "@/types";

// Each task is a single unit of work that moves between team backlogs.
// No duplicates one card per feature, drag it to the next team when ready.
//
// Board narrative:
//   "Onboarding screens"  → ready_for_handoff in Design → drag to Engineering
//   "Login error states"  → ready_for_handoff in Design → drag to Engineering
//   "Search filters"      → already moved from Design → now in_progress in Engineering
//   "Dark mode"           → ready_for_handoff in QA → needs to go back to Engineering (bug found)
export const mockTasks: Task[] = [
    // ── Design ─────────────────────────────────────────────────────────────
    // Alice (1) = Design, Bob (2) = Engineering, Sara (3) = QA, Dan (4) = cross-team / PM
    {
        id: 1, backlog_id: 1, title: "Onboarding screens", status: "ready_for_handoff",
        priority: "high", type: "task", created_at: "2026-03-28", updated_at: "2026-04-07",
        assignee_id: 1, created_by: 4,
        description: "Screens and flows for first-time user onboarding: welcome, workspace creation, and first task. Figma file finalized and approved. Ready for Engineering to implement.",
    },
    {
        id: 2, backlog_id: 1, title: "Login error states", status: "ready_for_handoff",
        priority: "medium", type: "task", created_at: "2026-04-01", updated_at: "2026-04-08",
        assignee_id: 1, created_by: 1,
        description: "Designs for all login error scenarios: wrong password, account locked, network failure. Includes copy and micro-animation specs. Handoff to Engineering.",
    },
    {
        id: 3, backlog_id: 1, title: "Task card redesign", status: "in_progress",
        priority: "medium", type: "task", created_at: "2026-04-05", updated_at: "2026-04-09",
        assignee_id: 1, created_by: 4,
        description: "Reworking the task card to surface priority and handoff status more clearly. Exploring compact vs expanded variants. Still in review with the team.",
    },
    {
        id: 4, backlog_id: 1, title: "Settings page layout", status: "todo",
        priority: "low", type: "task", created_at: "2026-04-08", updated_at: "2026-04-08",
        assignee_id: 1, created_by: 4,
        description: "Design the workspace settings page: members, billing, and integrations tabs. Not started, blocked until onboarding flow is shipped.",
    },
    {
        id: 5, backlog_id: 1, title: "Icon set update", status: "done",
        priority: "low", type: "task", created_at: "2026-03-20", updated_at: "2026-03-25",
        assignee_id: 1, created_by: 1,
        description: "Replaced legacy icon set with Phosphor icons across all components. No handoff needed, purely a design system update, already reflected in Figma.",
    },

    // ── Engineering ────────────────────────────────────────────────────────
    {
        id: 10, backlog_id: 2, title: "Search filters", status: "in_progress",
        priority: "high", type: "task", created_at: "2026-04-03", updated_at: "2026-04-09",
        assignee_id: 2, created_by: 4,
        description: "Arrived from Design. Implementing filter bar for task list: filter by status, priority, assignee, and backlog. API query params defined, UI wiring in progress.",
    },
    {
        id: 11, backlog_id: 2, title: "API rate limiting", status: "todo",
        priority: "medium", type: "task", created_at: "2026-04-07", updated_at: "2026-04-07",
        assignee_id: 2, created_by: 2,
        description: "Add per-workspace rate limiting to the Fastify API. Use a sliding window approach. Required before opening public access, no design needed.",
    },
    {
        id: 12, backlog_id: 2, title: "Fix drag on touch devices", status: "todo",
        priority: "high", type: "bug", created_at: "2026-04-08", updated_at: "2026-04-08",
        assignee_id: 2, created_by: 3,
        description: "Drag-and-drop fails intermittently on iOS Safari and Android Chrome. Tap activates drag but drop target doesn't register. Likely a touch event conflict with scroll.",
    },

    // ── QA ─────────────────────────────────────────────────────────────────
    {
        id: 20, backlog_id: 3, title: "Dark mode", status: "ready_for_handoff",
        priority: "medium", type: "bug", created_at: "2026-03-25", updated_at: "2026-04-09",
        assignee_id: 3, created_by: 3,
        description: "Dark mode implementation came from Engineering but fails on Safari, background colors bleed through on scrollable containers. Sending back to Engineering to fix before QA signs off.",
    },
    {
        id: 21, backlog_id: 3, title: "Cross-browser pass", status: "in_progress",
        priority: "medium", type: "task", created_at: "2026-04-06", updated_at: "2026-04-09",
        assignee_id: 3, created_by: 4,
        description: "Running the full test matrix across Chrome, Firefox, Safari, and Edge. Drag-and-drop and status transitions are the focus. Two Safari-specific issues logged so far.",
    },
    {
        id: 22, backlog_id: 3, title: "Notification emails", status: "todo",
        priority: "low", type: "task", created_at: "2026-04-09", updated_at: "2026-04-09",
        assignee_id: 3, created_by: 4,
        description: "Test handoff notification emails end-to-end: trigger, delivery, formatting. Waiting for Engineering to ship the email service before QA can begin.",
    },
];
