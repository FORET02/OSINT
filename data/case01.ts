import type {
  HistoryEntry,
  OnionService,
  CommunityPost,
  SearchResult,
  SourceMatch,
  SurfaceSite,
  SuspectWallet,
} from "../types/osint";
import { resolveProtectedIdentifier } from "../lib/answerProtection";

export const CASE_META = {
  number: "사건 01",
  category: "다크웹 OSINT",
  title: "너굴상점 — 운영자와 자금 흐름을 추적하라",
  question: "다크웹 마켓 ‘너굴상점’의 공식 주소는?",
};

export const CASE02_META = {
  number: "QUESTION 02",
  question:
    "너굴상점 운영자는 신원을 감추기 위해 여러 흔적을 제거했지만, 하나의 값을 재사용하는 실수를 저질렀다. 해당하는 식별 값은?",
};

export const CASE03_META = {
  number: "QUESTION 03",
  question: "너굴상점 운영자가 표면웹에서 사용한 가명은?",
};

export const CASE04_META = {
  number: "QUESTION 04",
  question: "너굴상점 운영자의 실명은?",
};

export const CASE05_META = {
  number: "QUESTION 05",
  question:
    "다크웹 너굴상점의 자금 세탁에 사용된 믹서(Mixer) 지갑의 정확한 주소는?",
};

export const CASE06_META = {
  number: "QUESTION 06",
  question: "다크웹 너굴상점의 VIP 구매자 3명을 최종 특정하시오.",
};

export const OFFICIAL_ONION_ADDRESS =
  "vcfdov74ftugicb6ukxunyfvo4fifs5ygjcg3s4mddsfgu5rwx3p73hh.onion";

export const OPERATOR_PSEUDONYM = "hjhjhjhj";
export const OPERATOR_REAL_NAME = "김도현";
export const MARKET_BITCOIN_ADDRESS =
  "1NugooL7xZ9vQ2pLk4YnJ8uW3eR5a1X";
export const MIXER_WALLET_ADDRESS =
  "1M9xX9cC3vV4bB6nN8mM9qQ2kMabcDefG";
export const BLOCKCHAIN_DUMP_DRIVE_URL =
  "https://drive.google.com/drive/folders/1Fmq0TIFxa9WDLilDcxpMMad_mCMEpYaM?usp=drive_link";
export const VIP_BUYERS = ["고은지", "김현준", "전소훈"] as const;

export const SUSPECT_WALLETS: SuspectWallet[] = [
  {
    suspectId: "S-001",
    name: "김현준",
    walletAddress: "1Fv9pG7kX8sR2mT4cW5jM6qN3bZ1yHw",
  },
  {
    suspectId: "S-002",
    name: "조성일",
    walletAddress: "1Bg7V4mN2cX9sP3kT6jM8qR1wZ5yHxF",
  },
  {
    suspectId: "S-003",
    name: "고은지",
    walletAddress: "1X8sR2mT4cW5jM6qN3bZ1yHwFv9pG7k",
  },
  {
    suspectId: "S-004",
    name: "김승주",
    walletAddress: "1cN3bZ1yHwFv9pG7kX8sR2mT4cW5jM6",
  },
  {
    suspectId: "S-005",
    name: "김바람",
    walletAddress: "1pG7kX8sR2mT4cW5jM6qN3bZ1yHwFv9",
  },
  {
    suspectId: "S-006",
    name: "김예인",
    walletAddress: "1T4cW5jM6qN3bZ1yHwFv9pG7kX8sR2m",
  },
  {
    suspectId: "S-007",
    name: "김은주",
    walletAddress: "1wFv9pG7kX8sR2mT4cW5jM6qN3bZ1yH",
  },
  {
    suspectId: "S-008",
    name: "류재범",
    walletAddress: "1M6qN3bZ1yHwFv9pG7kX8sR2mT4cW5j",
  },
  {
    suspectId: "S-009",
    name: "박썩소",
    walletAddress: "1sR2mT4cW5jM6qN3bZ1yHwFv9pG7kX8",
  },
  {
    suspectId: "S-010",
    name: "박동균",
    walletAddress: "1yHwFv9pG7kX8sR2mT4cW5jM6qN3bZ1",
  },
  {
    suspectId: "S-011",
    name: "양주아",
    walletAddress: "17kX8sR2mT4cW5jM6qN3bZ1yHwFv9pG",
  },
  {
    suspectId: "S-012",
    name: "오나리",
    walletAddress: "1cW5jM6qN3bZ1yHwFv9pG7kX8sR2mT4",
  },
  {
    suspectId: "S-013",
    name: "전소훈",
    walletAddress: "13bZ1yHwFv9pG7kX8sR2mT4cW5jM6qN",
  },
  {
    suspectId: "S-014",
    name: "정윤지",
    walletAddress: "19pG7kX8sR2mT4cW5jM6qN3bZ1yHwFv",
  },
  {
    suspectId: "S-015",
    name: "조정균",
    walletAddress: "12mT4cW5jM6qN3bZ1yHwFv9pG7kX8sR",
  },
  {
    suspectId: "S-016",
    name: "정한서",
    walletAddress: "1W5jM6qN3bZ1yHwFv9pG7kX8sR2mT4c",
  },
  {
    suspectId: "S-017",
    name: "최서인",
    walletAddress: "1Z1yHwFv9pG7kX8sR2mT4cW5jM6qN3b",
  },
  {
    suspectId: "S-018",
    name: "홍준표",
    walletAddress: "1Fv9pG7kX8sR2mT4cW5jM6qN3bZ1yH2",
  },
];

