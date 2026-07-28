import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../app/globals.css";
import CaseWorkspace from "../../components/case/CaseWorkspace";
import { sha256Hex } from "../../lib/answerProtection";

type CaseNumber = "01" | "02" | "03" | "04" | "05" | "06";

const STATIC_ANSWER_DIGESTS: Record<CaseNumber, string> = {
  "01": "dae56a1002fc187967efd6c1503ad1733a405bab6d0916b5bd4a31cf3b69331d",
  "02": "f127819a02a8b90b9b493efa76651097e8699e57e465c68dbb9921578fdd748a",
  "03": "fc6546b59abce8cd3f5f9c72f8742d4891575b0e440aae34e3a1704f4fba1124",
  "04": "6900b2a42fd80b4a9446a0547b0e9081f2e3d0d48e18325497fcd8b59a096d72",
  "05": "7fdf4c45438c19d2cbeba886d83f9c7fa0626814028e5a19956357a3c5ef4afb",
  "06": "17c52fdd8678301829ac8c2577f0c876abd688f110f0b8d2718bfe2adb186b67",
};

function normalizeAnswer(caseNumber: CaseNumber, value: unknown) {
  if (typeof value !== "string") return "";

  if (caseNumber === "01") {
    return value
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");
  }

  if (caseNumber === "02") {
    return value.trim().toUpperCase();
  }

  if (caseNumber === "04") {
    return value.trim().replace(/\s+/g, "").toLowerCase();
  }

  if (caseNumber === "05") {
    return value.trim();
  }

  if (caseNumber === "06") {
    return value
      .split(/[,，/\n]+/)
      .map((name) => name.trim().replace(/\s+/g, ""))
      .filter(Boolean)
      .join(",");
  }

  return value.trim().toLowerCase();
}

function installStaticAnswerApi() {
  const networkFetch = window.fetch.bind(window);

  window.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> => {
    const requestUrl =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;
    const pathname = new URL(requestUrl, window.location.href).pathname;
    const match = pathname.match(
      /\/api\/case\/(01|02|03|04|05|06)\/submit\/?$/,
    );

    if (!match || (init?.method ?? "GET").toUpperCase() !== "POST") {
      return networkFetch(input, init);
    }

    const caseNumber = match[1] as CaseNumber;

    try {
      const body =
        typeof init?.body === "string"
          ? (JSON.parse(init.body) as { answer?: unknown })
          : {};
      const submittedDigest = await sha256Hex(
        normalizeAnswer(caseNumber, body.answer),
      );
      const correct =
        submittedDigest === STATIC_ANSWER_DIGESTS[caseNumber];

      return new Response(JSON.stringify({ correct }), {
        status: correct ? 200 : 400,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
    } catch {
      return new Response(JSON.stringify({ correct: false }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
    }
  };
}

installStaticAnswerApi();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("애플리케이션을 표시할 루트 요소를 찾을 수 없습니다.");
}

createRoot(rootElement).render(
  <StrictMode>
    <CaseWorkspace />
  </StrictMode>,
);
