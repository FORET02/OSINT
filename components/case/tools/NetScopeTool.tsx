"use client";

import { useMemo, useState } from "react";
import {
  COMMUNITY_POSTS,
  MARKET_BITCOIN_ADDRESS,
  ONION_SERVICES,
  OPERATOR_PSEUDONYM,
  SEARCH_RESULTS,
  SURFACE_SITES,
  TRAP_SEARCH_RESULT,
} from "../../../data/case01";
import type {
  CommunityPost,
  SearchResult,
  SurfaceSite,
} from "../../../types/osint";

type SearchPage =
  | "results"
  | SearchResult["page"]
  | "surface"
  | "community-post"
  | "community-profile"
  | "community-deleted";

export default function NetScopeTool() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [searchPage, setSearchPage] = useState<SearchPage>("results");
  const [selectedSurfaceSite, setSelectedSurfaceSite] =
    useState<SurfaceSite | null>(null);
  const [selectedCommunityPost, setSelectedCommunityPost] =
    useState<CommunityPost | null>(null);

  const visibleSearchResults = useMemo(() => {
    const normalized = submittedQuery.trim().toLowerCase();
    const normalizedUrl = normalized
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");

    if (normalized === "아이s".toLowerCase()) {
      return SEARCH_RESULTS;
    }

    if (normalizedUrl === "www.dgdg.co.kr/?q=is") {
      return SEARCH_RESULTS.filter(
        (result) => result.url === "http://www.dgdg.co.kr/?q=is",
      );
    }

    if (
      normalized === "hidden links directory" ||
      normalizedUrl === "hiddenlinks.app/market"
    ) {
      return [TRAP_SEARCH_RESULT];
    }

    return [];
  }, [submittedQuery]);

  const visibleSurfaceSites = useMemo(() => {
    const normalized = submittedQuery
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");

    return SURFACE_SITES.filter((site) => {
      const normalizedUrl = site.url
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "");
      return normalized === site.domain || normalized === normalizedUrl;
    });
  }, [submittedQuery]);

  const visibleCommunityPosts = useMemo(() => {
    if (
      submittedQuery.trim().toLowerCase() !==
      OPERATOR_PSEUDONYM.toLowerCase()
    ) {
      return [];
    }

    const target = COMMUNITY_POSTS.find(
      (post) => post.alias === "hjhjhj77",
    );
    const otherPosts = COMMUNITY_POSTS.filter(
      (post) => post.alias !== "hjhjhj77",
    );

    return target
      ? [...otherPosts.slice(0, 7), target, ...otherPosts.slice(7)]
      : otherPosts;
  }, [submittedQuery]);

  const resultKind =
    visibleSearchResults.length > 0
      ? "web"
      : visibleSurfaceSites.length > 0
        ? "surface"
        : visibleCommunityPosts.length > 0
          ? "community"
          : "empty";

  function runSearch(event: React.FormEvent) {
    event.preventDefault();
    setSubmittedQuery(query);
    setSearchPage("results");
    setSelectedSurfaceSite(null);
    setSelectedCommunityPost(null);
  }

  function goBack() {
    if (searchPage === "community-profile") {
      setSearchPage("community-post");
      return;
    }
    setSearchPage("results");
  }

  return (
    <div className="browser-frame">
      <form className="browser-bar" onSubmit={runSearch}>
        {searchPage !== "results" && (
          <button
            type="button"
            className="browser-back"
            onClick={goBack}
            aria-label="검색 결과로 돌아가기"
          >
            ←
          </button>
        )}
        <label className="sr-only" htmlFor="netscope-search">
          NetScope 검색
        </label>
        <input
          id="netscope-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="키워드 또는 URL 검색"
          autoComplete="off"
        />
        <button className="browser-go">검색</button>
      </form>

      <div className="browser-viewport">
        {!submittedQuery && searchPage === "results" && (
          <div className="search-home">
            <div className="netscope-mark">N</div>
            <h3>NetScope</h3>
            <p>공개 웹의 문서와 색인 정보를 검색합니다.</p>
          </div>
        )}

        {submittedQuery &&
          searchPage === "results" &&
          resultKind === "web" && (
            <div className="search-results">
              <p className="result-count">
                “{submittedQuery}” 관련 결과 {visibleSearchResults.length}건
              </p>
              {visibleSearchResults.map((result) => (
                <button
                  className="search-result"
                  key={result.url}
                  onClick={() => setSearchPage(result.page)}
                >
                  <span className="result-url">{result.url}</span>
                  <strong>{result.title}</strong>
                  <span>{result.description}</span>
                </button>
              ))}
            </div>
          )}

        {submittedQuery &&
          searchPage === "results" &&
          resultKind === "surface" && (
            <div className="search-results">
              <p className="result-count">
                “{submittedQuery}” 관련 결과 {visibleSurfaceSites.length}건
              </p>
              {visibleSurfaceSites.map((site) => (
                <button
                  className="search-result"
                  key={site.domain}
                  onClick={() => {
                    setSelectedSurfaceSite(site);
                    setSearchPage("surface");
                  }}
                >
                  <span className="result-url">{site.url}</span>
                  <strong>
                    {site.name} — {site.headline}
                  </strong>
                  <span>{site.description}</span>
                </button>
              ))}
            </div>
          )}

        {submittedQuery &&
          searchPage === "results" &&
          resultKind === "community" && (
            <CommunitySearchResults
              query={submittedQuery}
              posts={visibleCommunityPosts}
              onOpen={(post) => {
                setSelectedCommunityPost(post);
                setSearchPage(
                  post.status === "deleted"
                    ? "community-deleted"
                    : "community-post",
                );
              }}
            />
          )}

        {submittedQuery &&
          searchPage === "results" &&
          resultKind === "empty" && (
            <div className="empty-state">
              <div aria-hidden="true">⌕</div>
              <h3>관련 결과가 없습니다</h3>
              <p>
                증거함이나 수사 도구에서 확인한 키워드, URL, 도메인 또는
                가명을 그대로 검색하세요.
              </p>
            </div>
          )}

        {searchPage === "dgdg" && <DgdgPage />}
        {searchPage === "slang" && <DrugSlangPage />}
        {searchPage === "safety" && <DrugSafetyPage />}
        {searchPage === "trap" && <TrapDirectoryPage />}
        {searchPage === "surface" && selectedSurfaceSite && (
          <SurfaceWebsite site={selectedSurfaceSite} />
        )}
        {searchPage === "community-post" && selectedCommunityPost && (
          <CommunityPostPage
            post={selectedCommunityPost}
            onOpenProfile={() => setSearchPage("community-profile")}
          />
        )}
        {searchPage === "community-profile" &&
          selectedCommunityPost?.profile && (
            <CommunityProfilePage post={selectedCommunityPost} />
          )}
        {searchPage === "community-deleted" && selectedCommunityPost && (
          <DeletedCommunityPage post={selectedCommunityPost} />
        )}
      </div>
    </div>
  );
}