export const HISTORY_ENTRIES: HistoryEntry[] = [
  {
    visitedAt: "2026-06-14 20:42",
    title: "NAVER",
    url: "https://www.naver.com/",
  },
  {
    visitedAt: "2026-06-14 20:47",
    title: "Netflix",
    url: "https://www.netflix.com/kr/",
  },
  {
    visitedAt: "2026-06-14 20:50",
    title: "Instagram",
    url: "https://www.instagram.com/",
  },
  {
    visitedAt: "2026-06-14 20:52",
    title: "X",
    url: "https://x.com/",
  },
  {
    visitedAt: "2026-06-14 20:53",
    title: "Facebook",
    url: "https://www.facebook.com/",
  },
  {
    visitedAt: "2026-06-14 20:55",
    title: "BoB",
    url: "https://bobedu.kr/home/kor/main.do",
  },
  {
    visitedAt: "2026-06-14 21:03",
    title: "아이s",
    url: "http://www.dgdg.co.kr/?q=is",
  },
  {
    visitedAt: "2026-06-14 21:05",
    title: "Hidden Links Directory",
    url: "http://hiddenlinks.app/market",
  },
  {
    visitedAt: "2026-06-14 21:07",
    title: "Notice",
    url: "http://notice.co.kr/",
  },
  {
    visitedAt: "2026-06-14 21:13",
    title: "디지털포렌식 검색",
    url: "https://www.k-dfs.co.kr/",
  },
];

export const SEARCH_RESULTS: SearchResult[] = [
  {
    title: "마약 은어 — 온라인에서 사용되는 표현 정리",
    url: "https://terms.naver.com/",
    description:
      "온라인에서 사용되는 마약 관련 은어의 의미와 주의사항을 정리한 정보 페이지입니다.",
    page: "slang",
  },
  {
    title: "마약 판매 커뮤니티 — 아이s 게시판",
    url: "http://www.dgdg.co.kr/?q=is",
    description:
      "아이s 관련 게시물과 외부 접속 주소가 공유되는 익명 커뮤니티 검색 결과입니다.",
    page: "dgdg",
  },
  {
    title: "온라인 마약 거래 피해 신고 안내",
    url: "https://www.drugfree.or.kr/",
    description:
      "불법 약물 거래 피해 사례와 신고·상담 정보를 제공하는 예방 안내 페이지입니다.",
    page: "safety",
  },
];

export const TRAP_SEARCH_RESULT: SearchResult = {
  title: "Hidden Links Directory — Market Index",
  url: "http://hiddenlinks.app/market",
  description:
    "비공개 서비스의 카테고리와 상태 정보를 제공한다고 주장하는 링크 디렉터리입니다.",
  page: "trap",
};

export const ONION_SERVICES: OnionService[] = [
  {
    address:
      "nuybfjdsg3mzn3ghgnekqojrc5qoxkpkybjqpo2vhnknsneses3uwq7x.onion",
    directoryName: "Nocturne Board",
    pageTitle: "NOCTURNE / privacy & hardware board",
    status: "online",
    kind: "forum",
  },
  {
    address:
      "i4ibb2a7uh43r5tftfieyb6whfuzjclgan6vfvdodpxlrjfhrmldbw6w.onion",
    directoryName: "Cipher Drop",
    pageTitle: "Cipher Drop — encrypted file relay",
    status: "online",
    kind: "files",
  },
  {
    address:
      "5tvzs7la33w5wprgltqdryxhdktw7dwhyb4o5zszuhbbcejkvbhpgvkk.onion",
    directoryName: "Moonlight Beans",
    pageTitle: "Moonlight Beans",
    status: "online",
    kind: "ordinary",
  },
  {
    address:
      "6jcpx32nztm5mlcuiizvwnhhlkf7bqzlpe2nrry5zbfyfhvc7jsygkxp.onion",
    directoryName: "Aurora Exchange",
    pageTitle: "Connection failed",
    status: "online",
    kind: "decoy",
  },
  {
    address: OFFICIAL_ONION_ADDRESS,
    directoryName: "Cedar Supply",
    pageTitle: "너굴상점",
    status: "online",
    kind: "official",
  },
];

