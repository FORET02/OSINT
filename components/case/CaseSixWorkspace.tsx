"use client";

import { useEffect, useState } from "react";
import {
  CASE06_META,
  CASE_META,
  QUESTION_SIX_HINTS,
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

export default function CaseSixWorkspace({
  onBack,
}: {
  onBack: () => void;
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
      const response = await fetch("/api/case/06/submit", {
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
    <section className="question-panel" aria-labelledby="question-six-title">
      <div className="progress-row">
        <span>목표</span>
        <strong>
          {answerState === "correct" ? "1 / 1 완료" : "0 / 1 완료"}
        </strong>
      </div>

      <div className="question-card">
        <div className="question-number">{CASE06_META.number}</div>
        <h1 id="question-six-title">{CASE06_META.question}</h1>

        <div className="problem-brief">
          <p>
            해당 기간 너굴상점에서는 ‘왕관’뿐 아니라 VIP 아이템인
            ‘갑옷’과 ‘무기’도 판매된 사실이 장부에서 확인되었습니다.
          </p>
          <p>
            5번에서 확인한 자금 세탁 경로를 응용하세요. 세 건의 VIP
            결제는 다수의 함정 트랜잭션 속에 숨겨져 있으며, 구매자들은
            모두 <strong>동일한 대형 믹서 지갑</strong>을 이용한 정황이
            포착되었습니다.
          </p>
          <p>
            <code>master_blockchain_dump.log</code>에서 믹서 지갑으로
            자금을 송금한 최초 출발지(In) 주소들을 추출한 뒤, 오프라인
            용의자 명단 <code>suspect_wallet_mapping.csv</code>와 교차
            대조하여 진짜 구매자 3명을 최종 특정하세요.
          </p>
        </div>

        <p className="answer-guidance">
          이름 3개를 가나다순으로 정렬하고 쉼표로 구분해 입력하세요.
        </p>

        <form className="answer-form" onSubmit={submitAnswer}>
          <label className="sr-only" htmlFor="answer-six">
            VIP 구매자 3명
          </label>
          <input
            id="answer-six"
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
            구매자 명단이 일치하지 않습니다. 믹서 지갑으로 유입된 거래의
            In 주소만 추출해 CSV의 지갑 주소와 교차 대조하고, 일치한
            이름을 가나다순으로 다시 입력하세요.
          </div>
        )}

        {answerState === "correct" && (
          <div className="feedback success" role="status">
            <strong>VIP 구매자 특정 완료.</strong> 믹서 유입 주소와
            오프라인 용의자 명단을 교차 대조해 세 구매자를 모두
            확인했습니다. 경과 시간은 {formatTime(seconds)}입니다.
          </div>
        )}

        <div className="hint-area">
          <div className="hint-heading">
            <span>
              힌트 {hintCount} / {QUESTION_SIX_HINTS.length} 사용
            </span>
            <button
              className="secondary-button"
              onClick={() =>
                setHintCount((count) =>
                  Math.min(count + 1, QUESTION_SIX_HINTS.length),
                )
              }
              disabled={hintCount === QUESTION_SIX_HINTS.length}
            >
              {hintCount === QUESTION_SIX_HINTS.length
                ? "힌트 모두 확인"
                : "힌트 보기"}
            </button>
          </div>
          {hintCount > 0 && (
            <ol className="hint-list">
              {QUESTION_SIX_HINTS.slice(0, hintCount).map((hint) => (
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
        caseFiveComplete
        caseNumber={6}
        notesMode="case-six"
      >
        {questionPanel}
      </InvestigationToolDesktop>
    </main>
  );
}
