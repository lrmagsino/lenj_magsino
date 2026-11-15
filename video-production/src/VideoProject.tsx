import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type VideoProjectId =
  | "docugraph"
  | "mayari"
  | "red-warriors"
  | "cs-expo"
  | "wedding";

export type VideoProjectProps = { projectId: VideoProjectId };

type ProjectVisual = {
  name: string;
  cover: string;
  accent: string;
  accentSoft: string;
  title: string;
  kicker: string;
  screenshot?: string;
};

const projects: Record<VideoProjectId, ProjectVisual> = {
  docugraph: {
    name: "DocuGraph",
    cover: "images/projects/docugraph/cover.png",
    accent: "#48bd72",
    accentSoft: "#b1f1c4",
    title: "Documents, understood in context.",
    kicker: "OCR · layout analysis · graph-style relationships",
  },
  mayari: {
    name: "Mayari",
    cover: "images/projects/mayari/cover.png",
    accent: "#c5a1ff",
    accentSoft: "#f1d58a",
    title: "A calmer view of course deadlines.",
    kicker: "Canvas companion · browser extension",
    screenshot: "images/projects/mayari/extension-popup.webp",
  },
  "red-warriors": {
    name: "Red Warriors AOS & POS",
    cover: "images/projects/red-warriors/cover.png",
    accent: "#e64a54",
    accentSoft: "#f6d2d2",
    title: "Two roles. One ordering concept.",
    kicker: "Android prototypes · sample ordering flow",
  },
  "cs-expo": {
    name: "CS Expo 2026",
    cover: "images/projects/cs-expo/cover.png",
    accent: "#61d5cf",
    accentSoft: "#ff9d67",
    title: "Mission: Tomorrow.",
    kicker: "9–12 November 2026 · FEU Tech Computer Science",
    screenshot: "images/projects/cs-expo/hero.png",
  },
  wedding: {
    name: "Fritz & Princess",
    cover: "images/projects/wedding/cover.png",
    accent: "#b06a72",
    accentSoft: "#e4c69f",
    title: "Together today, tomorrow, and always.",
    kicker: "April 23, 2027 · Antipolo, Rizal",
    screenshot: "images/projects/wedding/desktop.webp",
  },
};

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

function fade(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], clamp);
}

