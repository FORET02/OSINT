import { NextResponse } from "next/server";
import { VIP_BUYERS } from "../../../../../data/case01";

function normalizeBuyerList(value: unknown) {
  if (typeof value !== "string") return "";

  return value
    .split(/[,，/\n]+/)
    .map((name) => name.trim().replace(/\s+/g, ""))
    .filter(Boolean)
    .join(",");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { answer?: unknown };
    const correct =
      normalizeBuyerList(body.answer) === VIP_BUYERS.join(",");

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
