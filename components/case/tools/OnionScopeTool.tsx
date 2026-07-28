"use client";

import {
  MARKET_BITCOIN_ADDRESS,
  ONION_SERVICES,
} from "../../../data/case01";

type OnionScopeProps = {
  onionAddress: string;
  setOnionAddress: (value: string) => void;
  visitOnion: (event: React.FormEvent) => void;
  visitedOnion: string;
  currentService: (typeof ONION_SERVICES)[number] | undefined;
};

export default function OnionScopeTool({
  onionAddress,
  setOnionAddress,
  visitOnion,
  visitedOnion,
  currentService,
}: OnionScopeProps) {
  return (
    <div className="browser-frame onion-browser">
      <form className="browser-bar" onSubmit={visitOnion}>
        <span className="tor-icon" aria-hidden="true">
          ◉
        </span>
        <label className="sr-only" htmlFor="onion-address">
          OnionScope 주소
        </label>
        <input
          id="onion-address"
          value={onionAddress}
          onChange={(event) => setOnionAddress(event.target.value)}
          placeholder="주소를 직접 입력하세요"
          autoComplete="off"
          spellCheck={false}
        />
        <button className="browser-go">접속</button>
      </form>

      <div className="browser-viewport">
        {!visitedOnion && (
          <div className="onion-home">
            <div className="onion-logo" aria-hidden="true">
              ◎
            </div>
            <h3>OnionScope</h3>
            <p>비공개 서비스 주소를 입력해 격리된 환경에서 확인하세요.</p>
            <div className="connection-badge">Tor circuit ready</div>
          </div>
        )}

        {visitedOnion && !currentService && (
          <div className="connection-error">
            <span>!</span>
            <h3>Onion site not found</h3>
            <p>
              주소 형식을 확인하거나, 디렉터리에서 확인한 전체 주소를
              입력하세요.
            </p>
          </div>
        )}

        {currentService?.kind === "official" && <OfficialMarket />}
        {currentService?.kind === "forum" && <ForumPage />}
        {currentService?.kind === "files" && <FileRelayPage />}
        {currentService?.kind === "ordinary" && <CoffeePage />}
        {currentService?.kind === "decoy" && <DecoyPage />}
      </div>
    </div>
  );
}

function OfficialMarket() {
  return (
    <article className="onion-site official-market">
      <div className="market-topline">
        <span className="market-logo">너굴상점</span>
      </div>
      <div className="market-catalog">
        <span className="market-overline">PRODUCT CATALOG</span>
        <h3>상품 목록</h3>
        <p>익명 배송 · BTC 결제</p>
      </div>
      <div className="product-grid">
        <article className="product-card">
          <span className="product-icon" aria-hidden="true">
            ◈
          </span>
          <div>
            <h4>갑옷</h4>
            <strong>0.5 BTC</strong>
          </div>
        </article>
        <article className="product-card">
          <span className="product-icon" aria-hidden="true">
            ⚔
          </span>
          <div>
            <h4>무기</h4>
            <strong>0.6 BTC</strong>
          </div>
        </article>
        <article className="product-card">
          <span className="product-icon crown" aria-hidden="true">
            ♛
          </span>
          <div>
            <h4>왕관</h4>
            <strong>1.0 BTC</strong>
          </div>
        </article>
      </div>
      <div className="bitcoin-panel">
        <span>비트코인 입금 주소</span>
        <code>{MARKET_BITCOIN_ADDRESS}</code>
      </div>
    </article>
  );
}

function ForumPage() {
  return (
    <article className="onion-site generic-site forum-site">
      <div className="generic-brand">NOCTURNE</div>
      <h3>Privacy & Hardware Board</h3>
      <p>익명 네트워크, 보안 하드웨어, 암호화 기술을 토론하는 회원제 포럼</p>
      <div className="forum-topics">
        <span>Self-hosting starter guide</span>
        <span>Hardware keys in 2026</span>
        <span>Relay status thread</span>
      </div>
    </article>
  );
}

function FileRelayPage() {
  return (
    <article className="onion-site generic-site relay-site">
      <div className="generic-brand">CIPHER DROP</div>
      <h3>Encrypted file relay</h3>
      <p>전달 코드를 입력하면 1회 암호화 파일을 내려받을 수 있습니다.</p>
      <div className="fake-input">12-character delivery code</div>
    </article>
  );
}

function CoffeePage() {
  return (
    <article className="onion-site generic-site coffee-site">
      <div className="generic-brand">MOONLIGHT BEANS</div>
      <h3>Small-batch coffee collective</h3>
      <p>검열 지역의 독립 로스터를 위한 비공개 공동구매 게시판입니다.</p>
      <div className="coffee-card">New harvest · Ethiopia Guji · 250g</div>
    </article>
  );
}

function DecoyPage() {
  return (
    <article className="onion-site decoy-site">
      <div className="warning-icon">!</div>
      <h3>접속이 차단되었습니다</h3>
      <p>
        이 주소는 사칭·피싱 신고로 격리되었습니다. 자격 증명이나 암호화폐를
        입력하지 마세요.
      </p>
      <span>Last valid response: 2026-05-30</span>
    </article>
  );
}