function Panel({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        minWidth: 0,
        border: "1px solid rgba(255,255,255,.14)",
        borderRadius: 22,
        background: "rgba(10,13,21,.91)",
        boxShadow: "0 30px 90px rgba(0,0,0,.32)",
        backdropFilter: "blur(18px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return (
    <div
      style={{
        color,
        fontFamily: "Arial, sans-serif",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 2.5,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function Pill({
  children,
  color,
  background,
}: {
  children: ReactNode;
  color: string;
  background: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: 30,
        border: `1px solid ${color}66`,
        borderRadius: 999,
        padding: "0 12px",
        color,
        background,
        fontFamily: "Arial, sans-serif",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1.1,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function CoverScene({
  project,
  frame,
}: {
  project: ProjectVisual;
  frame: number;
}) {
  const phase = (frame / 359) * Math.PI * 2;
  const scale = 1 + (0.034 * (1 - Math.cos(phase))) / 2;
  const x = Math.sin(phase) * 7;
  const y = Math.sin(phase * 2) * 4;
  const glint = fade(frame, 0, 58) * (1 - fade(frame, 44, 75));

  return (
    <>
      <AbsoluteFill
        style={{
          overflow: "hidden",
          backgroundColor: "#08090d",
        }}
      >
        <Img
          src={staticFile(project.cover)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(4,8,14,.12) 0%, rgba(4,8,14,.06) 45%, rgba(4,8,14,.48) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: glint,
          transform: `translateX(${interpolate(frame, [0, 64], [-1280, 1280], clamp)}px)`,
          background: `linear-gradient(105deg, transparent 38%, ${project.accent}22 48%, ${project.accentSoft}55 50%, ${project.accent}22 52%, transparent 62%)`,
        }}
      />
    </>
  );
}

function FilmLabels({
  project,
  titleOpacity,
}: {
  project: ProjectVisual;
  titleOpacity: number;
}) {
  return (
    <AbsoluteFill
      style={{
        opacity: titleOpacity,
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 34,
          left: 48,
          display: "flex",
          alignItems: "center",
          gap: 12,
          border: "1px solid rgba(255,255,255,.22)",
          borderRadius: 999,
          padding: "8px 14px",
          background: "rgba(5,9,13,.82)",
          textShadow: "0 2px 18px rgba(0,0,0,.65)",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            background: project.accent,
            boxShadow: `0 0 18px ${project.accent}`,
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          LJM PORTFOLIO · PROJECT FILM
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 52,
          bottom: 36,
          maxWidth: 630,
          border: "1px solid rgba(255,255,255,.17)",
          borderRadius: 16,
          padding: "16px 20px 18px",
          background:
            "linear-gradient(115deg, rgba(4,8,14,.9), rgba(4,8,14,.58))",
          textShadow: "0 3px 24px rgba(0,0,0,.74)",
        }}
      >
        <div
          style={{
            color: project.accentSoft,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2.1,
            textTransform: "uppercase",
          }}
        >
          {project.kicker}
        </div>
        <div
          style={{
            marginTop: 7,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: -0.5,
          }}
        >
          {project.title}
        </div>
      </div>
    </AbsoluteFill>
  );
}

function DocuGraphScene({ frame, project }: { frame: number; project: ProjectVisual }) {
  const scan = interpolate(frame, [46, 148], [0, 1], {
    ...clamp,
  });
  const graphReveal = fade(frame, 150, 224);
  const dash = 360 - (frame * 7) % 360;
  const regionOpacity = (start: number) => fade(frame, start, start + 18);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 430px) minmax(0, 1fr)",
        gap: 24,
        height: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        padding: 22,
        color: "#eaf3ec",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Panel style={{ padding: 20, background: "rgba(246,252,247,.97)", color: "#193c27" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Eyebrow color="#208149">DOCUMENT SCAN</Eyebrow>
          <span style={{ fontSize: 11, color: "#47765a" }}>Illustrative input</span>
        </div>
        <div
          style={{
            position: "relative",
            height: 346,
            marginTop: 16,
            overflow: "hidden",
            border: "1px solid #d5e7d9",
            borderRadius: 12,
            background: "#fff",
            padding: "22px 24px",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#1d5b35" }}>
            RESEARCH PAPER · PAGE 02
          </div>
          {[0, 1, 2, 3].map((row) => (
            <div
              key={row}
              style={{
                width: row === 3 ? "72%" : "94%",
                height: 5,
                marginTop: row === 0 ? 20 : 10,
                borderRadius: 8,
                background: row === 0 ? "#b3c9b9" : "#dce8df",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: 28,
              top: 102,
              width: 166,
              height: 62,
              border: `2px solid ${project.accent}`,
              borderRadius: 6,
              opacity: regionOpacity(56),
            }}
          >
            <span style={{ position: "absolute", top: -19, left: 0, fontSize: 10, color: "#16723a" }}>
              TEXT REGION
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              right: 24,
              top: 192,
              width: 154,
              height: 92,
              border: "2px solid #87b797",
              borderRadius: 6,
              opacity: regionOpacity(76),
            }}
          >
            <span style={{ position: "absolute", top: -19, left: 0, fontSize: 10, color: "#16723a" }}>
              FIGURE REGION
            </span>
            <div style={{ position: "absolute", inset: 18, border: "1px dashed #b6d5bd" }} />
          </div>
          <div
            style={{
              position: "absolute",
              left: 42,
              bottom: 22,
              width: 126,
              height: 44,
              border: "2px solid #d4b264",
              borderRadius: 6,
              opacity: regionOpacity(96),
            }}
          >
            <span style={{ position: "absolute", top: -18, left: 0, fontSize: 10, color: "#806324" }}>
              TABLE REGION
            </span>
          </div>
          {[0, 1, 2].map((row) => (
            <div
              key={`lower-${row}`}
              style={{
                position: "absolute",
                left: 205,
                right: 32,
                bottom: 30 + row * 14,
                height: 4,
                borderRadius: 8,
                background: "#e4ece6",
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              top: `${10 + scan * 78}%`,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
              boxShadow: `0 0 14px ${project.accent}`,
              opacity: fade(frame, 42, 54) * (1 - fade(frame, 139, 158)),
            }}
          />
        </div>
        <div style={{ marginTop: 12, color: "#52715b", fontSize: 11 }}>
          OCR text · layout regions · no confidence score shown
        </div>
      </Panel>

      <div style={{ display: "grid", gridTemplateRows: "1fr 190px", gap: 16 }}>
        <Panel style={{ padding: 20 }}>
          <Eyebrow color={project.accentSoft}>WORKFLOW COMPARISON</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 15 }}>
            <div
              style={{
                border: `1px solid ${frame < 150 ? project.accent : "rgba(255,255,255,.14)"}`,
                borderRadius: 14,
                padding: 17,
                background: frame < 150 ? `${project.accent}14` : "rgba(255,255,255,.035)",
              }}
            >
              <div style={{ color: "#edf5ee", fontSize: 16, fontWeight: 700 }}>CNN-only baseline</div>
              <div style={{ marginTop: 13, color: "#b6c4b8", fontSize: 13, lineHeight: 1.7 }}>
                LayoutParser · Detectron2
                <br />
                Region detection + separate OCR path
              </div>
            </div>
            <div
              style={{
                border: `1px solid ${frame >= 150 ? project.accent : "rgba(255,255,255,.14)"}`,
                borderRadius: 14,
                padding: 17,
                background: frame >= 150 ? `${project.accent}14` : "rgba(255,255,255,.035)",
              }}
            >
              <div style={{ color: "#edf5ee", fontSize: 16, fontWeight: 700 }}>Graph-style workflow</div>
              <div style={{ marginTop: 13, color: "#b6c4b8", fontSize: 13, lineHeight: 1.7 }}>
                OCR · spatial heuristics
                <br />
                Shapes · connectors · structured export
              </div>
            </div>
          </div>
          <div style={{ marginTop: 14, color: "#a9b5aa", fontSize: 11 }}>
            The inspected graph aggregation is heuristic; no trained graph network is claimed.
          </div>
        </Panel>
        <Panel style={{ padding: "13px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Eyebrow color={project.accentSoft}>REGION RELATIONSHIPS</Eyebrow>
            <span style={{ color: "#a9b5aa", fontSize: 11 }}>Illustrative graph view</span>
          </div>
          <svg
            viewBox="0 0 680 112"
            style={{ display: "block", width: "100%", height: 105, marginTop: 5 }}
          >
            <path
              d="M72 55 L204 30 L340 58 L474 27 L606 56 M204 30 L244 88 L340 58 L414 88 L474 27 M72 55 L148 88 L244 88"
              fill="none"
              stroke={project.accent}
              strokeOpacity=".78"
              strokeWidth="2"
              strokeDasharray="8 8"
              strokeDashoffset={dash}
              style={{ opacity: graphReveal }}
            />
            {[
              [72, 55, "Text"],
              [204, 30, "Heading"],
              [340, 58, "Figure"],
              [474, 27, "Caption"],
              [606, 56, "Text"],
              [148, 88, "Block"],
              [244, 88, "Table"],
              [414, 88, "Block"],
            ].map(([x, y, label]) => (
              <g key={`${x}-${y}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="9"
                  fill="#0c1b13"
                  stroke={project.accent}
                  strokeWidth="2"
                  style={{ opacity: graphReveal }}
                />
                <text
                  x={x}
                  y={Number(y) + 25}
                  fill="#c6d4c8"
                  fontSize="10"
                  textAnchor="middle"
                  style={{ opacity: graphReveal }}
                >
                  {label}
                </text>
              </g>
            ))}
          </svg>
        </Panel>
      </div>
    </div>
  );
}

function MayariScene({
  frame,
  project,
}: {
  frame: number;
  project: ProjectVisual;
}) {
  const reminder = fade(frame, 146, 174);
  const notificationPulse = 0.78 + (Math.sin(frame / 8) + 1) * 0.1;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 292px) minmax(0, 1fr)",
        gap: 26,
        height: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        padding: 22,
        fontFamily: "Arial, sans-serif",
        color: "#f6f0ff",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={project.accentSoft}>EXISTING EXTENSION SCREEN</Eyebrow>
        <div
          style={{
            marginTop: 12,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,.24)",
            borderRadius: 18,
            background: "#f7f7fb",
            boxShadow: "0 20px 55px rgba(0,0,0,.34)",
          }}
        >
          <Img
            src={staticFile(project.screenshot ?? "")}
            style={{ display: "block", width: "100%", height: 400, objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      </div>
      <Panel
        style={{
          alignSelf: "center",
          minHeight: 420,
          padding: 24,
          borderColor: `${project.accent}66`,
          background: "linear-gradient(135deg, rgba(42,25,70,.95), rgba(16,14,29,.94))",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <Eyebrow color={project.accentSoft}>CONCEPTUAL EXTENSION VIEW</Eyebrow>
            <div style={{ marginTop: 8, fontSize: 25, fontWeight: 700 }}>Your week, at a glance.</div>
          </div>
          <div
            style={{
              opacity: notificationPulse,
              display: "grid",
              placeItems: "center",
              width: 44,
              height: 44,
              borderRadius: 14,
              color: project.accentSoft,
              background: `${project.accent}22`,
              fontSize: 21,
            }}
          >
            ◉
          </div>
        </div>
        <div style={{ display: "flex", gap: 9, marginTop: 20 }}>
          {[
            ["TODAY", "1"],
            ["THIS WEEK", "2"],
            ["OVERDUE", "1"],
          ].map(([label, count]) => (
            <div
              key={label}
              style={{
                flex: 1,
                border: "1px solid rgba(255,255,255,.12)",
                borderRadius: 12,
                padding: "11px 12px",
                background: "rgba(255,255,255,.055)",
              }}
            >
              <div style={{ color: "#c9bfd7", fontSize: 9, letterSpacing: 1.2 }}>{label}</div>
              <div style={{ marginTop: 5, color: project.accentSoft, fontSize: 22, fontWeight: 700 }}>{count}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gap: 10, marginTop: 15 }}>
          {[
            ["Interface critique", "Human Computer Interaction", "Today · 11:59 PM"],
            ["API integration exercise", "Web Development", "In 3 days"],
            ["Research outline", "Software Engineering", "In 6 days"],
          ].map(([title, course, due], index) => {
            const rowOpacity = fade(frame, 57 + index * 13, 78 + index * 13);
            return (
              <div
                key={title}
                style={{
                  opacity: rowOpacity,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 15,
                  border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: 12,
                  padding: "12px 14px",
                  background: "rgba(255,255,255,.055)",
                }}
              >
                <div>
                  <div style={{ color: "#c7b5e3", fontSize: 10, letterSpacing: 1 }}>{course}</div>
                  <div style={{ marginTop: 4, fontSize: 14, fontWeight: 700 }}>{title}</div>
                </div>
                <Pill
                  color={index === 0 ? "#f5d77f" : project.accent}
                  background={index === 0 ? "rgba(245,215,127,.1)" : `${project.accent}18`}
                >
                  {due}
                </Pill>
              </div>
            );
          })}
        </div>
        <div
          style={{
            opacity: reminder,
            marginTop: 12,
            color: "#eee1fa",
            fontSize: 12,
          }}
        >
          Reminder preference · demo only
        </div>
        <div
          style={{
            marginTop: 14,
            borderTop: "1px solid rgba(255,255,255,.12)",
            paddingTop: 11,
            color: "#c2b5d3",
            fontSize: 10,
            letterSpacing: 0.4,
          }}
        >
          SAMPLE DATA · NO CANVAS CONNECTION · NO BROWSER NOTIFICATION SCHEDULED
        </div>
      </Panel>
    </div>
  );
}

function PhoneMockup({
  app,
  project,
  children,
}: {
  app: string;
  project: ProjectVisual;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        height: 474,
        boxSizing: "border-box",
        border: "7px solid #252126",
        borderRadius: 39,
        padding: 7,
        background: "#141216",
        boxShadow: "0 28px 65px rgba(0,0,0,.4)",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 27,
          color: "#292526",
          background: "#faf8f6",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            padding: "17px 17px 15px",
            color: "white",
            background: "linear-gradient(135deg,#921d30,#45131d)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Eyebrow color={project.accentSoft}>RED WARRIORS · {app}</Eyebrow>
            <span style={{ fontSize: 11, opacity: 0.82 }}>9:41</span>
          </div>
          <div style={{ marginTop: 7, fontSize: 19, fontWeight: 700 }}>
            {app === "AOS" ? "Order ahead" : "Order queue"}
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", padding: 16 }}>
          {children}
        </div>
        <div
          style={{
            padding: "10px 12px",
            borderTop: "1px solid #e8e1de",
            color: "#6d6261",
            textAlign: "center",
            fontSize: 9,
            letterSpacing: 1.2,
          }}
        >
          SAMPLE DATA · NO REAL ORDERS
        </div>
      </div>
    </div>
  );
}

function RedWarriorsScene({
  frame,
  project,
}: {
  frame: number;
  project: ProjectVisual;
}) {
  const statusIndex = frame < 142 ? 0 : frame < 202 ? 1 : 2;
  const statuses = ["Pending", "Preparing", "Ready"];
  const cartReveal = fade(frame, 66, 94);
  const queueReveal = fade(frame, 122, 150);

  return (
    <div
      style={{
        height: "100%",
        boxSizing: "border-box",
        padding: "18px 34px 14px",
        fontFamily: "Arial, sans-serif",
        color: "#f8eeee",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <div>
          <Eyebrow color={project.accentSoft}>AOS + POS · SAMPLE ORDER FLOW</Eyebrow>
          <div style={{ marginTop: 7, fontSize: 18, fontWeight: 700 }}>
            A local browser simulation, shown beside the independent Android prototypes.
          </div>
        </div>
        <Pill color="#f4d0d2" background="rgba(255,255,255,.06)">
          No shared backend
        </Pill>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 62,
          width: 820,
          minWidth: 0,
          margin: "16px auto 0",
        }}
      >
        <PhoneMockup app="AOS" project={project}>
          <Eyebrow color="#9b2638">CUSTOMER · SAMPLE MENU</Eyebrow>
          <div
            style={{
              marginTop: 12,
              border: "1px solid #e8e1de",
              borderRadius: 13,
              padding: 14,
              background: "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 9 }}>
              <div>
                <div style={{ color: "#7c7270", fontSize: 10 }}>MEALS</div>
                <div style={{ marginTop: 5, fontSize: 17, fontWeight: 700 }}>Burger</div>
              </div>
              <div style={{ color: "#9b2638", fontWeight: 700 }}>₱85</div>
            </div>
            <div
              style={{
                opacity: cartReveal,
                marginTop: 11,
                borderRadius: 9,
                padding: "9px 10px",
                color: "white",
                background: "#9b2638",
                fontSize: 11,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              + 1 IN SAMPLE CART
            </div>
          </div>
          <div
            style={{
              opacity: queueReveal,
              marginTop: 14,
              border: "1px solid #e8e1de",
              borderRadius: 13,
              padding: 13,
              background: "#fff",
            }}
          >
            <div style={{ color: "#7c7270", fontSize: 10, letterSpacing: 1 }}>LOCAL DEMO QUEUE</div>
            <div style={{ marginTop: 5, fontSize: 20, fontWeight: 700 }}>#101</div>
            <div style={{ marginTop: 3, color: "#766a68", fontSize: 11 }}>RW-DEMO-001</div>
          </div>
          <div style={{ marginTop: "auto", color: "#706463", fontSize: 11 }}>Cart total · ₱85</div>
        </PhoneMockup>
        <PhoneMockup app="POS" project={project}>
          <Eyebrow color="#9b2638">CANTEEN · LOCAL DEMO</Eyebrow>
          <div
            style={{
              marginTop: 12,
              border: "1px solid #e8e1de",
              borderRadius: 13,
              padding: 14,
              background: "white",
            }}
          >
            <div style={{ color: "#746a68", fontSize: 10 }}>ORDER · QUEUE #101</div>
            <div style={{ marginTop: 5, fontSize: 16, fontWeight: 700 }}>RW-DEMO-001</div>
            <div style={{ marginTop: 7, color: "#726867", fontSize: 12 }}>1 × Burger · ₱85</div>
            <div
              style={{
                marginTop: 12,
                display: "inline-flex",
                borderRadius: 999,
                padding: "6px 10px",
                color: "#842334",
                background: "#fae7e9",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {statuses[statusIndex]}
            </div>
          </div>
          <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
            {statuses.map((status, index) => (
              <div
                key={status}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  color: index <= statusIndex ? "#9b2638" : "#a69c9a",
                  fontSize: 11,
                  fontWeight: index === statusIndex ? 700 : 500,
                }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: 99,
                    background: index <= statusIndex ? "#9b2638" : "#ded8d6",
                  }}
                />
                {status}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "auto", color: "#706463", fontSize: 10 }}>
            Portfolio demo state · no payment
          </div>
        </PhoneMockup>
      </div>
      <div
        style={{
          marginTop: 10,
          color: "#f2dfe0",
          fontSize: 10,
          letterSpacing: 0.75,
          textAlign: "center",
        }}
      >
        PORTFOLIO BROWSER SIMULATION · SAMPLE STATE ONLY · ANDROID AOS/POS APPS ARE NOT CONNECTED
      </div>
    </div>
  );
}

function ExpoScene({
  frame,
  project,
}: {
  frame: number;
  project: ProjectVisual;
}) {
  const lift = spring({ frame: frame - 52, fps: 30, config: { damping: 22, stiffness: 95 } });
  const screenshotOpacity = fade(frame, 55, 82);
  const cardOpacity = fade(frame, 92, 116);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.08fr) minmax(0, .92fr)",
        gap: 22,
        height: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        padding: 22,
        fontFamily: "Arial, sans-serif",
        color: "#f4f4ec",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={project.accent}>PUBLISHED EVENT PLATFORM</Eyebrow>
        <div style={{ marginTop: 10, fontSize: 27, fontWeight: 700 }}>Events · Schedule · Speakers</div>
        <div style={{ marginTop: 9, color: "#d7e2dc", fontSize: 14 }}>
          9–12 November 2026 · FEU Tech Computer Science
        </div>
        <div
          style={{
            opacity: screenshotOpacity,
            transform: `translateY(${(1 - lift) * 18}px) perspective(1200px) rotateY(-3deg)`,
            marginTop: 20,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,.3)",
            borderRadius: 16,
            boxShadow: "0 25px 65px rgba(0,0,0,.42)",
          }}
        >
          <Img
            src={staticFile(project.screenshot ?? "")}
            style={{ display: "block", width: "100%", height: 315, objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div style={{ marginTop: 12, color: "#c2d5d0", fontSize: 11 }}>
          Lenj’s contribution · registration validation · error handling · responsive frontend
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateRows: "auto 1fr 1fr", gap: 13, alignContent: "center" }}>
        <div style={{ opacity: cardOpacity, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            ["90+", "CAPSTONE PROJECTS"],
            ["4", "DAYS"],
            ["12", "DEVDAY SESSIONS"],
            ["20+", "INDUSTRY PANELISTS"],
          ].map(([value, label]) => (
            <div
              key={label}
              style={{
                border: "1px solid rgba(255,255,255,.14)",
                borderRadius: 12,
                padding: "12px 9px",
                background: "rgba(5,24,28,.76)",
              }}
            >
              <div style={{ color: project.accentSoft, fontSize: 20, fontWeight: 700 }}>{value}</div>
              <div style={{ marginTop: 5, color: "#d1ded9", fontSize: 8, lineHeight: 1.35, letterSpacing: 0.6 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
        <Panel style={{ opacity: cardOpacity, padding: 17, background: "rgba(7,31,34,.91)" }}>
          <Eyebrow color={project.accent}>MONDAY · NOVEMBER 9</Eyebrow>
          <div style={{ marginTop: 8, fontSize: 18, fontWeight: 700 }}>33 published sessions</div>
          <div style={{ marginTop: 9, color: "#dae3de", fontSize: 12 }}>
            Panel · COMOconnect
            <span style={{ color: project.accentSoft }}> · DOCUGRAPH</span>
          </div>
        </Panel>
        <Panel style={{ opacity: cardOpacity, padding: 17, background: "rgba(7,31,34,.91)" }}>
          <Eyebrow color={project.accentSoft}>SPEAKERS · PUBLIC PAGE</Eyebrow>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginTop: 10 }}>
            {["Keynote speaker · TBC", "Industry speaker · TBC"].map((item) => (
              <div
                key={item}
                style={{
                  border: "1px solid rgba(255,255,255,.13)",
                  borderRadius: 11,
                  padding: 12,
                  color: "#eef0e9",
                  background: "rgba(255,255,255,.04)",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 9, color: "#c1d0ca", fontSize: 10 }}>
            The published speaker entries were still marked TBC.
          </div>
        </Panel>
      </div>
    </div>
  );
}

function WeddingScene({
  frame,
  project,
}: {
  frame: number;
  project: ProjectVisual;
}) {
  const screenOpacity = fade(frame, 50, 77);
  const rsvpPulse = 0.86 + (Math.sin(frame / 9) + 1) * 0.06;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.08fr) minmax(0, .92fr)",
        gap: 24,
        height: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        padding: 22,
        color: "#f7ece4",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Eyebrow color={project.accentSoft}>THE INVITATION · LIVE SITE PREVIEW</Eyebrow>
        <div style={{ marginTop: 9, fontSize: 27, fontWeight: 700 }}>A journey, shared together.</div>
        <div style={{ marginTop: 7, color: "#e1cfc7", fontSize: 13 }}>
          April 23, 2027 · Antipolo, Rizal
        </div>
        <div
          style={{
            opacity: screenOpacity,
            marginTop: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,.28)",
            borderRadius: 16,
            boxShadow: "0 25px 65px rgba(0,0,0,.42)",
          }}
        >
          <Img
            src={staticFile(project.screenshot ?? "")}
            style={{ display: "block", width: "100%", height: 355, objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div style={{ marginTop: 11, color: "#e2d4ca", fontSize: 10 }}>
          Personalized greeting · journey-themed visuals · story timeline
        </div>
      </div>
      <div style={{ display: "grid", alignContent: "center", gap: 13 }}>
        <Panel
          style={{
            padding: 19,
            color: "#35252a",
            background: "linear-gradient(145deg, rgba(255,250,242,.98), rgba(242,229,219,.96))",
            borderColor: `${project.accentSoft}88`,
          }}
        >
          <Eyebrow color="#8e2638">INVITATION SECTIONS</Eyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
            {["Our story", "Timeline", "Event details", "RSVP"].map((item, index) => (
              <Pill
                key={item}
                color={index === 3 ? "#fff9f0" : "#8e2638"}
                background={index === 3 ? "#8e2638" : "rgba(142,38,56,.07)"}
              >
                {item}
              </Pill>
            ))}
          </div>
          <div style={{ display: "grid", gap: 9, marginTop: 15 }}>
            {[
              ["01", "Wedding day", "April 23, 2027 · Antipolo, Rizal"],
              ["02", "Ceremony", "See the current invitation for confirmed details."],
              ["03", "Reception", "See the current invitation for confirmed details."],
            ].map(([number, title, detail]) => (
              <div
                key={number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "36px 1fr",
                  gap: 10,
                  alignItems: "center",
                  borderTop: "1px solid rgba(142,38,56,.12)",
                  paddingTop: 9,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 30,
                    height: 30,
                    borderRadius: 99,
                    color: "white",
                    background: "#8e2638",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  {number}
                </div>
                <div>
                  <div style={{ color: "#442b30", fontSize: 12, fontWeight: 700 }}>{title}</div>
                  <div style={{ marginTop: 3, color: "#735f5e", fontSize: 10 }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel
          style={{
            opacity: rsvpPulse,
            padding: 17,
            color: "#38282c",
            background: "rgba(255,250,243,.97)",
            borderColor: `${project.accentSoft}99`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <Eyebrow color="#8e2638">RSVP PREVIEW</Eyebrow>
            <span style={{ color: "#705e61", fontSize: 9, letterSpacing: 1 }}>NOT SUBMITTED</span>
          </div>
          <div
            style={{
              marginTop: 11,
              border: "1px solid #dacbc5",
              borderRadius: 9,
              padding: "10px 12px",
              color: "#9b8b88",
              background: "white",
              fontSize: 11,
            }}
          >
            Your name
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
            {["Joyfully accepts", "Regretfully declines"].map((item) => (
              <div
                key={item}
                style={{
                  border: "1px solid #d9c7c1",
                  borderRadius: 8,
                  padding: "10px 6px",
                  color: "#765e61",
                  background: "white",
                  textAlign: "center",
                  fontSize: 9,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 9, color: "#715e5c", fontSize: 9 }}>
            Preview only · no guest response is sent or saved.
          </div>
        </Panel>
      </div>
    </div>
  );
}

export default function VideoProject({ projectId }: VideoProjectProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const project = projects[projectId];
  const featureOpacity = Math.min(
    fade(frame, 34, 64),
    1 - fade(frame, 298, 328),
  );
  const introTitle = fade(frame, 10, 28) * (1 - fade(frame, 40, 60));
  const outroTitle = fade(frame, 324, 342) * (1 - fade(frame, 348, 359));
  const titleOpacity = Math.max(introTitle, outroTitle);
  const featureSpring = spring({
    frame: frame - 38,
    fps,
    config: { damping: 25, stiffness: 90 },
  });
  const featureY = interpolate(featureSpring, [0, 1], [24, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#08090d", overflow: "hidden" }}>
      <CoverScene project={project} frame={frame} />
      <FilmLabels project={project} titleOpacity={titleOpacity} />
      <AbsoluteFill
        style={{
          opacity: featureOpacity,
          transform: `translateY(${featureY}px)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 102,
            right: 34,
            bottom: 28,
            left: 34,
            overflow: "hidden",
            border: `1px solid ${project.accent}55`,
            borderRadius: 26,
            background: "rgba(5,9,14,.76)",
            boxShadow: `0 24px 80px rgba(0,0,0,.32), 0 0 40px ${project.accent}18`,
          }}
        >
          {projectId === "docugraph" && <DocuGraphScene frame={frame} project={project} />}
          {projectId === "mayari" && <MayariScene frame={frame} project={project} />}
          {projectId === "red-warriors" && <RedWarriorsScene frame={frame} project={project} />}
          {projectId === "cs-expo" && <ExpoScene frame={frame} project={project} />}
          {projectId === "wedding" && <WeddingScene frame={frame} project={project} />}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
