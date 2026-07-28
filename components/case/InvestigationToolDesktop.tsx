"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { ONION_SERVICES } from "../../data/case01";
import type { ToolId } from "../../types/osint";
import DevTools from "./tools/DevTools";
import EvidenceTool from "./tools/EvidenceTool";
import FloatingToolWindow, {
  type WindowGeometry,
} from "./tools/FloatingToolWindow";
import NetScopeTool from "./tools/NetScopeTool";
import NotesTool from "./tools/NotesTool";
import OnionScopeTool from "./tools/OnionScopeTool";
import SourceScopeTool from "./tools/SourceScopeTool";

type ToolWindows = Record<ToolId, WindowGeometry>;

type PointerInteraction = {
  id: ToolId;
  mode: "drag" | "resize";
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  originWidth: number;
  originHeight: number;
};

const TOOL_ORDER: ToolId[] = [
  "evidence",
  "netscope",
  "sourcescope",
  "onionscope",
  "devtools",
  "notes",
];

const TOOL_LABELS: Record<ToolId, string> = {
  evidence: "증거함",
  netscope: "NetScope 브라우저",
  sourcescope: "SourceScope",
  onionscope: "OnionScope",
  devtools: "개발자 도구",
  notes: "수사 노트",
};

const TOOL_ICONS: Record<ToolId, string> = {
  evidence: "▣",
  netscope: "◎",
  sourcescope: "S/",
  onionscope: "◉",
  devtools: "</>",
  notes: "▢",
};

const BASE_WINDOWS: ToolWindows = {
  evidence: {
    open: false,
    x: 18,
    y: 24,
    width: 620,
    height: 650,
    zIndex: 2,
  },
  netscope: {
    open: false,
    x: 330,
    y: 76,
    width: 650,
    height: 620,
    zIndex: 3,
  },
  sourcescope: {
    open: false,
    x: 402,
    y: 38,
    width: 900,
    height: 680,
    zIndex: 4,
  },
  onionscope: {
    open: false,
    x: 590,
    y: 28,
    width: 690,
    height: 650,
    zIndex: 5,
  },
  devtools: {
    open: false,
    x: 800,
    y: 84,
    width: 720,
    height: 640,
    zIndex: 6,
  },
  notes: {
    open: false,
    x: 970,
    y: 48,
    width: 520,
    height: 620,
    zIndex: 7,
  },
};

function createInitialWindows(): ToolWindows {
  return Object.fromEntries(
    TOOL_ORDER.map((id) => [
      id,
      {
        ...BASE_WINDOWS[id],
        open: false,
      },
    ]),
  ) as ToolWindows;
}

type InvestigationToolDesktopProps = {
  caseOneComplete: boolean;
  caseTwoComplete: boolean;
  caseThreeComplete: boolean;
  caseFourComplete?: boolean;
  caseFiveComplete?: boolean;
  caseNumber: 1 | 2 | 3 | 4 | 5 | 6;
  notesMode:
    | "case-one"
    | "case-two"
    | "case-three"
    | "case-four"
    | "case-five"
    | "case-six";
  children: ReactNode;
};

