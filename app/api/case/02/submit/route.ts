import { NextResponse } from "next/server";
import {
  ANALYTICS_IDENTIFIER_DIGEST,
  sha256Hex,
} from "../../../../../lib/answerProtection";

function normalizeIdentifier(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().toUpperCase();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { answer?: unknown };
    const submittedDigest = await sha256Hex(
      normalizeIdentifier(body.answer),
    );
    const correct = submittedDigest === ANALYTICS_IDENTIFIER_DIGEST;

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