function CommunitySearchResults({
  query,
  posts,
  onOpen,
}: {
  query: string;
  posts: CommunityPost[];
  onOpen: (post: CommunityPost) => void;
}) {
  return (
    <article className="crypto-community">
      <header className="crypto-community-header">
        <div>
          <span aria-hidden="true">₿</span>
          <div>
            <strong>CoinSquare</strong>
            <small>암호화폐 자유 커뮤니티</small>
          </div>
        </div>
        <nav>
          <span>자유게시판</span>
          <span>시장 이야기</span>
          <span>기술</span>
          <span>프로필</span>
        </nav>
      </header>
      <section className="community-search-summary">
        <span>SEARCH RESULTS</span>
        <h3>“{query}” 관련 게시물</h3>
        <p>CoinSquare 공개 색인 · 총 {posts.length}건</p>
      </section>
      <div className="community-result-list">
        {posts.map((post) => (
          <button
            key={post.id}
            className="community-result-card"
            onClick={() => onOpen(post)}
          >
            <div className="community-result-icon" aria-hidden="true">
              {post.alias.slice(-2)}
            </div>
            <div>
              <span className="community-result-meta">
                @{post.alias} · {post.postedAt}
              </span>
              <strong>{post.title}</strong>
              <p>{post.preview}</p>
            </div>
            <span className="community-result-state">
              게시물 보기 →
            </span>
          </button>
        ))}
      </div>
    </article>
  );
}