export default function InvestigationToolDesktop({
  caseOneComplete,
  caseTwoComplete,
  caseThreeComplete,
  caseFourComplete = false,
  caseFiveComplete = false,
  caseNumber,
  notesMode,
  children,
}: InvestigationToolDesktopProps) {
  const [onionAddress, setOnionAddress] = useState("");
  const [visitedOnion, setVisitedOnion] = useState("");
  const [windows, setWindows] = useState<ToolWindows>(createInitialWindows);
  const nextZIndex = useRef(10);
  const interaction = useRef<PointerInteraction | null>(null);

  const currentService = useMemo(
    () =>
      ONION_SERVICES.find(
        (service) => service.address === visitedOnion.toLowerCase(),
      ),
    [visitedOnion],
  );

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const active = interaction.current;
      if (!active) return;

      const deltaX = event.clientX - active.startX;
      const deltaY = event.clientY - active.startY;

      setWindows((current) => {
        const target = current[active.id];

        if (active.mode === "drag") {
          return {
            ...current,
            [active.id]: {
              ...target,
              x: Math.max(0, active.originX + deltaX),
              y: Math.max(0, active.originY + deltaY),
            },
          };
        }

        return {
          ...current,
          [active.id]: {
            ...target,
            width: Math.min(
              1100,
              Math.max(400, active.originWidth + deltaX),
            ),
            height: Math.min(
              820,
              Math.max(360, active.originHeight + deltaY),
            ),
          },
        };
      });
    }

    function handlePointerUp() {
      interaction.current = null;
      document.body.classList.remove("window-interacting");
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  function bringToFront(id: ToolId) {
    const zIndex = nextZIndex.current++;
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        zIndex,
      },
    }));
  }

  function openTool(id: ToolId) {
    const zIndex = nextZIndex.current++;
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        open: true,
        zIndex,
      },
    }));
  }

  function closeTool(id: ToolId) {
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        open: false,
      },
    }));
  }

  function beginWindowInteraction(
    event: ReactPointerEvent,
    id: ToolId,
    mode: "drag" | "resize",
  ) {
    event.preventDefault();
    event.stopPropagation();
    bringToFront(id);
    const target = windows[id];

    interaction.current = {
      id,
      mode,
      startX: event.clientX,
      startY: event.clientY,
      originX: target.x,
      originY: target.y,
      originWidth: target.width,
      originHeight: target.height,
    };
    document.body.classList.add("window-interacting");
  }

  function visitOnion(event: React.FormEvent) {
    event.preventDefault();
    setVisitedOnion(
      onionAddress
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, ""),
    );
  }

  return (
    <>
      <nav className="tool-nav" aria-label="수사 도구">
        <div className="tool-list">
          {TOOL_ORDER.map((id) => (
            <button
              key={id}
              className={windows[id].open ? "active" : ""}
              onClick={() => openTool(id)}
            >
              <span aria-hidden="true">{TOOL_ICONS[id]}</span>{" "}
              {TOOL_LABELS[id]}
            </button>
          ))}
        </div>
        <span className="window-tip">창 제목을 끌어 이동 · 모서리로 크기 조절</span>
      </nav>

      <div className="workspace-stage">
        {children}

        {TOOL_ORDER.map((id) => {
          const geometry = windows[id];
          if (!geometry.open) return null;

          return (
            <FloatingToolWindow
              key={id}
              id={id}
              label={TOOL_LABELS[id]}
              icon={TOOL_ICONS[id]}
              geometry={geometry}
              onClose={() => closeTool(id)}
              onFocus={() => bringToFront(id)}
              onDragStart={(event) =>
                beginWindowInteraction(event, id, "drag")
              }
              onResizeStart={(event) =>
                beginWindowInteraction(event, id, "resize")
              }
            >
              {id === "evidence" && (
                <EvidenceTool
                  caseOneComplete={caseOneComplete}
                  caseTwoComplete={caseTwoComplete}
                  caseThreeComplete={caseThreeComplete}
                  caseFourComplete={caseFourComplete}
                  caseFiveComplete={caseFiveComplete}
                  caseNumber={caseNumber}
                />
              )}
              {id === "netscope" && <NetScopeTool />}
              {id === "sourcescope" && (
                <SourceScopeTool enabled={caseNumber >= 3} />
              )}
              {id === "onionscope" && (
                <OnionScopeTool
                  onionAddress={onionAddress}
                  setOnionAddress={setOnionAddress}
                  visitOnion={visitOnion}
                  visitedOnion={visitedOnion}
                  currentService={currentService}
                />
              )}
              {id === "devtools" && (
                <DevTools
                  key={visitedOnion || "unconnected"}
                  visitedOnion={visitedOnion}
                  currentService={currentService}
                />
              )}
              {id === "notes" && <NotesTool mode={notesMode} />}
            </FloatingToolWindow>
          );
        })}
      </div>
    </>
  );
}
