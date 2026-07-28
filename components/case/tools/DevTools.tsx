"use client";

import { useMemo, useState } from "react";
import {
  MARKET_SOURCE_CODE,
  MARKET_VENDOR_ASSET_NAME,
  MARKET_VENDOR_SOURCE,
  ONION_SERVICES,
} from "../../../data/case01";

type DevToolsProps = {
  visitedOnion: string;
  currentService: (typeof ONION_SERVICES)[number] | undefined;
};

type DevToolsTab = "elements" | "sources" | "network" | "console";
type SourceFile =
  | "index.html"
  | typeof MARKET_VENDOR_ASSET_NAME
  | "catalog.min.js"
  | "store.min.css";

type ConsoleExecution = {
  status: "success" | "error";
  value: string;
  logs: Array<{
    level: "log" | "info" | "warn" | "error";
    value: string;
  }>;
};

type ConsoleEntry = ConsoleExecution & {
  id: number;
  source: string;
};

const MARKET_CATALOG_SOURCE =
  '(()=>{const e=document.querySelectorAll("[data-code]");e.forEach(e=>e.addEventListener("click",()=>e.classList.toggle("selected")))})();';

const MARKET_STYLE_SOURCE =
  ":root{color-scheme:dark}body{margin:0;background:#11140d;color:#e8efdc;font-family:system-ui,sans-serif}.market-header{border-bottom:1px solid #313a27;padding:24px}.catalog{display:grid;gap:12px;padding:24px}.catalog article{border:1px solid #35412c;padding:18px}.wallet{display:block;margin:0 24px 24px;color:#d7ad45}";

const CONSOLE_WORKER_SOURCE = `
const formatValue = (value) => {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return value;
  if (typeof value === "function") return value.toString();
  if (value instanceof Error) return value.name + ": " + value.message;

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};

self.onmessage = async (event) => {
  const logs = [];
  const virtualConsole = {};

  for (const level of ["log", "info", "warn", "error"]) {
    virtualConsole[level] = (...values) => {
      logs.push({
        level,
        value: values.map(formatValue).join(" "),
      });
    };
  }

  try {
    const sandboxWindow = {};
    const execute = new Function(
      "console",
      "window",
      "source",
      "return eval(source);",
    );
    const result = await execute(
      virtualConsole,
      sandboxWindow,
      event.data.source,
    );

    self.postMessage({
      status: "success",
      value: formatValue(result),
      logs,
    });
  } catch (error) {
    self.postMessage({
      status: "error",
      value: formatValue(error),
      logs,
    });
  }
};
`;

function executeConsoleSource(source: string) {
  return new Promise<ConsoleExecution>((resolve) => {
    const workerUrl = URL.createObjectURL(
      new Blob([CONSOLE_WORKER_SOURCE], {
        type: "text/javascript",
      }),
    );
    const worker = new Worker(workerUrl);
    let finished = false;

    const finish = (execution: ConsoleExecution) => {
      if (finished) {
        return;
      }

      finished = true;
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
      resolve(execution);
    };

    const timeout = window.setTimeout(() => {
      finish({
        status: "error",
        value: "ExecutionTimeout: 실행 시간이 2.5초를 초과했습니다.",
        logs: [],
      });
    }, 2500);

    worker.onmessage = (event: MessageEvent<ConsoleExecution>) => {
      finish(event.data);
    };
    worker.onerror = (event) => {
      finish({
        status: "error",
        value: `WorkerError: ${event.message || "코드를 실행할 수 없습니다."}`,
        logs: [],
      });
    };

    worker.postMessage({ source });
  });
}

