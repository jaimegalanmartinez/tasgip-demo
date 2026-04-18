<p align="center">
  <img src="public/tasgip_icon.svg" alt="Tasgip Logo" width="80" />
</p>

<h1 align="center">Tasgip Demo</h1>

<p align="center">
  <strong>One task, any team.</strong><br/>
  Exploring a new model for cross-functional team collaboration.
</p>

<p align="center">
  <a href="https://demo.tasgip.eu"><strong>Live: demo.tasgip.eu</strong></a>
</p>

<p align="center">
  <a href="https://demo.tasgip.eu">
    <img src="https://demo.tasgip.eu/opengraph-image" alt="Tasgip demo preview" width="600" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/dnd--kit-drag%20%26%20drop-7C3AED?style=for-the-badge" alt="dnd-kit" />
  <img src="https://img.shields.io/badge/Vercel-deploy-black?style=for-the-badge&logo=vercel" alt="Vercel" />
</p>

---

## What this demo explores

Most task managers are team-siloed. A task belongs to one board, one team. When work crosses team boundaries — design hands off to engineering, engineering hands off to QA — you either duplicate the ticket or lose visibility.

Tasgip explores a different model: **one task, any team**. Drag a task freely between backlogs (Design, Engineering, QA) and between states (To Do, In Progress, Done, Ready for Handoff) — in any direction, without creating copies.

---

## Try it

1. Drag a task card between **columns** (change its state)
2. Drag a task card between **backlogs** (reassign it to another team)
3. Move a task to **Ready for Handoff** and drag it to a different team's backlog
4. Click **Reset** to restore the original demo data

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 — static export (`output: "export"`) |
| UI | React 19 with React Compiler |
| Drag & Drop | [@dnd-kit](https://dndkit.com/) |
| Styling | TailwindCSS v4 |
| Analytics | Vercel Analytics — cookieless, GDPR-compliant |
| Email capture | Tally.so |

No backend. No database. Fully static — all data is mock, resets on page reload.

---

## Run locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # generates out/
pnpm dlx serve out  # preview production build
```

---

## Context

Solo portfolio project by [Jaime Galan Martinez](https://www.linkedin.com/in/jaimegalanmartinez/) exploring cross-team task management patterns.

---

## License

© 2026 Jaime Galan Martinez. All rights reserved.
Source is public for portfolio purposes. The code, Tasgip name, logo, and brand assets may not be reused or redistributed without permission.
