"use client";

import { useState } from "react";

export default function NotesTool({
  mode = "case-two",
}: {
  mode?:
    | "case-one"
    | "case-two"
    | "case-three"
    | "case-four"
    | "case-five"
    | "case-six";
}) {
  const [notes, setNotes] = useState("");
  const isCaseOne = mode === "case-one";
  const isCaseThree = mode === "case-three";
  const isCaseFour = mode === "case-four";
  const isCaseFive = mode === "case-five";
  const isCaseSix = mode === "case-six";

  return (
    <div className="notes-tool">
      <p>
        {isCaseOne
          ? "검색어, 후보 주소, 페이지에서 확인한 단서를 자유롭게 기록하세요."
          : isCaseThree
            ? "식별 값 검색 결과, 후보 도메인, 가명 단서를 자유롭게 기록하세요."
            : isCaseFour
              ? "가명 후보, 게시물의 비트코인 주소, 프로필 실명 정보를 기록하세요."
              : isCaseFive
                ? "결제 후보, 중간 지갑의 이전 Out, 분배 트랜잭션의 입력 지갑을 기록하세요."
                : isCaseSix
                  ? "믹서 유입 In 주소, CSV 일치 항목, 구매자 이름을 기록하세요."
              : "공식 주소와 소스 코드에서 확인한 단서를 자유롭게 기록하세요."}
      </p>
      <label htmlFor={`investigation-notes-${mode}`}>
        {isCaseOne
          ? "사건 01 수사 노트"
          : isCaseThree
            ? "사건 03 수사 노트"
            : isCaseFour
              ? "사건 04 수사 노트"
              : isCaseFive
                ? "사건 05 수사 노트"
                : isCaseSix
                  ? "사건 06 수사 노트"
              : "사건 02 수사 노트"}
      </label>
      <textarea
        id={`investigation-notes-${mode}`}
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder={
          isCaseOne
            ? "예)\n- 히스토리의 수상한 검색어:\n- 후보 주소:\n- 공식 페이지 판단 근거:"
            : isCaseThree
              ? "예)\n- 식별 값:\n- 후보 표면웹 도메인:\n- 라이선스에서 확인한 가명:"
              : isCaseFour
                ? "예)\n- 검색한 가명:\n- 일치한 비트코인 주소:\n- 프로필 실명:"
                : isCaseFive
                  ? "예)\n- 1.0 BTC 결제 TXID:\n- 입력 중간 지갑:\n- 이전 Out 거래:\n- 분배 거래 입력 지갑:"
                  : isCaseSix
                    ? "예)\n- 믹서 지갑:\n- 추출한 In 주소 수:\n- CSV 일치 주소:\n- 가나다순 구매자:"
                : "예)\n- 문제 1 공식 주소:\n- 소스 파일:\n- 재사용된 식별 값:"
        }
      />
      <span className="save-indicator">
        이 브라우저 탭을 닫기 전까지 유지됩니다.
      </span>
    </div>
  );
}