function createGenericSource(title: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="stylesheet" href="/assets/site.css" />
  </head>
  <body>
    <main id="app"></main>
    <script defer src="/assets/app.js"></script>
  </body>
</html>`;
}

function prettyPrintJavaScript(source: string) {
  let output = "";
  let depth = 0;
  let quote = "";
  let escaped = false;

  function appendNewLine() {
    output = `${output.trimEnd()}\n${"  ".repeat(depth)}`;
  }

  for (const character of source) {
    if (quote) {
      output += character;
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = "";
      }
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      output += character;
      continue;
    }

    if (character === "{") {
      output += character;
      depth += 1;
      appendNewLine();
      continue;
    }

    if (character === "}") {
      depth = Math.max(0, depth - 1);
      appendNewLine();
      output += character;
      appendNewLine();
      continue;
    }

    if (character === ";") {
      output += character;
      appendNewLine();
      continue;
    }

    output += character;
  }

  return output
    .replace(/\n\s*\n/g, "\n")
    .trim();
}

export default function DevTools({
  visitedOnion,
  currentService,
}: DevToolsProps) {
  const [activeTab, setActiveTab] =
    useState<DevToolsTab>("sources");
  const [selectedSource, setSelectedSource] =
    useState<SourceFile>("index.html");
  const [sourceQuery, setSourceQuery] = useState("");
  const [prettyPrinted, setPrettyPrinted] = useState(false);
  const [consoleSource, setConsoleSource] = useState("");
  const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([]);
  const [consoleRunning, setConsoleRunning] = useState(false);

  const isOfficial = currentService?.kind === "official";

  const sourceFiles = useMemo<Partial<Record<SourceFile, string>>>(() => {
    if (isOfficial) {
      return {
        "index.html": MARKET_SOURCE_CODE,
        [MARKET_VENDOR_ASSET_NAME]: MARKET_VENDOR_SOURCE,
        "catalog.min.js": MARKET_CATALOG_SOURCE,
        "store.min.css": MARKET_STYLE_SOURCE,
      };
    }

    if (currentService) {
      return {
        "index.html": createGenericSource(currentService.pageTitle),
      };
    }

    return {};
  }, [currentService, isOfficial]);

  const rawSourceCode =
    sourceFiles[selectedSource] ??
    sourceFiles["index.html"] ??
    "";
  const isJavaScript = selectedSource.endsWith(".js");
  const sourceCode =
    prettyPrinted && isJavaScript
      ? prettyPrintJavaScript(rawSourceCode)
      : rawSourceCode;
  const sourceLines = sourceCode.split("\n");
  const normalizedQuery = sourceQuery.trim().toLowerCase();

  const elementSource = isOfficial
    ? `<html lang="ko">
  <head>…</head>
  <body>
    <header class="market-header">
      <h1>너굴상점</h1>
    </header>
    <main>
      <section class="catalog">
        <article data-code="ARMOR">갑옷 <b>0.5 BTC</b></article>
        <article data-code="WEAPON">무기 <b>0.6 BTC</b></article>
        <article data-code="CROWN">왕관 <b>1.0 BTC</b></article>
      </section>
      <code class="wallet">1NugooL7xZ9vQ2pLk4YnJ8uW3eR5a1X</code>
    </main>
  </body>
</html>`
    : `<html><head>…</head><body><main id="app"></main></body></html>`;

  async function runConsole() {
    const source = consoleSource.trim();

    if (!source || consoleRunning) {
      return;
    }

    setConsoleRunning(true);

    const replaySource = [
      ...consoleEntries
        .filter((entry) => entry.status === "success")
        .map((entry) => entry.source),
      source,
    ].join("\n;\n");
    const execution = await executeConsoleSource(replaySource);

    setConsoleEntries((current) => [
      ...current,
      {
        id: Date.now(),
        source,
        ...execution,
      },
    ]);
    setConsoleSource("");
    setConsoleRunning(false);
  }

  return (
    <div className="devtools-shell">
      <div className="devtools-context">
        <span>OnionScope</span>
        <code>{visitedOnion || "페이지가 연결되지 않음"}</code>
      </div>

      <div className="devtools-tabs" role="tablist" aria-label="개발자 도구">
        <button
          className={activeTab === "elements" ? "active" : ""}
          role="tab"
          aria-selected={activeTab === "elements"}
          onClick={() => setActiveTab("elements")}
        >
          Elements
        </button>
        <button
          className={activeTab === "sources" ? "active" : ""}
          role="tab"
          aria-selected={activeTab === "sources"}
          onClick={() => setActiveTab("sources")}
        >
          Sources
        </button>
        <button
          className={activeTab === "network" ? "active" : ""}
          role="tab"
          aria-selected={activeTab === "network"}
          onClick={() => setActiveTab("network")}
        >
          Network
        </button>
        <button
          className={activeTab === "console" ? "active" : ""}
          role="tab"
          aria-selected={activeTab === "console"}
          onClick={() => setActiveTab("console")}
        >
          Console
        </button>
        {activeTab === "sources" && (
          <label>
            <span className="sr-only">소스 코드 검색</span>
            <input
              value={sourceQuery}
              onChange={(event) => setSourceQuery(event.target.value)}
              placeholder="소스 검색"
            />
          </label>
        )}
      </div>

      {!visitedOnion || !currentService ? (
        <div className="devtools-empty">
          <span aria-hidden="true">&lt;/&gt;</span>
          <h3>분석할 페이지가 없습니다</h3>
          <p>OnionScope에서 주소를 입력하고 페이지에 접속하세요.</p>
        </div>
      ) : activeTab === "elements" ? (
        <section className="devtools-elements-panel">
          <header>
            <span>DOM Tree</span>
            <small>live document</small>
          </header>
          <pre>{elementSource}</pre>
        </section>
      ) : activeTab === "network" ? (
        <section className="devtools-network-panel">
          <header>
            <span className="network-recording-dot" aria-hidden="true" />
            <span>Preserve log</span>
            <b>{isOfficial ? "5 requests" : "3 requests"}</b>
          </header>
          <div className="devtools-network-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Initiator</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>index.html</td>
                  <td>200</td>
                  <td>document</td>
                  <td>Other</td>
                </tr>
                <tr>
                  <td>{isOfficial ? "store.min.css" : "site.css"}</td>
                  <td>200</td>
                  <td>stylesheet</td>
                  <td>index.html</td>
                </tr>
                <tr>
                  <td>
                    {isOfficial ? MARKET_VENDOR_ASSET_NAME : "app.js"}
                  </td>
                  <td>200</td>
                  <td>script</td>
                  <td>index.html</td>
                </tr>
                {isOfficial && (
                  <>
                    <tr>
                      <td>catalog.min.js</td>
                      <td>200</td>
                      <td>script</td>
                      <td>index.html</td>
                    </tr>
                    <tr className="network-blocked-row">
                      <td>telemetry-buffer</td>
                      <td>(blocked)</td>
                      <td>ping</td>
                      <td>{MARKET_VENDOR_ASSET_NAME}:1</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {isOfficial && (
            <p>
              OnionScope의 외부 측정 요청 차단 정책으로 페이로드 세부 정보가
              기록되지 않았습니다.
            </p>
          )}
        </section>
      ) : activeTab === "console" ? (
        <section className="devtools-console-panel">
          <header>
            <div>
              <span className="console-status-dot" aria-hidden="true" />
              <strong>OnionScope JavaScript Console</strong>
            </div>
            <button
              disabled={consoleEntries.length === 0 || consoleRunning}
              onClick={() => setConsoleEntries([])}
            >
              지우기
            </button>
          </header>
          <div
            className="console-output"
            aria-live="polite"
            aria-label="Console 실행 결과"
          >
            <p className="console-notice">
              격리된 실행 환경입니다. DOM과 네트워크에는 접근할 수 없으며,
              실행 시간은 2.5초로 제한됩니다.
            </p>
            {consoleEntries.map((entry) => (
              <article
                className={`console-entry ${entry.status}`}
                key={entry.id}
              >
                <pre className="console-command">
                  <b aria-hidden="true">&gt;</b>
                  <code>{entry.source}</code>
                </pre>
                {entry.logs.map((log, index) => (
                  <pre
                    className={`console-log ${log.level}`}
                    key={`${entry.id}-${log.level}-${index}`}
                  >
                    <b aria-hidden="true">◀</b>
                    <code>{log.value}</code>
                  </pre>
                ))}
                <pre className="console-result">
                  <b aria-hidden="true">
                    {entry.status === "success" ? "←" : "×"}
                  </b>
                  <code>{entry.value}</code>
                </pre>
              </article>
            ))}
          </div>
          <div className="console-input-area">
            <label htmlFor="devtools-console-input">
              JavaScript 입력
              <span>Ctrl + Enter 실행 · 이전 명령은 자동으로 재실행됩니다.</span>
            </label>
            <textarea
              id="devtools-console-input"
              value={consoleSource}
              onChange={(event) => setConsoleSource(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && event.ctrlKey) {
                  event.preventDefault();
                  void runConsole();
                }
              }}
              placeholder="JavaScript 표현식을 입력하세요. 예: 1 + 2"
              spellCheck={false}
            />
            <button
              disabled={!consoleSource.trim() || consoleRunning}
              onClick={() => void runConsole()}
            >
              {consoleRunning ? "실행 중…" : "실행"}
            </button>
          </div>
        </section>
      ) : (
        <div className="source-workspace">
          <aside className="source-tree">
            <strong>Page</strong>
            <span>▾ top</span>
            <span>　▾ {visitedOnion.slice(0, 18)}…</span>
            <button
              className={selectedSource === "index.html" ? "selected" : ""}
              onClick={() => {
                setSelectedSource("index.html");
                setPrettyPrinted(false);
              }}
            >
              　　◇ index.html
            </button>
            {isOfficial && (
              <>
                <span>　　▾ assets</span>
                <button
                  className={
                    selectedSource === MARKET_VENDOR_ASSET_NAME
                      ? "selected"
                      : ""
                  }
                  onClick={() => {
                    setSelectedSource(MARKET_VENDOR_ASSET_NAME);
                    setPrettyPrinted(false);
                  }}
                >
                  　　　JS {MARKET_VENDOR_ASSET_NAME}
                </button>
                <button
                  className={
                    selectedSource === "catalog.min.js" ? "selected" : ""
                  }
                  onClick={() => {
                    setSelectedSource("catalog.min.js");
                    setPrettyPrinted(false);
                  }}
                >
                  　　　JS catalog.min.js
                </button>
                <button
                  className={
                    selectedSource === "store.min.css" ? "selected" : ""
                  }
                  onClick={() => {
                    setSelectedSource("store.min.css");
                    setPrettyPrinted(false);
                  }}
                >
                  　　　# store.min.css
                </button>
              </>
            )}
          </aside>
          <section
            className="source-editor"
            aria-label={`${selectedSource} 소스 코드`}
          >
            <header>
              <span>{selectedSource}</span>
              <div className="source-editor-actions">
                {isJavaScript && (
                  <button
                    className={prettyPrinted ? "active" : ""}
                    onClick={() => setPrettyPrinted((current) => !current)}
                  >
                    {"{ }"} 코드 정리
                  </button>
                )}
                <small>{sourceLines.length} lines</small>
              </div>
            </header>
            <pre>
              {sourceLines.map((line, index) => {
                const matches =
                  normalizedQuery &&
                  line.toLowerCase().includes(normalizedQuery);

                return (
                  <span
                    className={`source-line ${matches ? "match" : ""}`}
                    key={`${index}-${line}`}
                  >
                    <b>{String(index + 1).padStart(2, " ")}</b>
                    <code>{line || " "}</code>
                  </span>
                );
              })}
            </pre>
          </section>
        </div>
      )}
    </div>
  );
}