function CommunityPostPage({
  post,
  onOpenProfile,
}: {
  post: CommunityPost;
  onOpenProfile: () => void;
}) {
  return (
    <article className="crypto-community community-post-page">
      <header className="crypto-community-header">
        <div>
          <span aria-hidden="true">₿</span>
          <div>
            <strong>CoinSquare</strong>
            <small>자유게시판 / 게시물 #{post.id}</small>
          </div>
        </div>
      </header>
      <section className="community-post-content">
        <div className="community-post-author">
          <div
            className={`profile-sprite portrait-${post.profile?.portraitIndex ?? 0}`}
            aria-label={`${post.alias} 프로필 사진`}
          />
          <div>
            <strong>@{post.alias}</strong>
            <span>{post.postedAt}</span>
          </div>
          <button onClick={onOpenProfile}>프로필 보기</button>
        </div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <div className="donation-card">
          <span>BITCOIN DONATION</span>
          <p>글이 도움이 되었다면 비트코인 후원 부탁드립니다.</p>
          <code>{post.bitcoinAddress}</code>
        </div>
        <aside className="wallet-check-note">
          미리보기에는 표시되지 않은 주소입니다. OnionScope의 너굴상점 입금
          주소와 전체 문자열을 비교하세요.
        </aside>
      </section>
    </article>
  );
}

function CommunityProfilePage({ post }: { post: CommunityPost }) {
  const profile = post.profile;
  if (!profile) return null;

  return (
    <article className="crypto-community community-profile-page">
      <header className="crypto-community-header">
        <div>
          <span aria-hidden="true">₿</span>
          <div>
            <strong>CoinSquare</strong>
            <small>회원 프로필</small>
          </div>
        </div>
      </header>
      <section className="profile-cover">
        <div
          className={`profile-sprite profile-sprite-large portrait-${profile.portraitIndex}`}
          aria-label={`${profile.alias} 프로필 사진`}
        />
        <div>
          <span>PUBLIC PROFILE</span>
          <h3>{profile.realName}</h3>
          <p>@{profile.alias}</p>
        </div>
      </section>
      <section className="profile-details">
        <header>
          <strong>공개 연락처 정보</strong>
          <span>가입일 {profile.joinedAt}</span>
        </header>
        <dl>
          <div>
            <dt>이름</dt>
            <dd>{profile.realName}</dd>
          </div>
          <div>
            <dt>닉네임</dt>
            <dd>{profile.alias}</dd>
          </div>
          <div>
            <dt>전화번호</dt>
            <dd>{profile.phone}</dd>
          </div>
          <div>
            <dt>이메일 주소</dt>
            <dd>{profile.email}</dd>
          </div>
        </dl>
        {post.bitcoinAddress === MARKET_BITCOIN_ADDRESS && (
          <div className="profile-match-banner">
            게시물의 비트코인 주소가 너굴상점 입금 주소와 일치합니다.
          </div>
        )}
      </section>
    </article>
  );
}

function DeletedCommunityPage({ post }: { post: CommunityPost }) {
  return (
    <article className="crypto-community deleted-community-page">
      <header className="crypto-community-header">
        <div>
          <span aria-hidden="true">₿</span>
          <div>
            <strong>CoinSquare</strong>
            <small>자유게시판 / @{post.alias}</small>
          </div>
        </div>
      </header>
      <section>
        <span aria-hidden="true">×</span>
        <h3>삭제된 페이지입니다</h3>
        <p>작성자 또는 운영 정책에 의해 게시물과 프로필이 삭제되었습니다.</p>
      </section>
    </article>
  );
}

