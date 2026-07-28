"use client";

import { useState } from "react";
import {
  BLOCKCHAIN_DUMP_DRIVE_URL,
  CASE_FIVE_RESULT_CONTENT,
  CASE_FOUR_RESULT_CONTENT,
  CASE_ONE_RESULT_CONTENT,
  CASE_THREE_RESULT_CONTENT,
  CASE_TWO_RESULT_CONTENT,
  CSV_CONTENT,
  HISTORY_ENTRIES,
  SUSPECT_WALLET_CSV_CONTENT,
  SUSPECT_WALLETS,
} from "../../../data/case01";

type EvidenceFileId =
  | "history"
  | "case-one-result"
  | "case-two-result"
  | "case-three-result"
  | "case-four-result"
  | "case-five-result"
  | "blockchain-dump"
  | "suspect-mapping";

type EvidenceToolProps = {
  caseOneComplete: boolean;
  caseTwoComplete: boolean;
  caseThreeComplete: boolean;
  caseFourComplete: boolean;
  caseFiveComplete: boolean;
  caseNumber: 1 | 2 | 3 | 4 | 5 | 6;
};

const DOWNLOADABLE_FILES: Record<
  Exclude<EvidenceFileId, "blockchain-dump">,
  { name: string; content: string; type: string }
> = {
  history: {
    name: "browser_history.csv",
    content: CSV_CONTENT,
    type: "text/csv;charset=utf-8",
  },
  "case-one-result": {
    name: "case01_result.txt",
    content: CASE_ONE_RESULT_CONTENT,
    type: "text/plain;charset=utf-8",
  },
  "case-two-result": {
    name: "case02_result.txt",
    content: CASE_TWO_RESULT_CONTENT,
    type: "text/plain;charset=utf-8",
  },
  "case-three-result": {
    name: "case03_result.txt",
    content: CASE_THREE_RESULT_CONTENT,
    type: "text/plain;charset=utf-8",
  },
  "case-four-result": {
    name: "case04_result.txt",
    content: CASE_FOUR_RESULT_CONTENT,
    type: "text/plain;charset=utf-8",
  },
  "case-five-result": {
    name: "case05_result.txt",
    content: CASE_FIVE_RESULT_CONTENT,
    type: "text/plain;charset=utf-8",
  },
  "suspect-mapping": {
    name: "suspect_wallet_mapping.csv",
    content: SUSPECT_WALLET_CSV_CONTENT,
    type: "text/csv;charset=utf-8",
  },
};

