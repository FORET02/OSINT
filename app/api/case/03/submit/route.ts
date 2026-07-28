import { NextResponse } from "next/server";
import { OPERATOR_PSEUDONYM } from "../../../../../data/case01";

function normalizeAlias(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { answer?: unknown };
    const correct =
      normalizeAlias(body.answer) === normalizeAlias(OPERATOR_PSEUDONYM);

    return NextResponse.json(
      { correct },
      {
        status: correct ? 200 : 400,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { correct: false, message: "올바른 형식으로 정답을 제출해주세요." },
      {
        status: 400,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
