"use client";

import { useEffect, useState } from "react";
import {
  CASE05_META,
  CASE_META,
  QUESTION_FIVE_HINTS,
} from "../../data/case01";
import InvestigationToolDesktop from "./InvestigationToolDesktop";

type AnswerState = "idle" | "checking" | "correct" | "incorrect";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function CaseFiveWorkspace({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [seconds, setSeconds] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [hintCount, setHintCount] = useState(0);

  useEffect(() => {
    if (answerState === "correct") return;
    const timer = window.setInterval(
      () => setSeconds((value) => value + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [answerState]);

  async function submitAnswer(event: React.FormEvent) {
    event.preventDefault();
    setAnswerState("checking");

    try {
      const response = await fetch("/api/case/05/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      });
      const result = (await response.json()) as { correct?: boolean };
      setAnswerState(result.correct ? "correct" : "incorrect");
    } catch {
      setAnswerState("incorrect");
    }
  }

  const questionPanel = (
    <section className="question-panel" aria-labelledby="question-five-title">
      <div className="progress-row">
        <span>목표</span>
        <strong>
          {answerState === "correct" ? "1 / 1 완료" : "0 / 1 완료"}
        </strong>
      </div>

      <div className="question-card">
        <div className="question-number">{CASE05_META.number}</div>
        <h1 id="question-five-title">{CASE05_META.question}</h1>

        <div className="problem-brief">
          <p>
            수사 결과, 다크웹 너굴상점의 최고가 아이템인{" "}
            <strong>‘왕관’</strong>을 구매한 범인은 추적을 피하기 위해
            대형 자금 세탁용 <strong>믹서(Mixer) 지갑</strong>을 경유한
            것으로 확인되었습니다.
          </p>
          <p>
            <strong>이 3일간의 덤프 기록 안에서 범인은 본인의 지갑에서 믹서
            지갑으로 자금을 보냈고, 믹서 지갑은 이 자금을 여러 개의
            ‘중간 지갑’으로 쪼개서 분배했습니다. 이후 범인은 분산된 중간
            지갑들의 자금을 한 번에 합쳐 상점에 최종 결제를
            수행했습니다.</strong>
          </p>
          <p>
            첨부된 <code>master_blockchain_dump.log</code>를 분석하여,
            수많은 결제 내역 중 로그 안에 자금의 출처와 분배 내역이
            명확히 남아 있는 단 하나의 결제 경로를 역추적하고, 자금
            세탁의 핵심 경유지인 믹서 지갑의 정확한 주소를 찾아내세요.
          </p>
        </div>

        <form className="answer-form" onSubmit={submitAnswer}>
          <label className="sr-only" htmlFor="answer-five">
            믹서 지갑 주소
          </label>
          <input
            id="answer-five"
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
              setAnswerState("idle");
            }}
            autoComplete="off"
            spellCheck={false}
            disabled={
              answerState === "correct" || answerState === "checking"
            }
          />
          <button
            className="primary-button"
            disabled={!answer.trim() || answerState === "checking"}
          >
            {answerState === "checking" ? "확인 중…" : "확인"}
          </button>
        </form>

        {answerState === "incorrect" && (
          <div className="feedback error" role="alert">
            지갑 주소가 일치하지 않습니다. 단일 금액이 아닌 거래 사이의
            자금 흐름을 다시 확인하세요.
          </div>
        )}

        {answerState === "correct" && (
          <div className="feedback success linked-success" role="status">
            <div>
              <strong>자금 흐름 확인 완료.</strong> 분배와 병합 거래의 UTXO
              연속성을 따라 자금 세탁의 핵심 경유지인 믹서 지갑을
              특정했습니다. 경과 시간은 {formatTime(seconds)}입니다.
            </div>
            <button
              className="primary-button compact-button"
              onClick={onContinue}
            >
              문제 6 계속 →
            </button>
          </div>
        )}

        <div className="hint-area">
          <div className="hint-heading">
            <span>
              힌트 {hintCount} / {QUESTION_FIVE_HINTS.length} 사용
            </span>
            <button
              className="secondary-button"
              onClick={() =>
                setHintCount((count) =>
                  Math.min(count + 1, QUESTION_FIVE_HINTS.length),
                )
              }
              disabled={hintCount === QUESTION_FIVE_HINTS.length}
            >
              {hintCount === QUESTION_FIVE_HINTS.length
                ? "힌트 모두 확인"
                : "힌트 보기"}
            </button>
          </div>
          {hintCount > 0 && (
            <ol className="hint-list">
              {QUESTION_FIVE_HINTS.slice(0, hintCount).map((hint) => (
                <li key={hint}>{hint}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );

  return (
    <main className="workspace-shell">
      <header className="case-header">
        <button
          className="back-button"
          onClick={onBack}
          aria-label="사건 소개로 돌아가기"
        >
          <span aria-hidden="true">←</span> 사건 소개
        </button>
        <div className="case-heading">
          <span className="case-kicker">{CASE_META.number}</span>
          <strong>{CASE_META.title}</strong>
        </div>
        <time className="timer" aria-label={`경과 시간 ${formatTime(seconds)}`}>
          {formatTime(seconds)}
        </time>
      </header>

      <InvestigationToolDesktop
        caseOneComplete
        caseTwoComplete
        caseThreeComplete
        caseFourComplete
        caseNumber={5}
        notesMode="case-five"
      >
        {questionPanel}
      </InvestigationToolDesktop>
    </main>
  );
}
