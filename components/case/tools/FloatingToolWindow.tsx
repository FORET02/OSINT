"use client";

import type {
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import type { ToolId } from "../../../types/osint";

export type WindowGeometry = {
  open: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
};

type FloatingToolWindowProps = {
  id: ToolId;
  label: string;
  icon: string;
  geometry: WindowGeometry;
  children: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  onDragStart: (event: ReactPointerEvent) => void;
  onResizeStart: (event: ReactPointerEvent) => void;
};

export default function FloatingToolWindow({
  id,
  label,
  icon,
  geometry,
  children,
  onClose,
  onFocus,
  onDragStart,
  onResizeStart,
}: FloatingToolWindowProps) {
  return (
    <section
      className="floating-tool-window"
      data-tool={id}
      aria-label={label}
      style={{
        left: geometry.x,
        top: geometry.y,
        width: geometry.width,
        height: geometry.height,
        zIndex: geometry.zIndex,
      }}
      onPointerDown={onFocus}
    >
      <header className="floating-window-header" onPointerDown={onDragStart}>
        <h2>
          <span aria-hidden="true">{icon}</span>
          {label}
        </h2>
        <button
          className="window-close"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={onClose}
          aria-label={`${label} 닫기`}
        >
          ×
        </button>
      </header>
      <div className="floating-window-body">{children}</div>
      <button
        className="window-resize-handle"
        onPointerDown={onResizeStart}
        aria-label={`${label} 창 크기 조절`}
        title="끌어서 창 크기 조절"
      />
    </section>
  );
}
