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


여섯 문제 모두 `증거함`, `NetScope`, `SourceScope`, `OnionScope`,
`개발자 도구`, `수사 노트`를 제공합니다. 모든 수사 도구는 동시에 열 수
있으며, 데스크톱 화면에서는 창 제목을 끌어 이동하고 오른쪽 아래 모서리를
끌어 크기를 조절할 수 있습니다. 새 문제에 진입할 때 모든 도구 창은 닫힌
상태로 시작합니다.


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
    route.ts               
  api/case/02/submit/
    route.ts               
  api/case/03/submit/
    route.ts              
  api/case/04/submit/
    route.ts               
  api/case/05/submit/
    route.ts               
  api/case/06/submit/
    route.ts               
components/
  case/
    CaseWorkspace.tsx      # 1번부터 5번까지 이어지는 화면 전환
    CaseOneWorkspace.tsx   
    CaseTwoWorkspace.tsx   
    CaseThreeWorkspace.tsx 
    CaseFourWorkspace.tsx  
    CaseFiveWorkspace.tsx  
    CaseSixWorkspace.tsx   
    InvestigationToolDesktop.tsx # 모든 문제의 공통 다중 도구 창
    tools/
      EvidenceTool.tsx    
      NetScopeTool.tsx     
      SourceScopeTool.tsx  
      OnionScopeTool.tsx   
      DevTools.tsx         
      NotesTool.tsx        
      FloatingToolWindow.tsx 
data/
  case01.ts                
types/
  osint.ts                 
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
- 교육용 가상 시나리오이며 모든 주소와 서비스는 실제 네트워크에 연결되지
  않습니다.
