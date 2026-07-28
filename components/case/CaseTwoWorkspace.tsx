"use client";

import { useEffect, useState } from "react";
import {
  CASE02_META,
  CASE_META,
  QUESTION_TWO_HINTS,
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

export default function CaseTwoWorkspace({
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
      const response = await fetch("/api/case/02/submit", {
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
    <section className="question-panel" aria-labelledby="question-two-title">
      <div className="progress-row">
        <span>목표</span>
        <strong>
          {answerState === "correct" ? "1 / 1 완료" : "0 / 1 완료"}
        </strong>
      </div>

      <div className="question-card">
        <div className="question-number">{CASE02_META.number}</div>
        <h1 id="question-two-title">{CASE02_META.question}</h1>

        <form className="answer-form" onSubmit={submitAnswer}>
          <label className="sr-only" htmlFor="answer-two">
            재사용된 식별 값
          </label>
          <input
            id="answer-two"
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
            식별 값이 일치하지 않습니다. OnionScope 개발자 도구의 소스 코드를
            다시 확인하세요.
          </div>
        )}

        {answerState === "correct" && (
          <div className="feedback success linked-success" role="status">
            <div>
              <strong>수사 완료.</strong> 운영자가 재사용한 식별 값을 정확히
              확인했습니다. 경과 시간은 {formatTime(seconds)}입니다.
            </div>
            <button
              className="primary-button compact-button"
              onClick={onContinue}
            >
              문제 3 계속 →
            </button>
          </div>
        )}

        <div className="hint-area">
          <div className="hint-heading">
            <span>
              힌트 {hintCount} / {QUESTION_TWO_HINTS.length} 사용
            </span>
            <button
              className="secondary-button"
              onClick={() =>
                setHintCount((count) =>
                  Math.min(count + 1, QUESTION_TWO_HINTS.length),
                )
              }
              disabled={hintCount === QUESTION_TWO_HINTS.length}
            >
              {hintCount === QUESTION_TWO_HINTS.length
                ? "힌트 모두 확인"
                : "힌트 보기"}
            </button>
          </div>
          {hintCount > 0 && (
            <ol className="hint-list">
              {QUESTION_TWO_HINTS.slice(0, hintCount).map((hint) => (
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
        caseTwoComplete={answerState === "correct"}
        caseThreeComplete={false}
        caseNumber={2}
        notesMode="case-two"
      >
        {questionPanel}
      </InvestigationToolDesktop>
    </main>
  );
}
