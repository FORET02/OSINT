const PROTECTED_IDENTIFIER_PAYLOAD = "CXgVYQ0Wd2UAbXVj";
const KEY_CHARACTER_CODES = [78, 85, 71, 85] as const;

export const ANALYTICS_IDENTIFIER_DIGEST =
  "f127819a02a8b90b9b493efa76651097e8699e57e465c68dbb9921578fdd748a";

function restoreKey() {
  return KEY_CHARACTER_CODES.map((value) =>
    String.fromCharCode(value),
  ).join("");
}

function decodePacket(payload: string, key: string) {
  return Array.from(atob(payload), (character, index) =>
    String.fromCharCode(
      character.charCodeAt(0) ^
        key.charCodeAt(index % key.length),
    ),
  ).join("");
}

export function resolveProtectedIdentifier() {
  const key = restoreKey();
  return decodePacket(PROTECTED_IDENTIFIER_PAYLOAD, key);
}

export async function sha256Hex(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}
