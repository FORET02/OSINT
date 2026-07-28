# 너굴상점 OSINT 연계 수사

브라우저 히스토리 아티팩트에서 단서를 찾고, 가상의 일반 웹 브라우저
`NetScope`와 Tor 브라우저 `OnionScope`를 사용해 다크웹 마켓의 공식 주소를
식별한 뒤 개발자 도구에서 재사용된 분석 식별 값을 찾는 교육용 OSINT
시뮬레이터입니다. 이어서 식별 값이 발견된 표면웹 후보를 `SourceScope`로
검색하고, `NetScope`에서 운영자의 가명을 확인합니다.
마지막으로 암호화폐 커뮤니티의 유사 가명 게시물에서 비트코인 주소를
대조하고 공개 프로필의 실명을 특정한 뒤, 3일치 블록체인 로그에서
분배·병합된 UTXO를 역추적해 믹서 지갑을 찾습니다. 마지막으로 믹서
유입 지갑과 오프라인 용의자 명단을 교차 대조해 VIP 구매자 3명을
특정합니다.

## 주요 흐름

1. `browser_history.csv` 증거 확인
2. NetScope에서 허용된 키워드 또는 URL을 검색
3. `dgdg.co.kr/?q=is` 게시판에서 후보 주소 수집
4. 후보 주소를 OnionScope에 직접 입력해 사이트 내용 검증
5. 공식 주소 제출 후 문제 2 해제
6. `case01_result.txt`에서 1번 수사 결과 확인
7. OnionScope와 개발자 도구를 동시에 열어 `index.html`이 불러오는
   해시 이름의 외부 스크립트 분석
8. 외부 스크립트의 Base64 문자열과 숫자 배열로 숨긴 반복 XOR 키의
   흐름을 추적하고, 내장 Console에서 복호화 코드를 계산해 운영자가
   재사용한 식별 값 제출
9. 문제 2 결과를 증거함에서 확인하고 SourceScope에 식별 값 검색
10. 표면웹 10개와 onion 3개가 섞인 13개 결과 비교
11. NetScope에서 후보 사이트를 탐색하고 `raclog.kr` 라이선스 확인
12. 운영자가 표면웹에서 사용한 가명 제출
13. 문제 3 가명으로 NetScope의 암호화폐 커뮤니티 검색
14. 12개 결과 중 확인 가능한 게시물 7개와 삭제 게시물 5개 비교
15. 게시물 안의 후원 주소를 너굴상점 비트코인 주소와 대조
16. 일치한 작성자 프로필에서 운영자의 실명 확인 및 제출
17. 증거함에서 `master_blockchain_dump.log`의 Google Drive 위치 열기
18. 1.00000000 BTC 결제 후보와 입력 중간 지갑의 이전 Out 비교
19. 중간 지갑을 분배한 거래의 단일 입력 지갑을 믹서 주소로 제출
20. 믹서 지갑을 Out으로 사용하는 거래에서 최초 In 주소 일괄 추출
21. 1번 문제부터 증거함에 제공되는 `suspect_wallet_mapping.csv`의 18명
    지갑과 교차 대조
22. 일치한 VIP 구매자 3명을 가나다순으로 제출

여섯 문제 모두 `증거함`, `NetScope`, `SourceScope`, `OnionScope`,
`개발자 도구`, `수사 노트`를 제공합니다. 모든 수사 도구는 동시에 열 수
있으며, 데스크톱 화면에서는 창 제목을 끌어 이동하고 오른쪽 아래 모서리를
끌어 크기를 조절할 수 있습니다. 새 문제에 진입할 때 모든 도구 창은 닫힌
상태로 시작합니다.

문제 2의 분석 식별 값은 HTML이나 Network 목록에 평문으로 노출되지
않습니다. 개발자 도구의 Sources 트리에서 `telemetry-core.2c84f1.min.js`를
열고 코드 정리 기능을 사용한 뒤 실행 흐름을 역분석해야 합니다. 외부
스크립트에는 하나의 Base64 암호문과 숫자 코드로 만든 4글자 키,
반복 XOR 복호화가 포함됩니다. 코드 압축과 변수명 축약도 적용했지만
미끼 값, 위치 마스크, 체크섬은 사용하지 않았습니다. 브라우저에서 모두
실행할 수 있는 표준 JavaScript만 사용하므로 GitHub Pages에서도 동일하게
동작합니다. 개발자 도구의 Console은 참가자가 작성한 JavaScript를 별도
Worker에서 실행하고 결과를 표시하며, DOM·네트워크 접근 차단과 2.5초
시간 제한을 적용합니다.

