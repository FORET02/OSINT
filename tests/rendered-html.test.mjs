import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("validates all six linked investigation answers", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-answers`);
  const { default: worker } = await import(workerUrl.href);
  const env = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const context = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const questionOne = await worker.fetch(
    new Request("http://localhost/api/case/01/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        answer:
          "vcfdov74ftugicb6ukxunyfvo4fifs5ygjcg3s4mddsfgu5rwx3p73hh.onion",
      }),
    }),
    env,
    context,
  );
  assert.equal(questionOne.status, 200);
  assert.deepEqual(await questionOne.json(), { correct: true });

  const questionTwo = await worker.fetch(
    new Request("http://localhost/api/case/02/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        answer: String.fromCharCode(
          103,
          45,
          114,
          52,
          99,
          99,
          48,
          48,
          110,
          56,
          50,
          54,
        ),
      }),
    }),
    env,
    context,
  );
  assert.equal(questionTwo.status, 200);
  assert.deepEqual(await questionTwo.json(), { correct: true });

  const questionThree = await worker.fetch(
    new Request("http://localhost/api/case/03/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ answer: "HJHJHJHJ" }),
    }),
    env,
    context,
  );
  assert.equal(questionThree.status, 200);
  assert.deepEqual(await questionThree.json(), { correct: true });

  const questionFour = await worker.fetch(
    new Request("http://localhost/api/case/04/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ answer: "김 도 현" }),
    }),
    env,
    context,
  );
  assert.equal(questionFour.status, 200);
  assert.deepEqual(await questionFour.json(), { correct: true });

  const questionFive = await worker.fetch(
    new Request("http://localhost/api/case/05/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        answer: "1M9xX9cC3vV4bB6nN8mM9qQ2kMabcDefG",
      }),
    }),
    env,
    context,
  );
  assert.equal(questionFive.status, 200);
  assert.deepEqual(await questionFive.json(), { correct: true });

  const questionSix = await worker.fetch(
    new Request("http://localhost/api/case/06/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        answer: "고은지, 김현준, 전소훈",
      }),
    }),
    env,
    context,
  );
  assert.equal(questionSix.status, 200);
  assert.deepEqual(await questionSix.json(), { correct: true });
});

test("starts every question with all investigation tools closed", async () => {
  const workspaceFiles = [
    "CaseOneWorkspace.tsx",
    "CaseTwoWorkspace.tsx",
    "CaseThreeWorkspace.tsx",
    "CaseFourWorkspace.tsx",
    "CaseFiveWorkspace.tsx",
    "CaseSixWorkspace.tsx",
  ];

  for (const fileName of workspaceFiles) {
    const source = await readFile(
      new URL(`../components/case/${fileName}`, import.meta.url),
      "utf8",
    );

    assert.doesNotMatch(
      source,
      /defaultOpenTools/,
      `${fileName} must not specify a recommended tool on entry`,
    );
  }

  const desktopSource = await readFile(
    new URL(
      "../components/case/InvestigationToolDesktop.tsx",
      import.meta.url,
    ),
    "utf8",
  );

  assert.match(desktopSource, /open:\s*false/);
  assert.match(
    desktopSource,
    /useState<ToolWindows>\(createInitialWindows\)/,
  );
});

test("question five exposes the shared blockchain log through the supplied Drive link", async () => {
  const evidenceSource = await readFile(
    new URL(
      "../components/case/tools/EvidenceTool.tsx",
      import.meta.url,
    ),
    "utf8",
  );
  const dataSource = await readFile(
    new URL("../data/case01.ts", import.meta.url),
    "utf8",
  );
  assert.match(evidenceSource, /master_blockchain_dump\.log/);
  assert.match(evidenceSource, /Google Drive에서 열기/);
  assert.match(
    dataSource,
    /1Fmq0TIFxa9WDLilDcxpMMad_mCMEpYaM\?usp=drive_link/,
  );
});

test("provides the exact offline 18-person wallet mapping from question one", async () => {
  const evidenceSource = await readFile(
    new URL(
      "../components/case/tools/EvidenceTool.tsx",
      import.meta.url,
    ),
    "utf8",
  );
  const dataSource = await readFile(
    new URL("../data/case01.ts", import.meta.url),
    "utf8",
  );
  const mappingCsv = await readFile(
    new URL(
      "../public/evidence/suspect_wallet_mapping.csv",
      import.meta.url,
    ),
    "utf8",
  );

  assert.match(evidenceSource, /suspect_wallet_mapping\.csv/);
  assert.doesNotMatch(
    evidenceSource,
    /caseNumber === 6 && \(\s*<>\s*<button[\s\S]*?suspect_wallet_mapping\.csv/,
  );
  assert.match(evidenceSource, /case05_result\.txt/);
  assert.match(dataSource, /SUSPECT_WALLETS: SuspectWallet\[\]/);
  assert.match(dataSource, /"고은지", "김현준", "전소훈"/);

  const suspectCount = (
    dataSource.match(/suspectId:\s*"S-\d+"/g) ?? []
  ).length;
  assert.equal(suspectCount, 18);
  assert.equal(mappingCsv.trim().split("\n").length, 19);
  const expectedRows = [
    '"S-001","김현준","1Fv9pG7kX8sR2mT4cW5jM6qN3bZ1yHw"',
    '"S-002","조성일","1Bg7V4mN2cX9sP3kT6jM8qR1wZ5yHxF"',
    '"S-003","고은지","1X8sR2mT4cW5jM6qN3bZ1yHwFv9pG7k"',
    '"S-004","김승주","1cN3bZ1yHwFv9pG7kX8sR2mT4cW5jM6"',
    '"S-005","김바람","1pG7kX8sR2mT4cW5jM6qN3bZ1yHwFv9"',
    '"S-006","김예인","1T4cW5jM6qN3bZ1yHwFv9pG7kX8sR2m"',
    '"S-007","김은주","1wFv9pG7kX8sR2mT4cW5jM6qN3bZ1yH"',
    '"S-008","류재범","1M6qN3bZ1yHwFv9pG7kX8sR2mT4cW5j"',
    '"S-009","박썩소","1sR2mT4cW5jM6qN3bZ1yHwFv9pG7kX8"',
    '"S-010","박동균","1yHwFv9pG7kX8sR2mT4cW5jM6qN3bZ1"',
    '"S-011","양주아","17kX8sR2mT4cW5jM6qN3bZ1yHwFv9pG"',
    '"S-012","오나리","1cW5jM6qN3bZ1yHwFv9pG7kX8sR2mT4"',
    '"S-013","전소훈","13bZ1yHwFv9pG7kX8sR2mT4cW5jM6qN"',
    '"S-014","정윤지","19pG7kX8sR2mT4cW5jM6qN3bZ1yHwFv"',
    '"S-015","조정균","12mT4cW5jM6qN3bZ1yHwFv9pG7kX8sR"',
    '"S-016","정한서","1W5jM6qN3bZ1yHwFv9pG7kX8sR2mT4c"',
    '"S-017","최서인","1Z1yHwFv9pG7kX8sR2mT4cW5jM6qN3b"',
    '"S-018","홍준표","1Fv9pG7kX8sR2mT4cW5jM6qN3bZ1yH2"',
  ];
  assert.deepEqual(mappingCsv.trim().split("\n").slice(1), expectedRows);
  for (const row of expectedRows) {
    const [, suspectId, name, walletAddress] =
      row.match(/^"([^"]+)","([^"]+)","([^"]+)"$/) ?? [];
    assert.match(
      dataSource,
      new RegExp(
        `suspectId: "${suspectId}"[\\s\\S]{0,100}name: "${name}"[\\s\\S]{0,120}walletAddress: "${walletAddress}"`,
      ),
    );
  }
});

test("keeps every prior NetScope search available in all six questions", async () => {
  const netScopeSource = await readFile(
    new URL(
      "../components/case/tools/NetScopeTool.tsx",
      import.meta.url,
    ),
    "utf8",
  );
  const desktopSource = await readFile(
    new URL(
      "../components/case/InvestigationToolDesktop.tsx",
      import.meta.url,
    ),
    "utf8",
  );

  assert.doesNotMatch(netScopeSource, /caseNumber/);
  assert.doesNotMatch(desktopSource, /<NetScopeTool\s+caseNumber=/);
  assert.match(netScopeSource, /normalized === "아이s"\.toLowerCase\(\)/);
  assert.match(netScopeSource, /www\.dgdg\.co\.kr\/\?q=is/);
  assert.match(netScopeSource, /hidden links directory/);
  assert.match(netScopeSource, /hiddenlinks\.app\/market/);
  assert.match(netScopeSource, /SURFACE_SITES\.filter/);
  assert.match(netScopeSource, /OPERATOR_PSEUDONYM\.toLowerCase/);
});

test("protects the analytics identifier with basic GitHub-compatible obfuscation", async () => {
  const assetSource = await readFile(
    new URL(
      "../public/assets/telemetry-core.2c84f1.min.js",
      import.meta.url,
    ),
    "utf8",
  );
  const dataSource = await readFile(
    new URL("../data/case01.ts", import.meta.url),
    "utf8",
  );
  const devToolsSource = await readFile(
    new URL(
      "../components/case/tools/DevTools.tsx",
      import.meta.url,
    ),
    "utf8",
  );

  const expectedIdentifier = String.fromCharCode(
    71,
    45,
    82,
    52,
    67,
    67,
    48,
    48,
    78,
    56,
    50,
    54,
  );
  assert.ok(!assetSource.includes(expectedIdentifier));
  assert.ok(!dataSource.includes(expectedIdentifier));
  assert.match(assetSource, /CXgVYQ0Wd2UAbXVj/);
  assert.match(assetSource, /atob/);
  assert.match(assetSource, /String\.fromCharCode/);
  assert.doesNotMatch(assetSource, /checksum/);

  const marketSourceBlock = dataSource.slice(
    dataSource.indexOf("export const MARKET_SOURCE_CODE"),
  );
  assert.doesNotMatch(
    marketSourceBlock.split("export const CASE_ONE_RESULT_CONTENT")[0],
    /\$\{ANALYTICS_MEASUREMENT_ID\}/,
  );
  assert.match(
    marketSourceBlock,
    /MARKET_VENDOR_ASSET_NAME/,
  );
  assert.match(devToolsSource, /\{"\{ \}"\} 코드 정리/);
  assert.match(devToolsSource, /setActiveTab\("network"\)/);
  assert.match(devToolsSource, /setActiveTab\("console"\)/);
  assert.match(devToolsSource, /new Worker\(workerUrl\)/);
  assert.match(devToolsSource, /worker\.terminate\(\)/);
  assert.match(devToolsSource, /실행 시간이 2\.5초를 초과했습니다/);
  assert.match(devToolsSource, /Ctrl \+ Enter 실행/);

  const consoleWorkerSource = devToolsSource.match(
    /const CONSOLE_WORKER_SOURCE = `([\s\S]*?)`;/,
  )?.[1];
  assert.ok(consoleWorkerSource);

  let consoleExecution;
  const consoleSandbox = {
    atob,
    self: {
      postMessage(value) {
        consoleExecution = value;
      },
    },
  };
  vm.runInNewContext(consoleWorkerSource, consoleSandbox);
  await consoleSandbox.self.onmessage({
    data: {
      source: `${assetSource}\n;window.dataLayer[1][1]`,
    },
  });
  assert.equal(consoleExecution.status, "success");
  assert.equal(consoleExecution.value, expectedIdentifier);

  const sandbox = {
    atob,
    Date,
    window: {},
  };
  vm.runInNewContext(assetSource, sandbox);
  assert.equal(
    sandbox.window.dataLayer[1][1],
    expectedIdentifier,
  );
});