export const QUESTION_ONE_HINTS = [
  "브라우저 히스토리에서 일반적인 일상 사이트와 성격이 다른 검색어 또는 URL을 찾아보세요.",
  "히스토리에서 찾은 의심스러운 검색어와 URL을 NetScope에 입력하고, 실제로 열리는 페이지의 내용을 비교하세요.",
  "페이지에서 발견한 후보 주소들을 OnionScope에 직접 입력한 뒤, 상호와 판매 물품이 사건 내용과 일치하는지 확인하세요.",
];

export const QUESTION_TWO_HINTS = [
  "1번에서 확인한 공식 주소를 OnionScope로 연 상태에서 개발자 도구를 연결하세요.",
  "Onion 코드를 자세히 살펴보세요.",
  "소스 코드를 분석하여 식별 값을 찾으세요.",
];

export const QUESTION_THREE_HINTS = [
  "2번에서 확보한 식별 값을 SourceScope에 입력하여 같은 값이 발견된 웹 페이지들을 확인하세요.",
  "검색 결과에는 단순 인용문과 복사된 자료도 섞여 있습니다. 실제 운영자가 관리하는 것으로 보이는 표면웹 사이트를 구분하세요.",
  "후보 사이트를 NetScope로 열고 게시물 본문뿐 아니라 페이지 아래쪽의 운영자·라이선스 정보도 확인하세요.",
];

export const QUESTION_FOUR_HINTS = [
  "3번에서 확인한 가명을 NetScope에 검색하면 비슷한 이름을 사용하는 여러 커뮤니티 계정이 나타납니다.",
  "검색 결과의 미리보기만으로 판단하지 말고, 게시물을 직접 열어 작성자가 남긴 추가 정보를 확인하세요.",
  "너굴상점과 커뮤니티 게시물에서 공통으로 사용된 값을 찾아 계정을 좁힌 뒤 해당 작성자의 프로필을 확인하세요.",
];

export const QUESTION_FIVE_HINTS = [
  "로그에서 너굴상점 지갑으로 전송된 1.00000000 BTC 결제 후보들을 먼저 추출하세요.",
  "각 후보 거래의 입력 주소가 같은 로그 안의 이전 거래에서 출력 주소로 등장하는지 확인하세요.",
  "출처가 확인되는 중간 지갑들을 거슬러 올라가, 여러 주소로 자금을 분배한 거래의 공통 입력 지갑을 찾으세요.",
];

export const QUESTION_SIX_HINTS = [
  "5번에서 확인한 믹서 지갑이 출력 주소로 기록된 거래들만 로그에서 먼저 추출하세요.",
  "추출된 거래에서 입력 주소만 분리하고 중복을 제거하면 비교해야 할 주소 목록을 만들 수 있습니다.",
  "입력 주소 목록과 suspect_wallet_mapping.csv의 지갑 주소를 교차 대조하고, 일치한 사람들의 이름을 요구된 순서로 정리하세요.",
];

export const CSV_CONTENT = [
  "visited_at,page_title,url",
  ...HISTORY_ENTRIES.map(
    (entry) => `"${entry.visitedAt}","${entry.title}","${entry.url}"`,
  ),
].join("\n");

export const SUSPECT_WALLET_CSV_CONTENT = [
  "suspect_id,name,wallet_address",
  ...SUSPECT_WALLETS.map(
    (suspect) =>
      `"${suspect.suspectId}","${suspect.name}","${suspect.walletAddress}"`,
  ),
].join("\n");

export const CASE_ONE_RESULT_CONTENT = [
  "=== 사건 01 분석 결과 ===",
  "",
  "확인 대상: 다크웹 마켓 ‘너굴상점’",
  `공식 접속 주소: ${OFFICIAL_ONION_ADDRESS}`,
  "검증 방식: OnionScope 페이지의 상호·상품·결제 정보 대조",
  "상태: VERIFIED",
].join("\n");

export const CASE_TWO_RESULT_CONTENT = [
  "=== 사건 02 분석 결과 ===",
  "",
  "분석 대상: 너굴상점 index.html",
  `재사용 식별 값: ${resolveProtectedIdentifier()}`,
  "확인 위치: Google Analytics 초기화 코드",
  "상태: VERIFIED",
].join("\n");

export const CASE_THREE_RESULT_CONTENT = [
  "=== 사건 03 분석 결과 ===",
  "",
  "확인 대상: 운영자 표면웹 활동",
  `사용 가명: ${OPERATOR_PSEUDONYM}`,
  "확인 사이트: https://raclog.kr/",
  "상태: VERIFIED",
].join("\n");

export const CASE_FOUR_RESULT_CONTENT = [
  "=== 사건 04 분석 결과 ===",
  "",
  "확인 대상: 암호화폐 커뮤니티 계정",
  `확인 가명: hjhjhj77`,
  `너굴상점 입금 주소: ${MARKET_BITCOIN_ADDRESS}`,
  `운영자 실명: ${OPERATOR_REAL_NAME}`,
  "검증 방식: 게시물의 후원 주소와 너굴상점 입금 주소 대조",
  "상태: VERIFIED",
].join("\n");