function SurfaceWebsite({ site }: { site: SurfaceSite }) {
  return (
    <article
      className={`surface-site surface-theme-${site.theme}`}
      aria-label={`${site.name} 웹 사이트`}
    >
      <header className="surface-site-header">
        <div className="surface-brand">
          <span>{site.name.slice(0, 2).toUpperCase()}</span>
          <div>
            <strong>{site.name}</strong>
            <small>{site.category}</small>
          </div>
        </div>
        <nav aria-label={`${site.name} 메뉴`}>
          {site.navigation.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
      </header>

      <section className="surface-hero">
        <span>{site.domain}</span>
        <h3>{site.headline}</h3>
        <p>{site.description}</p>
      </section>

      <div className="surface-layout">
        <main className="surface-feed">
          {site.posts.map((post, index) => (
            <div key={post.title}>
              <article className="surface-post">
                <div className="surface-post-meta">
                  <span>{post.tag}</span>
                  <small>{post.meta}</small>
                </div>
                <h4>{post.title}</h4>
                <p>{post.excerpt}</p>
                {site.theme === "raclog" && index === 0 && (
                  <div className="promotion-detail">
                    <strong>PROJECT LINKED</strong>
                    <p>
                      카탈로그 구성: 갑옷 · 무기 · 왕관 / 결제 자동화 실험 /
                      비공개 네트워크 배포
                    </p>
                  </div>
                )}
              </article>

              {site.identity && index === 0 && (
                <section className="operator-license">
                  <header>
                    <span>RACLOG CREATOR LICENSE</span>
                    <b>ACTIVE</b>
                  </header>
                  <dl>
                    <div>
                      <dt>{site.identity.role}</dt>
                      <dd>{site.identity.alias}</dd>
                    </div>
                    <div>
                      <dt>라이선스 번호</dt>
                      <dd>{site.identity.license}</dd>
                    </div>
                    <div>
                      <dt>등록일</dt>
                      <dd>{site.identity.issued}</dd>
                    </div>
                    <div>
                      <dt>연락처</dt>
                      <dd>{site.identity.phone}</dd>
                    </div>
                  </dl>
                  <p>
                    게시물 및 프로젝트의 운영 책임 표시는 등록된 가명으로
                    공개됩니다.
                  </p>
                </section>
              )}
            </div>
          ))}
        </main>

        <aside className="surface-sidebar">
          <strong>SITE INFO</strong>
          <span>Domain</span>
          <code>{site.domain}</code>
          <span>Category</span>
          <b>{site.category}</b>
          <div className="surface-status">
            <i aria-hidden="true" /> ONLINE
          </div>
        </aside>
      </div>

      <footer>
        <span>© {site.name}</span>
        <span>Archive · Terms · Contact</span>
      </footer>
    </article>
  );
}

function DgdgPage() {
  return (
    <article className="web-page directory-page">
      <div className="directory-header">
        <span>DGDG</span>
        <div>
          <h3>아이s 익명 정보 게시판</h3>
          <p>www.dgdg.co.kr/?q=is · 검색 결과 아카이브</p>
        </div>
      </div>
      <div className="service-list">
        {ONION_SERVICES.map((service) => (
          <div className="service-row" key={service.address}>
            <div className="service-status" data-status={service.status} />
            <div className="service-copy">
              <strong>{service.directoryName}</strong>
              <code>{service.address}</code>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function DrugSlangPage() {
  return (
    <article className="web-page notice-page">
      <div className="notice-brand">마약 은어 정보</div>
      <p className="notice-date">온라인 유통 표현 예방 자료</p>
      <h3>온라인에서 사용되는 마약 은어</h3>
      <p>
        불법 약물 판매자는 검색을 피하기 위해 상품명, 기호, 영문자를 조합한
        은어를 사용합니다. 같은 표현도 게시물의 문맥에 따라 전혀 다른 의미로
        사용될 수 있으므로 단어 하나만으로 불법 거래를 단정할 수 없습니다.
      </p>
      <p className="notice-footnote">
        이 정보 페이지에는 외부 비공개 서비스의 접속 주소가 제공되지 않습니다.
      </p>
    </article>
  );
}

function DrugSafetyPage() {
  return (
    <article className="web-page community-page">
      <div className="community-nav">마약류 피해 상담 / 공개 게시판</div>
      <h3>온라인 커뮤니티 거래 피해 사례</h3>
      <p>
        익명 커뮤니티나 SNS에서 알게 된 판매자에게 송금한 뒤 연락이 끊기는
        피해가 반복되고 있습니다. 의심되는 게시물은 직접 거래하지 말고
        관계기관에 신고하세요.
      </p>
      <div className="community-tags">
        <span>#피해사례</span>
        <span>#신고안내</span>
        <span>#예방교육</span>
      </div>
    </article>
  );
}

function TrapDirectoryPage() {
  return (
    <article className="web-page directory-page trap-page">
      <div className="directory-header">
        <span>HL/INDEX</span>
        <div>
          <h3>Hidden Links Directory</h3>
          <p>hiddenlinks.app/market · unverified index</p>
        </div>
      </div>
      <div className="directory-warning">
        이 디렉터리는 최신 주소의 검증 상태를 보장하지 않습니다.
      </div>
      <div className="trap-list">
        <div>
          <strong>Anonymous Community</strong>
          <span>주소 확인 불가 · 마지막 응답 2025-11-03</span>
        </div>
        <div>
          <strong>Private Market Archive</strong>
          <span>서비스 종료 · 링크 제거됨</span>
        </div>
        <div>
          <strong>Secure Message Board</strong>
          <span>검증 대기 중 · 접속 정보 없음</span>
        </div>
      </div>
      <p className="trap-footnote">
        현재 공개된 접속 주소가 없습니다. 다른 검색 단서를 확인하세요.
      </p>
    </article>
  );
}
