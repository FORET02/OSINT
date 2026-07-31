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
          <span>{CASE_META.category}</span>
        </div>
        <h1 id="case-title">{CASE_META.title}</h1>
        <p className="intro-lead">
          코드명 <strong>‘왕관’</strong>으로 불리는 불법
          물품이 다크웹 마켓 <strong>‘너굴상점’</strong>을 통해 유통되고
          있다는 첩보가 입수되었다. 너굴상점은 익명 네트워크와 암호화폐를
          이용하여 운영자의 신원과 거래 내역을 철저히 숨겨온 것으로
          알려졌다.
        </p>
        <p>
          수사기관은 관련 용의자의 PC에서 브라우저 사용 기록을 확보했으며,
          추가 수사를 통해 너굴상점과 관련된 웹 활동 자료, 암호화폐 거래
          기록 및 용의자 정보를 수집하였다. 그러나 확보된 자료에는 사건과
          무관한 기록과 위장된 정보가 다수 포함되어 있어, 단편적인
          흔적만으로는 실제 운영자와 구매자를 특정하기 어려운 상황이다.
        </p>
        <p>
          제공된 증거와 분석 도구를 활용하여 너굴상점의 실체를
          추적하고, 온라인에 남은 여러 흔적의 연관성을 분석해야 한다. 이후
          너굴상점 운영자의 신원을 밝히고, 복잡하게 분산된 암호화폐 거래
          기록을 조사하여 불법 거래에 관여한 주요 인물들을 최종적으로
          특정하라.
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