NetScope 검색 색인은 문제를 이동해도 초기화되지 않습니다. 아래 1번 문제의
입력뿐 아니라 SourceScope에서 확인한 표면웹 도메인·전체 URL과 문제 3에서
확인한 가명도 여섯 문제 어디에서든 같은 결과를 표시합니다.

1번 문제 검색 결과가 제공되는 입력은 다음 네 가지입니다.

- `아이s`
- `http://www.dgdg.co.kr/?q=is`
- `Hidden Links Directory`
- `http://hiddenlinks.app/market`

`hiddenlinks.app/market`는 접속 주소를 제공하지 않는 함정 페이지이며,
`.onion` 후보는 `dgdg.co.kr/?q=is` 페이지에만 표시됩니다.

## 로컬 실행

Node.js 22.13 이상과 npm이 필요합니다.

```bash
npm install
npm run dev
```

터미널에 표시된 로컬 주소를 브라우저에서 엽니다.

배포용 빌드 확인:

```bash
npm run build
```

## GitHub Pages 배포

GitHub Actions가 실제 저장소 이름의 대소문자를 읽어 배포 경로를
자동으로 설정합니다.

```text
https://<GitHub 사용자명>.github.io/<저장소명>/
```

정적 버전을 로컬에서 실행하려면 다음 명령을 사용합니다.

```bash
npm run dev:pages
```

GitHub에 올리는 방법과 Pages 설정은 [`GITHUB_PAGES.md`](GITHUB_PAGES.md)를
참고하세요. `main` 브랜치에 push하면 포함된 GitHub Actions 워크플로가
자동으로 빌드하고 배포합니다.

## 프로젝트 구조

```text
app/
  page.tsx                 # 진입 페이지
  globals.css              # 전체 UI 스타일
  api/case/01/submit/
    route.ts               # 문제 1 서버 측 정답 판정
  api/case/02/submit/
    route.ts               # 문제 2 서버 측 정답 판정
  api/case/03/submit/
    route.ts               # 문제 3 서버 측 정답 판정
  api/case/04/submit/
    route.ts               # 문제 4 서버 측 정답 판정
  api/case/05/submit/
    route.ts               # 문제 5 서버 측 정답 판정
  api/case/06/submit/
    route.ts               # 문제 6 서버 측 정답 판정
components/
  case/
    CaseWorkspace.tsx      # 1번부터 5번까지 이어지는 화면 전환
    CaseOneWorkspace.tsx   # 문제 1 내용과 정답 제출
    CaseTwoWorkspace.tsx   # 문제 2 내용과 정답 제출
    CaseThreeWorkspace.tsx # 문제 3 내용과 정답 제출
    CaseFourWorkspace.tsx  # 문제 4 내용과 정답 제출
    CaseFiveWorkspace.tsx  # 문제 5 내용과 정답 제출
    CaseSixWorkspace.tsx   # 문제 6 내용과 정답 제출
    InvestigationToolDesktop.tsx # 모든 문제의 공통 다중 도구 창
    tools/
      EvidenceTool.tsx     # 클릭형 증거 파일 탐색기
      NetScopeTool.tsx     # 일반 웹 검색 도구
      SourceScopeTool.tsx  # 추적 식별 값 검색 도구
      OnionScopeTool.tsx   # 비공개 서비스 브라우저
      DevTools.tsx         # OnionScope 연동 소스 분석 도구
      NotesTool.tsx        # 수사 노트
      FloatingToolWindow.tsx # 이동·크기 조절 창
data/
  case01.ts                # 여섯 문제의 시나리오·증거·가상 사이트 데이터
types/
  osint.ts                 # 공통 타입
public/
  evidence/
    browser_history.csv    # 제공 증거 원본
    suspect_wallet_mapping.csv # 문제 1부터 제공되는 오프라인 용의자 지갑 명단
```

## 출제 정보

- 문제 1: 다크웹 마켓 ‘너굴상점’의 공식 주소는?
- 문제 2: 운영자가 재사용한 식별 값은?
- 문제 3: 운영자가 표면웹에서 사용한 가명은?
- 문제 4: 너굴상점 운영자의 실명은?
- 문제 5: 자금 세탁에 사용된 믹서 지갑의 정확한 주소는?
- 문제 6: 믹서 유입 지갑과 일치하는 VIP 구매자 3명은?
- 기본 빌드는 서버에서 정답을 판정합니다. GitHub Pages 정적 빌드는
  정규화한 제출값의 SHA-256 해시를 브라우저에서 비교하며, 평문 정답
  비교표는 포함하지 않습니다.
- 교육용 가상 시나리오이며 모든 주소와 서비스는 실제 네트워크에 연결되지
  않습니다.
