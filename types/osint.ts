export type ToolId =
  | "evidence"
  | "netscope"
  | "sourcescope"
  | "onionscope"
  | "devtools"
  | "notes";

export type HistoryEntry = {
  visitedAt: string;
  title: string;
  url: string;
};

export type SearchResult = {
  title: string;
  url: string;
  description: string;
  page: "dgdg" | "slang" | "safety" | "trap";
};

export type OnionService = {
  address: string;
  directoryName: string;
  pageTitle: string;
  status: "online" | "offline" | "warning";
  kind: "official" | "forum" | "files" | "ordinary" | "decoy";
};

export type SourceMatch = {
  domain: string;
  matchedUrl: string;
  sourceCode: string;
  firstSeen: string;
  lastSeen: string;
  kind: "surface" | "onion";
};

export type SurfaceSite = {
  id: string;
  domain: string;
  url: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  navigation: string[];
  posts: {
    title: string;
    meta: string;
    excerpt: string;
    tag: string;
  }[];
  theme:
    | "navy"
    | "paper"
    | "emerald"
    | "violet"
    | "slate"
    | "amber"
    | "indigo"
    | "cyan"
    | "archive"
    | "raclog";
  identity?: {
    alias: string;
    role: string;
    license: string;
    issued: string;
    phone: string;
  };
};

export type CommunityProfile = {
  alias: string;
  realName: string;
  phone: string;
  email: string;
  joinedAt: string;
  portraitIndex: number;
};

export type CommunityPost = {
  id: string;
  alias: string;
  title: string;
  preview: string;
  body: string;
  postedAt: string;
  status: "active" | "deleted";
  bitcoinAddress?: string;
  profile?: CommunityProfile;
};

export type SuspectWallet = {
  suspectId: string;
  name: string;
  walletAddress: string;
};