export const CASE_FIVE_RESULT_CONTENT = [
  "=== 사건 05 분석 결과 ===",
  "",
  "확인 대상: 너굴상점 왕관 결제 자금 흐름",
  `핵심 믹서 지갑: ${MIXER_WALLET_ADDRESS}`,
  "검증 방식: 중간 지갑의 이전 Out과 분배 트랜잭션의 단일 In 역추적",
  "상태: VERIFIED",
].join("\n");

export const SURFACE_SITES: SurfaceSite[] = [
  {
    id: "bobsecurity",
    domain: "bobsecurity.kr",
    url: "https://bobsecurity.kr/community/osint/218",
    name: "BoB Security",
    category: "보안 교육 커뮤니티",
    headline: "OSINT 분석 자료실",
    description:
      "보안 교육생이 공개 자료와 추적 코드 분석 사례를 공유하는 커뮤니티입니다.",
    navigation: ["홈", "교육", "커뮤니티", "OSINT"],
    theme: "navy",
    posts: [
      {
        title: "웹 추적 식별자 분석 실습 자료",
        meta: "관리자 · 2024.01.09",
        excerpt:
          "실습용 코드 예시를 인용한 게시물입니다. 원본 사이트의 운영 정보는 포함하지 않습니다.",
        tag: "교육",
      },
      {
        title: "공개 정보 수집 시 유의사항",
        meta: "analyst02 · 2023.12.22",
        excerpt:
          "수집 범위와 검증 기준을 정리한 교육생용 체크리스트입니다.",
        tag: "가이드",
      },
    ],
  },
  {
    id: "kodfir",
    domain: "kodfir.org",
    url: "https://kodfir.org/cases/web-tracker-analysis",
    name: "KODFIR",
    category: "디지털 포렌식 연구회",
    headline: "Web Tracker Analysis Casebook",
    description:
      "웹 추적 코드와 캐시 아티팩트의 상관관계를 연구하는 포렌식 사례 저장소입니다.",
    navigation: ["연구회", "사례", "도구", "자료실"],
    theme: "paper",
    posts: [
      {
        title: "브라우저 캐시에서 측정 ID 복구하기",
        meta: "Case note 24-061 · 2023.12.27",
        excerpt:
          "수집된 HTML 조각을 예시로 분석한 연구 문서입니다. 게시자는 운영자와 관련이 없습니다.",
        tag: "포렌식",
      },
      {
        title: "웹 아티팩트 타임라인 정규화",
        meta: "DFIR Lab · 2023.10.18",
        excerpt:
          "서로 다른 타임존으로 저장된 방문 기록을 비교하는 방법을 설명합니다.",
        tag: "연구",
      },
    ],
  },
  {
    id: "narcotics-watch",
    domain: "narcotics-watch.kr",
    url: "https://narcotics-watch.kr/forum/darkweb-case/731",
    name: "Narcotics Watch",
    category: "불법 유통 감시 네트워크",
    headline: "다크웹 모니터링 공개 포럼",
    description:
      "온라인 불법 유통 사례를 기록하고 예방 자료를 공유하는 시민 감시 사이트입니다.",
    navigation: ["모니터링", "리포트", "포럼", "제보"],
    theme: "emerald",
    posts: [
      {
        title: "추적 식별자 수집 기록 #731",
        meta: "watcher-k · 2024.04.12",
        excerpt:
          "외부 제보에서 확인된 식별자를 기록한 글입니다. 사이트 운영 주체를 확인한 자료는 아닙니다.",
        tag: "감시기록",
      },
      {
        title: "익명 마켓 신고 절차",
        meta: "운영팀 · 2024.03.28",
        excerpt:
          "불법 거래를 발견했을 때 증거를 보존하고 신고하는 절차를 안내합니다.",
        tag: "예방",
      },
    ],
  },
  {
    id: "undergroundtalk",
    domain: "undergroundtalk.net",
    url: "https://undergroundtalk.net/threads/market-review-826",
    name: "Underground Talk",
    category: "기술·보안 포럼",
    headline: "Market review thread #826",
    description:
      "회원들이 네트워크와 프라이버시 관련 링크를 인용하며 의견을 나누는 공개 포럼입니다.",
    navigation: ["Forums", "Latest", "Members", "Search"],
    theme: "violet",
    posts: [
      {
        title: "re: archived market source",
        meta: "packet_owl · 2024.02.17",
        excerpt:
          "다른 게시물의 추적 코드 한 줄을 인용한 댓글입니다. 작성자 신원 정보는 없습니다.",
        tag: "QUOTE",
      },
      {
        title: "링크 검증 결과 공유",
        meta: "rootless · 2024.02.16",
        excerpt:
          "공개 검색 결과를 모아둔 토론 글로 운영자와 직접적인 연결 근거는 없습니다.",
        tag: "THREAD",
      },
    ],
  },
  {
    id: "cybercommunity",
    domain: "cybercommunity.kr",
    url: "https://cybercommunity.kr/board/free/14821",
    name: "Cyber Community",
    category: "보안 커뮤니티",
    headline: "자유게시판",
    description:
      "보안 뉴스, 개발 질문, 분석 메모를 공유하는 일반 보안 커뮤니티입니다.",
    navigation: ["뉴스", "자유게시판", "Q&A", "취약점"],
    theme: "slate",
    posts: [
      {
        title: "이 추적 코드가 어디서 나온 건가요?",
        meta: "guest14821 · 2023.06.30",
        excerpt:
          "코드 문자열만 복사한 질문 글이며 원본 페이지나 작성자의 정보는 확인되지 않습니다.",
        tag: "질문",
      },
      {
        title: "주간 보안 뉴스 모음",
        meta: "mod-blue · 2023.06.29",
        excerpt:
          "이번 주 공개된 보안 뉴스와 분석 보고서 링크를 정리했습니다.",
        tag: "뉴스",
      },
    ],
  },
  {
    id: "market-promo",
    domain: "market-promo.net",
    url: "https://market-promo.net/posts/raccoon-store-open",
    name: "Market Promo",
    category: "프로모션 게시판",
    headline: "Raccoon Store Open",
    description:
      "누구나 홍보 글을 등록할 수 있는 일반 프로모션 게시판입니다.",
    navigation: ["New", "Popular", "Submit", "Archive"],
    theme: "amber",
    posts: [
      {
        title: "Raccoon Store — open notice",
        meta: "anonymous · 2022.09.08",
        excerpt:
          "외부에서 복사된 짧은 홍보 글입니다. 게시 계정은 삭제되었고 별도 라이선스 정보가 없습니다.",
        tag: "PROMO",
      },
      {
        title: "신규 서비스 홍보 모음",
        meta: "promo-bot · 2022.09.07",
        excerpt:
          "자동 수집된 링크를 분류한 게시물입니다.",
        tag: "AUTO",
      },
    ],
  },
  {
    id: "darkboard",
    domain: "darkboard.kr",
    url: "https://darkboard.kr/promotion/hidden-market-list",
    name: "Darkboard",
    category: "익명 홍보 포럼",
    headline: "Hidden market list",
    description:
      "이용자가 제출한 홍보 자료와 오래된 링크를 보관하는 공개 게시판입니다.",
    navigation: ["Board", "Promotion", "Archive", "Rules"],
    theme: "indigo",
    posts: [
      {
        title: "숨김 서비스 홍보 목록",
        meta: "mirror-bot · 2023.10.11",
        excerpt:
          "복사된 HTML 주석을 포함한 자동 수집 글입니다. 사이트 소유자 정보는 제공하지 않습니다.",
        tag: "PROMOTION",
      },
      {
        title: "피싱 링크 신고 스레드",
        meta: "moderator · 2023.10.10",
        excerpt:
          "사용자들이 의심 링크를 신고하는 공지 스레드입니다.",
        tag: "NOTICE",
      },
    ],
  },
  {
    id: "webcode-lab",
    domain: "webcode-lab.kr",
    url: "https://webcode-lab.kr/questions/4812",
    name: "WebCode Lab",
    category: "개발자 Q&A",
    headline: "gtag 초기화 코드 질문",
    description:
      "프런트엔드 코드와 분석 스크립트 관련 질문을 다루는 개발자 Q&A 사이트입니다.",
    navigation: ["Questions", "Tags", "Users", "Labs"],
    theme: "cyan",
    posts: [
      {
        title: "이 gtag config 구문이 유효한가요?",
        meta: "newcoder · 2024.05.19",
        excerpt:
          "질문자가 외부 페이지의 코드 조각을 붙여 넣었습니다. 원본 소유자 정보는 없습니다.",
        tag: "javascript",
      },
      {
        title: "분석 스크립트 비동기 로딩",
        meta: "frontend-k · 2024.05.18",
        excerpt:
          "성능 저하 없이 분석 스크립트를 로딩하는 방법을 설명합니다.",
        tag: "analytics",
      },
    ],
  },
  {
    id: "pagearchive",
    domain: "pagearchive.kr",
    url: "https://pagearchive.kr/snapshot/raccoonlog-2023",
    name: "PageArchive",
    category: "웹 페이지 아카이브",
    headline: "Snapshot: raccoonlog-2023",
    description:
      "공개 웹 페이지의 과거 HTML을 자동 수집해 보존하는 아카이브 서비스입니다.",
    navigation: ["Snapshots", "Timeline", "Collections", "About"],
    theme: "archive",
    posts: [
      {
        title: "2023-07-04 16:08 snapshot",
        meta: "자동 수집 · 단일 캡처",
        excerpt:
          "스크립트 일부가 저장된 과거 스냅샷입니다. 라이선스 영역은 수집되지 않았습니다.",
        tag: "ARCHIVE",
      },
      {
        title: "robots 기록",
        meta: "crawler · 2023.07.04",
        excerpt:
          "수집 당시의 응답 상태와 헤더 정보만 보존되어 있습니다.",
        tag: "METADATA",
      },
    ],
  },
  {
    id: "raclog",
    domain: "raclog.kr",
    url: "https://raclog.kr/",
    name: "RACLOG",
    category: "개인 보안·프라이버시 블로그",
    headline: "흔적을 남기지 않는 거래 환경 구축기",
    description:
      "익명 운영, 결제 자동화, 비공개 서비스 구축 경험을 기록하는 개인 기술 블로그입니다.",
    navigation: ["LOG", "PROJECTS", "PROMOTION", "ABOUT"],
    theme: "raclog",
    posts: [
      {
        title: "개인 프로젝트 ‘너굴상점’ 운영 기록",
        meta: "RACLOG · 2024.06.14",
        excerpt:
          "비공개 네트워크에서 운영 중인 카탈로그 프로젝트와 BTC 결제 자동화 구성을 소개합니다.",
        tag: "PROMOTION",
      },
      {
        title: "분석 스크립트 이전 체크리스트",
        meta: "RACLOG · 2024.06.03",
        excerpt:
          "사이트를 분리할 때 추적 식별자와 정적 자산 설정을 점검한 기록입니다.",
        tag: "OPSEC",
      },
    ],
    identity: {
      alias: OPERATOR_PSEUDONYM,
      role: "대표자 가명",
      license: "RL-2021-0203-826",
      issued: "2021-02-03",
      phone: "010-8260-0614",
    },
  },
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "talk-1041",
    alias: "hjhjhjhj",
    title: "오늘도 좋은 하루 보내세요",
    preview: "아침 공기가 시원해서 산책하기 좋네요.",
    body:
      "아침 공기가 시원해서 오랜만에 동네를 한 바퀴 걸었습니다. 모두 좋은 하루 보내세요.",
    postedAt: "2024-06-12 08:17",
    status: "active",
    bitcoinAddress: "1HjBase4Xz2bN9uQ7mK3vR8pL5sT6wC",
    profile: {
      alias: "hjhjhjhj",
      realName: "이민석",
      phone: "010-2417-5310",
      email: "hjhjhjhj@example.com",
      joinedAt: "2020-11-14",
      portraitIndex: 0,
    },
  },
  {
    id: "talk-1048",
    alias: "hjhjhj01",
    title: "점심 메뉴 추천받아요",
    preview: "오늘 점심을 아직 못 정했어요. 추천 부탁드립니다.",
    body:
      "매일 비슷한 메뉴만 먹어서 고민입니다. 가볍게 먹을 수 있는 점심 메뉴가 있으면 알려주세요.",
    postedAt: "2024-06-12 11:32",
    status: "active",
    bitcoinAddress: "1Lunch8vK3mQ5xN2pR7sT9wY4cD6fGh",
    profile: {
      alias: "hjhjhj01",
      realName: "박지훈",
      phone: "010-3185-2047",
      email: "hjhjhj01@example.com",
      joinedAt: "2021-03-02",
      portraitIndex: 1,
    },
  },
  {
    id: "talk-1055",
    alias: "hjhjhj33",
    title: "새 키보드 적응 중입니다",
    preview: "키감은 좋은데 아직 오타가 많이 나네요.",
    body:
      "새 키보드를 들였는데 배열이 조금 달라서 적응 중입니다. 그래도 소리가 조용해서 마음에 듭니다.",
    postedAt: "2024-06-12 15:04",
    status: "active",
    bitcoinAddress: "1Key33mN8qR4tV2xZ7pL5sC9dF6gHw",
    profile: {
      alias: "hjhjhj33",
      realName: "정우진",
      phone: "010-4472-8631",
      email: "hjhjhj33@example.com",
      joinedAt: "2019-08-23",
      portraitIndex: 2,
    },
  },
  {
    id: "talk-1077",
    alias: "hjhjhj77",
    title: "비 오는 날에는 음악이 좋네요",
    preview: "창문을 열어두고 음악을 듣고 있습니다.",
    body:
      "창문을 열어두고 음악을 듣고 있습니다. 비가 오니 평소보다 조용해서 작업에 집중하기 좋네요.",
    postedAt: "2024-06-13 21:18",
    status: "active",
    bitcoinAddress: MARKET_BITCOIN_ADDRESS,
    profile: {
      alias: "hjhjhj77",
      realName: OPERATOR_REAL_NAME,
      phone: "010-8260-0614",
      email: "hjhjhj77@example.com",
      joinedAt: "2017-02-03",
      portraitIndex: 3,
    },
  },
  {
    id: "talk-1052",
    alias: "hihihi52",
    title: "주말에 책을 정리했어요",
    preview: "오래된 책을 분류하니 책장이 조금 넓어졌습니다.",
    body:
      "오래된 책을 분류하니 책장이 조금 넓어졌습니다. 다시 읽고 싶은 책은 따로 모아뒀어요.",
    postedAt: "2024-06-14 00:41",
    status: "active",
    bitcoinAddress: "1HiHi52mP8vQ3xR6tN9wK4sL7cD2fGa",
    profile: {
      alias: "hihihi52",
      realName: "최현우",
      phone: "010-5294-1176",
      email: "hihihi52@example.com",
      joinedAt: "2022-05-26",
      portraitIndex: 4,
    },
  },
  {
    id: "talk-1007",
    alias: "hjhjhj07",
    title: "저녁 산책 다녀왔습니다",
    preview: "바람이 선선해서 걷기 좋은 저녁이네요.",
    body:
      "바람이 선선해서 평소보다 조금 더 걸었습니다. 가끔은 화면에서 눈을 떼는 것도 좋네요.",
    postedAt: "2024-06-14 19:12",
    status: "active",
    bitcoinAddress: "1Walk07xR5mN2qT8vK4pL9sC6dF3gHy",
    profile: {
      alias: "hjhjhj07",
      realName: "윤서진",
      phone: "010-6741-9028",
      email: "hjhjhj07@example.com",
      joinedAt: "2020-07-19",
      portraitIndex: 5,
    },
  },
  {
    id: "talk-1026",
    alias: "hjhjhj26",
    title: "커피 원두를 바꿔봤어요",
    preview: "향이 부드러운 원두라 아침에 마시기 좋았습니다.",
    body:
      "향이 부드러운 원두라 아침에 마시기 좋았습니다. 다음에는 조금 더 진하게 내려보려고 합니다.",
    postedAt: "2024-06-15 07:46",
    status: "active",
    bitcoinAddress: "1Bean26qV4mR8xT2pN7sK5wL9cD3fGh",
    profile: {
      alias: "hjhjhj26",
      realName: "한예준",
      phone: "010-7358-4462",
      email: "hjhjhj26@example.com",
      joinedAt: "2023-01-08",
      portraitIndex: 6,
    },
  },
  {
    id: "deleted-1011",
    alias: "hjhjhj11",
    title: "오랜만에 접속했습니다",
    preview: "다들 잘 지내셨나요?",
    body: "",
    postedAt: "2023-12-02 17:20",
    status: "deleted",
  },
  {
    id: "deleted-1024",
    alias: "hjhjhj24",
    title: "주말 계획 있으신가요",
    preview: "날씨가 좋으면 가까운 곳에 다녀오려고 합니다.",
    body: "",
    postedAt: "2023-09-14 18:03",
    status: "deleted",
  },
  {
    id: "deleted-1054",
    alias: "hjhjhj54",
    title: "새로운 취미를 찾는 중",
    preview: "가볍게 시작할 수 있는 취미가 궁금합니다.",
    body: "",
    postedAt: "2023-04-28 09:55",
    status: "deleted",
  },
  {
    id: "deleted-1088",
    alias: "hjhjhj88",
    title: "사진 정리를 마쳤어요",
    preview: "휴대폰 사진을 정리하니 저장 공간이 넉넉해졌습니다.",
    body: "",
    postedAt: "2022-11-16 23:14",
    status: "deleted",
  },
  {
    id: "deleted-1099",
    alias: "hjhjhj99",
    title: "늦은 밤 인사드립니다",
    preview: "오늘 하루도 모두 수고하셨습니다.",
    body: "",
    postedAt: "2022-08-05 01:08",
    status: "deleted",
  },
];