function downloadFile(fileName: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function EvidenceTool({
  caseOneComplete,
  caseTwoComplete,
  caseThreeComplete,
  caseFourComplete,
  caseFiveComplete,
  caseNumber,
}: EvidenceToolProps) {
  const [selected, setSelected] = useState<EvidenceFileId>(
    caseNumber === 6
      ? "suspect-mapping"
      : caseNumber === 5
        ? "blockchain-dump"
        : caseFourComplete
          ? "case-four-result"
          : caseThreeComplete
            ? "case-three-result"
            : caseTwoComplete
              ? "case-two-result"
              : caseOneComplete
                ? "case-one-result"
                : "history",
  );

  const selectedFile =
    selected === "blockchain-dump"
      ? {
          name: "master_blockchain_dump.log",
          content: "",
          type: "text/plain;charset=utf-8",
        }
      : DOWNLOADABLE_FILES[selected];

  return (
    <div className="evidence-explorer">
      <aside className="evidence-file-list" aria-label="증거 파일 목록">
        <button
          className={selected === "history" ? "selected" : ""}
          onClick={() => setSelected("history")}
        >
          <span aria-hidden="true">▤</span>
          <span>
            <strong>browser_history.csv</strong>
            <small>{HISTORY_ENTRIES.length} records</small>
          </span>
        </button>

        {caseNumber >= 5 && (
          <button
            className={selected === "blockchain-dump" ? "selected" : ""}
            onClick={() => setSelected("blockchain-dump")}
          >
            <span aria-hidden="true">⇱</span>
            <span>
              <strong>master_blockchain_dump.log</strong>
              <small>GOOGLE DRIVE · EXTERNAL</small>
            </span>
          </button>
        )}

        <button
          className={selected === "suspect-mapping" ? "selected" : ""}
          onClick={() => setSelected("suspect-mapping")}
        >
          <span aria-hidden="true">▤</span>
          <span>
            <strong>suspect_wallet_mapping.csv</strong>
            <small>{SUSPECT_WALLETS.length} suspects · OFFLINE</small>
          </span>
        </button>

        {caseNumber === 6 && (
          <button
            className={selected === "case-five-result" ? "selected" : ""}
            onClick={() =>
              caseFiveComplete && setSelected("case-five-result")
            }
            disabled={!caseFiveComplete}
          >
            <span aria-hidden="true">{caseFiveComplete ? "▤" : "▣"}</span>
            <span>
              <strong>case05_result.txt</strong>
              <small>
                {caseFiveComplete ? "VERIFIED" : "문제 5 완료 후 해제"}
              </small>
            </span>
          </button>
        )}

        <button
          className={selected === "case-four-result" ? "selected" : ""}
          onClick={() => caseFourComplete && setSelected("case-four-result")}
          disabled={!caseFourComplete}
        >
          <span aria-hidden="true">{caseFourComplete ? "▤" : "▣"}</span>
          <span>
            <strong>case04_result.txt</strong>
            <small>
              {caseFourComplete ? "VERIFIED" : "문제 4 완료 후 해제"}
            </small>
          </span>
        </button>
        <button
          className={selected === "case-three-result" ? "selected" : ""}
          onClick={() =>
            caseThreeComplete && setSelected("case-three-result")
          }
          disabled={!caseThreeComplete}
        >
          <span aria-hidden="true">{caseThreeComplete ? "▤" : "▣"}</span>
          <span>
            <strong>case03_result.txt</strong>
            <small>
              {caseThreeComplete ? "VERIFIED" : "문제 3 완료 후 해제"}
            </small>
          </span>
        </button>
        <button
          className={selected === "case-one-result" ? "selected" : ""}
          onClick={() => caseOneComplete && setSelected("case-one-result")}
          disabled={!caseOneComplete}
        >
          <span aria-hidden="true">{caseOneComplete ? "▤" : "▣"}</span>
          <span>
            <strong>case01_result.txt</strong>
            <small>{caseOneComplete ? "VERIFIED" : "문제 1 완료 후 해제"}</small>
          </span>
        </button>
        <button
          className={selected === "case-two-result" ? "selected" : ""}
          onClick={() => caseTwoComplete && setSelected("case-two-result")}
          disabled={!caseTwoComplete}
        >
          <span aria-hidden="true">{caseTwoComplete ? "▤" : "▣"}</span>
          <span>
            <strong>case02_result.txt</strong>
            <small>{caseTwoComplete ? "VERIFIED" : "문제 2 완료 후 해제"}</small>
          </span>
        </button>
      </aside>

      <section className="evidence-preview">
        <header>
          <div>
            <span aria-hidden="true">▤</span>
            <strong>{selectedFile.name}</strong>
          </div>
          {selected === "blockchain-dump" ? (
            <a
              className="evidence-external-link"
              href={BLOCKCHAIN_DUMP_DRIVE_URL}
              target="_blank"
              rel="noreferrer"
            >
              Google Drive에서 열기 ↗
            </a>
          ) : (
            <button
              onClick={() =>
                downloadFile(
                  selectedFile.name,
                  selectedFile.content,
                  selectedFile.type,
                )
              }
            >
              다운로드
            </button>
          )}
        </header>

        <div className="evidence-preview-content">
          {selected === "blockchain-dump" ? (
            <article className="external-evidence-card">
              <span className="external-evidence-label">COMMON EVIDENCE</span>
              <h3>master_blockchain_dump.log</h3>
              <p>
                3일간 수집된 블록체인 트랜잭션 덤프입니다. 결제 거래의
                입력(In), 출력(Out), 금액과 시간 기록을 연속적으로
                분석하세요.
              </p>
              <dl>
                <div>
                  <dt>형식</dt>
                  <dd>UTF-8 plain text log</dd>
                </div>
                <div>
                  <dt>제공 위치</dt>
                  <dd>Google Drive 공유 폴더</dd>
                </div>
              </dl>
              <a
                href={BLOCKCHAIN_DUMP_DRIVE_URL}
                target="_blank"
                rel="noreferrer"
              >
                증거 로그 위치 열기 <span aria-hidden="true">↗</span>
              </a>
              <small>
                외부 링크가 새 탭에서 열립니다. 폴더 안의 동일한 파일명을
                확인하세요.
              </small>
            </article>
          ) : selected === "history" ? (
            <div className="table-wrap evidence-table">
              <table>
                <thead>
                  <tr>
                    <th>방문 시각</th>
                    <th>페이지 제목</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody>
                  {HISTORY_ENTRIES.map((entry) => (
                    <tr key={`${entry.visitedAt}-${entry.url}`}>
                      <td>{entry.visitedAt}</td>
                      <td>{entry.title}</td>
                      <td className="url-cell">
                        <a href={entry.url} target="_blank" rel="noreferrer">
                          {entry.url}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : selected === "suspect-mapping" ? (
            <div className="table-wrap evidence-table suspect-table">
              <table>
                <thead>
                  <tr>
                    <th>Suspect ID</th>
                    <th>Name</th>
                    <th>Wallet Address</th>
                  </tr>
                </thead>
                <tbody>
                  {SUSPECT_WALLETS.map((suspect) => (
                    <tr key={suspect.suspectId}>
                      <td>{suspect.suspectId}</td>
                      <td>{suspect.name}</td>
                      <td className="url-cell">
                        <code>{suspect.walletAddress}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : selected === "case-one-result" ? (
            <pre className="text-evidence">{CASE_ONE_RESULT_CONTENT}</pre>
          ) : selected === "case-two-result" ? (
            <pre className="text-evidence">{CASE_TWO_RESULT_CONTENT}</pre>
          ) : selected === "case-three-result" ? (
            <pre className="text-evidence">{CASE_THREE_RESULT_CONTENT}</pre>
          ) : selected === "case-four-result" ? (
            <pre className="text-evidence">{CASE_FOUR_RESULT_CONTENT}</pre>
          ) : (
            <pre className="text-evidence">{CASE_FIVE_RESULT_CONTENT}</pre>
          )}
        </div>
      </section>
    </div>
  );
}
