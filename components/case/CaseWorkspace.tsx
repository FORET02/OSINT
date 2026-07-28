"use client";

import { useState } from "react";
import { CASE_META } from "../../data/case01";
import CaseFourWorkspace from "./CaseFourWorkspace";
import CaseFiveWorkspace from "./CaseFiveWorkspace";
import CaseOneWorkspace from "./CaseOneWorkspace";
import CaseSixWorkspace from "./CaseSixWorkspace";
import CaseThreeWorkspace from "./CaseThreeWorkspace";
import CaseTwoWorkspace from "./CaseTwoWorkspace";

type Screen =
  | "intro"
  | "question-one"
  | "question-two"
  | "question-three"
  | "question-four"
  | "question-five"
  | "question-six";

export default function CaseWorkspace() {
  const [screen, setScreen] = useState<Screen>("intro");

  if (screen === "question-one") {
    return (
      <CaseOneWorkspace
        onBack={() => setScreen("intro")}
        onContinue={() => setScreen("question-two")}
      />
    );
  }

  if (screen === "question-two") {
    return (
      <CaseTwoWorkspace
        onBack={() => setScreen("intro")}
        onContinue={() => setScreen("question-three")}
      />
    );
  }

  if (screen === "question-three") {
    return (
      <CaseThreeWorkspace
        onBack={() => setScreen("intro")}
        onContinue={() => setScreen("question-four")}
      />
    );
  }

  if (screen === "question-four") {
    return (
      <CaseFourWorkspace
        onBack={() => setScreen("intro")}
        onContinue={() => setScreen("question-five")}
      />
    );
  }

  if (screen === "question-five") {
    return (
      <CaseFiveWorkspace
        onBack={() => setScreen("intro")}
        onContinue={() => setScreen("question-six")}
      />
    );
  }

  if (screen === "question-six") {
    return <CaseSixWorkspace onBack={() => setScreen("intro")} />;
  }

  return (
    <main className="intro-shell">
      <section className="intro-card" aria-labelledby="case-title">
        <div className="eyebrow">
          <span>{CASE_META.number}</span>
          <span aria-hidden="true">·</span>
          <span>{CASE_META.category}</span>
        </div>
        <h1 id="case-title">{CASE_META.title}</h1>
        <p className="intro-lead">
          2026년 6월, 코드명 <strong>‘왕관’</strong>으로 유통되는 불법
          물품이 다크웹 마켓 <strong>‘너굴상점’</strong>에서 거래된다는
          첩보가 입수됐다.
        </p>
        <p>
          압수된 PC에는 웹 브라우저 히스토리가 남아 있다. 증거에 포함된 검색
          흔적을 분석하고, 두 개의 브라우저 도구를 이용해 마켓의 공식 접속
          주소를 특정하고, 재사용된 웹 추적 식별자를 따라 운영자의 표면웹
          가명을 확인한 뒤 암호화폐 커뮤니티의 지갑 주소를 대조해 운영자의
          실명을 특정하라. 마지막으로 블록체인 덤프의 UTXO 흐름을
          역추적해 자금 세탁에 사용된 믹서 지갑을 밝히고, 믹서 유입
          주소와 용의자 명단을 교차 대조해 VIP 구매자 3명을 특정하라.
        </p>
        <p className="simulation-note">
          교육용 가상 시나리오입니다. 화면 속 인물·사이트·주소·데이터는 모두
          허구입니다.
        </p>
        <button
          className="primary-button intro-button"
          onClick={() => setScreen("question-one")}
        >
          수사 시작 <span aria-hidden="true">→</span>
        </button>
      </section>
    </main>
  );
}