const SOURCE_MATCH_TEMPLATES: SourceMatch[] = [
  {
    domain: "bobsecurity.kr",
    matchedUrl: "https://bobsecurity.kr/community/osint/218",
    sourceCode: "<code>gtag('config','{{IDENTIFIER}}');</code>",
    firstSeen: "2022-07-18 14:22",
    lastSeen: "2024-01-09 19:42",
    kind: "surface",
  },
  {
    domain: "kodfir.org",
    matchedUrl: "https://kodfir.org/cases/web-tracker-analysis",
    sourceCode: "<pre>{{IDENTIFIER}}</pre>",
    firstSeen: "2021-11-03 17:35",
    lastSeen: "2023-12-27 08:11",
    kind: "surface",
  },
  {
    domain: "narcotics-watch.kr",
    matchedUrl: "https://narcotics-watch.kr/forum/darkweb-case/731",
    sourceCode: "수집된 추적 식별자: {{IDENTIFIER}}",
    firstSeen: "2023-03-09 21:17",
    lastSeen: "2024-04-12 16:39",
    kind: "surface",
  },
  {
    domain: "undergroundtalk.net",
    matchedUrl: "https://undergroundtalk.net/threads/market-review-826",
    sourceCode: "[quote] gtag('config','{{IDENTIFIER}}') [/quote]",
    firstSeen: "2022-05-26 01:43",
    lastSeen: "2024-02-17 23:08",
    kind: "surface",
  },
  {
    domain: "cybercommunity.kr",
    matchedUrl: "https://cybercommunity.kr/board/free/14821",
    sourceCode: "<code>{{IDENTIFIER}}</code>",
    firstSeen: "2021-08-14 12:05",
    lastSeen: "2023-06-30 04:52",
    kind: "surface",
  },
  {
    domain: "market-promo.net",
    matchedUrl: "https://market-promo.net/posts/raccoon-store-open",
    sourceCode: "<p>Tracking code: {{IDENTIFIER}}</p>",
    firstSeen: "2022-01-19 03:26",
    lastSeen: "2022-09-08 11:40",
    kind: "surface",
  },
  {
    domain: "darkboard.kr",
    matchedUrl: "https://darkboard.kr/promotion/hidden-market-list",
    sourceCode: "<!-- copied source: {{IDENTIFIER}} -->",
    firstSeen: "2020-12-22 18:54",
    lastSeen: "2023-10-11 07:16",
    kind: "surface",
  },
  {
    domain: "webcode-lab.kr",
    matchedUrl: "https://webcode-lab.kr/questions/4812",
    sourceCode: "<code>gtag('config','{{IDENTIFIER}}')</code>",
    firstSeen: "2023-04-02 11:22",
    lastSeen: "2024-05-19 08:17",
    kind: "surface",
  },
  {
    domain: "pagearchive.kr",
    matchedUrl: "https://pagearchive.kr/snapshot/raccoonlog-2023",
    sourceCode: "...gtag('config','{{IDENTIFIER}}')...",
    firstSeen: "2023-07-04 16:08",
    lastSeen: "2023-07-04 16:08",
    kind: "surface",
  },
  {
    domain: "raclog.kr",
    matchedUrl: "https://raclog.kr/",
    sourceCode: "<script>gtag('config','{{IDENTIFIER}}');</script>",
    firstSeen: "2021-02-03 09:18",
    lastSeen: "2024-06-14 02:31",
    kind: "surface",
  },
  {
    domain: OFFICIAL_ONION_ADDRESS,
    matchedUrl: `http://${OFFICIAL_ONION_ADDRESS}/`,
    sourceCode: "<script>gtag('config','{{IDENTIFIER}}');</script>",
    firstSeen: "2022-01-19 03:24",
    lastSeen: "2024-06-14 02:29",
    kind: "onion",
  },
  {
    domain:
      "nuybfjdsg3mzn3ghgnekqojrc5qoxkpkybjqpo2vhnknsneses3uwq7x.onion",
    matchedUrl:
      "http://nuybfjdsg3mzn3ghgnekqojrc5qoxkpkybjqpo2vhnknsneses3uwq7x.onion/thread/analytics",
    sourceCode: "<code>{{IDENTIFIER}}</code>",
    firstSeen: "2023-08-11 18:45",
    lastSeen: "2023-08-11 18:45",
    kind: "onion",
  },
  {
    domain:
      "i4ibb2a7uh43r5tftfieyb6whfuzjclgan6vfvdodpxlrjfhrmldbw6w.onion",
    matchedUrl:
      "http://i4ibb2a7uh43r5tftfieyb6whfuzjclgan6vfvdodpxlrjfhrmldbw6w.onion/archive/826",
    sourceCode: "filename: {{IDENTIFIER}}.txt",
    firstSeen: "2022-10-02 05:14",
    lastSeen: "2022-10-02 05:14",
    kind: "onion",
  },
];

