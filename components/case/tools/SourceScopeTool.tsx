"use client";

import { useState } from "react";
import { createSourceMatches } from "../../../data/case01";
import {
  ANALYTICS_IDENTIFIER_DIGEST,
  sha256Hex,
} from "../../../lib/answerProtection";
import type { SourceMatch } from "../../../types/osint";

export default function SourceScopeTool({
  enabled,
}: {
  enabled: boolean;
}) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [matches, setMatches] = useState<SourceMatch[]>([]);
  const [searching, setSearching] = useState(false);

  async function runSearch(event: React.FormEvent) {
    event.preventDefault();
    if (!enabled) return;

    const normalizedQuery = query.trim().toUpperCase();
    setSubmittedQuery(query);
    setSearching(true);

    try {
      const digest = await sha256Hex(normalizedQuery);
      setMatches(
        digest === ANALYTICS_IDENTIFIER_DIGEST
          ? createSourceMatches(normalizedQuery)
          : [],
      );
    } catch {
      setMatches([]);
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="sourcescope-shell">
      <form className="sourcescope-bar" onSubmit={runSearch}>
        <span className="sourcescope-logo" aria-hidden="true">
          S/
        </span>
        <label className="sr-only" htmlFor="sourcescope-query">
          SourceScope 식별 값 검색
        </label>
        <input
          id="sourcescope-query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="추적 식별 값을 입력하세요"
          autoComplete="off"
          spellCheck={false}
          disabled={!enabled}
        />
        <button disabled={!enabled || !query.trim() || searching}>
          {searching ? "검색 중…" : "검색"}
        </button>
      </form>

      <div className="sourcescope-viewport">
        {!enabled && (
          <div className="sourcescope-home locked">
            <span aria-hidden="true">⌁</span>
            <h3>검색 데이터 잠김</h3>
            <p>문제 2에서 재사용된 식별 값을 확보하면 검색할 수 있습니다.</p>
          </div>
        )}

        {enabled && !submittedQuery && (
          <div className="sourcescope-home">
            <span aria-hidden="true">S/</span>
            <h3>SourceScope</h3>
            <p>
              공개 웹과 수집된 비공개 서비스 소스에서 동일한 식별 값의 사용
              흔적을 찾습니다.
            </p>
          </div>
        )}

        {enabled && submittedQuery && matches.length === 0 && (
          <div className="sourcescope-home no-match">
            <span aria-hidden="true">0</span>
            <h3>일치 항목이 없습니다</h3>
            <p>문제 2에서 확보한 식별 값을 대소문자와 기호까지 확인하세요.</p>
          </div>
        )}

        {matches.length > 0 && (
          <section className="source-match-panel">
            <header>
              <div>
                <span>IDENTIFIER MATCH</span>
                <strong>{submittedQuery.toUpperCase()}</strong>
              </div>
              <b>{matches.length} results</b>
            </header>
            <div className="source-match-table-wrap">
              <table className="source-match-table">
                <thead>
                  <tr>
                    <th>Domain</th>
                    <th>Matched URL</th>
                    <th>일치한 소스 코드</th>
                    <th>First Seen</th>
                    <th>Last Seen</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match) => (
                    <tr
                      key={match.matchedUrl}
                      data-kind={match.kind}
                    >
                      <td>
                        <span className="match-kind">
                          {match.kind === "onion" ? "ONION" : "WEB"}
                        </span>
                        <code>{match.domain}</code>
                      </td>
                      <td>
                        <code>{match.matchedUrl}</code>
                      </td>
                      <td>
                        <code>{match.sourceCode}</code>
                      </td>
                      <td>{match.firstSeen}</td>
                      <td>{match.lastSeen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              문자열이 인용되거나 복사된 결과도 포함됩니다. 소유자가 직접
              운영한 표면웹 사이트인지 NetScope에서 확인하세요.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
