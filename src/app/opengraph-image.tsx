import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Tasgip — One task, any team";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DIVIDER_COLOR = "rgba(59,130,246,0.3)";
const MUTED_TEXT = "#94a3b8";
const DARK_BORDER = "#30363d";

export default function OgImage() {
    const columns = [
        { label: "To Do", color: MUTED_TEXT, highlight: false },
        { label: "In Progress", color: "#3b82f6", highlight: false },
        { label: "Done", color: "#22c55e", highlight: false },
        { label: "Ready for Handoff", color: "#a78bfa", highlight: true },
    ];

    const backlogs = [
        { name: "Design", tasks: [3, 2, 2, 1] },
        { name: "Engineering", tasks: [2, 3, 1, 2] },
        { name: "QA", tasks: [1, 2, 3, 1] },
    ];

    return new ImageResponse(
        (
            <div
                style={{
                    width: 1200,
                    height: 630,
                    background: "#0d1117",
                    display: "flex",
                    flexDirection: "column",
                    padding: "48px 64px",
                    fontFamily: "system-ui, sans-serif",
                    position: "relative",
                }}
            >
                {/* Top accent bar */}
                <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: 6,
                    background: "linear-gradient(90deg, #3B82F6, #EF4444)",
                }} />

                {/* Header row */}
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 10 }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="150 30 202 452"
                        width={40}
                        height={90}
                    >
                        <line x1="220" y1="76" x2="196" y2="270" stroke="#3B82F6" strokeWidth="76" strokeLinecap="round" />
                        <line x1="306" y1="270" x2="282" y2="436" stroke="#EF4444" strokeWidth="76" strokeLinecap="round" />
                        <line x1="196" y1="270" x2="240" y2="270" stroke="#EF4444" strokeWidth="76" strokeLinecap="round" />
                        <line x1="262" y1="270" x2="306" y2="270" stroke="#3B82F6" strokeWidth="76" strokeLinecap="round" />
                    </svg>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span style={{ fontSize: 52, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-1.5px" }}>
                            Tasgip
                        </span>
                        <div style={{
                            background: "#1e3a5f",
                            color: "#93c5fd",
                            fontSize: 16,
                            fontWeight: 700,
                            padding: "6px 16px",
                            borderRadius: 20,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                        }}>
                            Demo
                        </div>
                    </div>
                </div>

                {/* Tagline */}
                <p style={{ fontSize: 21, color: MUTED_TEXT, margin: "0 0 28px 0", fontWeight: 400 }}>
                    One task, any team. No more duplicating tickets across boards.
                </p>

                {/* Divider above kanban */}
                <div style={{ height: 2, background: DIVIDER_COLOR, marginBottom: 16 }} />

                {/* Column header row */}
                <div style={{ display: "flex", gap: 8, marginBottom: 8, paddingLeft: 118 }}>
                    {columns.map((col, ci) => (
                        <div key={ci} style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 8px",
                            borderRadius: 6,
                            background: col.highlight ? "rgba(139,92,246,0.15)" : "transparent",
                            border: col.highlight ? "1px solid rgba(139,92,246,0.4)" : "1px solid transparent",
                        }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.color, flexShrink: 0 }} />
                            <span style={{
                                fontSize: 11,
                                fontWeight: col.highlight ? 700 : 600,
                                color: col.highlight ? "#c4b5fd" : MUTED_TEXT,
                                letterSpacing: "0.02em",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}>
                                {col.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Mini kanban rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                    {backlogs.map((backlog, bi) => (
                        <div key={bi} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <div style={{
                                width: 110, fontSize: 12, fontWeight: 700,
                                color: "#cbd5e1", textTransform: "uppercase",
                                letterSpacing: "0.06em", flexShrink: 0,
                            }}>
                                {backlog.name}
                            </div>
                            {columns.map((col, ci) => (
                                <div key={ci} style={{
                                    flex: 1, height: 48,
                                    background: col.highlight ? "rgba(139,92,246,0.1)" : "#161b22",
                                    borderRadius: 8,
                                    border: col.highlight ? "1px solid rgba(139,92,246,0.35)" : "1px solid #30363d",
                                    display: "flex", alignItems: "center",
                                    paddingLeft: 10,
                                }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                        {Array.from({ length: Math.max(1, backlog.tasks[ci] ?? 1) }).map((_, i) => (
                                            <div key={i} style={{
                                                height: 5,
                                                width: 30 + (i * 12),
                                                borderRadius: 3,
                                                background: col.highlight ? "rgba(167,139,250,0.4)" : DARK_BORDER,
                                            }} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginTop: 24,
                    paddingTop: 18, borderTop: `2px solid ${DIVIDER_COLOR}`,
                }}>
                    <span style={{ fontSize: 17, color: MUTED_TEXT, fontWeight: 500 }}>
                        Built by Jaime Galan Martinez
                    </span>
                    <span style={{ fontSize: 17, color: "#f1f5f9", fontWeight: 600 }}>
                        demo.tasgip.eu
                    </span>
                </div>
            </div>
        ),
        { ...size }
    );
}