export function createSourceMatches(identifier: string): SourceMatch[] {
  const normalizedIdentifier = identifier.trim().toUpperCase();

  return SOURCE_MATCH_TEMPLATES.map((match) => ({
    ...match,
    sourceCode: match.sourceCode.replaceAll(
      "{{IDENTIFIER}}",
      normalizedIdentifier,
    ),
  }));
}

export const MARKET_VENDOR_ASSET_NAME = "telemetry-core.2c84f1.min.js";
export const MARKET_VENDOR_SOURCE = `(()=>{const e="CXgVYQ0Wd2UAbXVj",r=[78,85,71,85].map(e=>String.fromCharCode(e)).join(""),t=Array.from(atob(e),(e,t)=>String.fromCharCode(e.charCodeAt(0)^r.charCodeAt(t%r.length))).join(""),n=String.fromCharCode(100,97,116,97,76,97,121,101,114),o=String.fromCharCode(103,116,97,103);window[n]=window[n]||[],window[o]=function(){window[n].push(arguments)},window[o]("js",new Date),window[o]("config",t,{send_page_view:true,cookie_flags:"SameSite=None;Secure"})})();`;

export const MARKET_SOURCE_CODE = `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>너굴상점</title>
    <link rel="stylesheet" href="/assets/store.min.css" />
    <script defer src="/assets/${MARKET_VENDOR_ASSET_NAME}"></script>
  </head>
  <body>
    <header class="market-header">
      <h1>너굴상점</h1>
    </header>
    <main>
      <section class="catalog">
        <article data-code="ARMOR">갑옷 <b>0.5 BTC</b></article>
        <article data-code="WEAPON">무기 <b>0.6 BTC</b></article>
        <article data-code="CROWN">왕관 <b>1.0 BTC</b></article>
      </section>
      <code class="wallet">${MARKET_BITCOIN_ADDRESS}</code>
    </main>
    <script defer src="/assets/catalog.min.js"></script>
  </body>
</html>`;
