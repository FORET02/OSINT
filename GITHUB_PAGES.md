# GitHub Pages 배포 안내

이 저장소는 기존 서버 배포와 GitHub Pages 정적 배포를 모두 지원합니다.
워크플로가 실제 저장소 이름의 대소문자를 자동 반영합니다.

```text
https://<GitHub 사용자명>.github.io/<저장소명>/
```

예를 들어 `foret02/OSINT` 저장소의 주소는
`https://foret02.github.io/OSINT/`입니다.

## 1. GitHub 저장소 만들기

GitHub에서 원하는 이름의 빈 저장소를 만듭니다. README, `.gitignore`,
라이선스는 GitHub에서 별도로 추가하지 않습니다.

## 2. 코드 올리기

압축을 해제한 프로젝트 폴더에서 다음 명령을 실행합니다.

```bash
git init
git add .
git commit -m "Initial OSINT GitHub Pages"
git branch -M main
git remote add origin https://github.com/<GitHub 사용자명>/<저장소명>.git
git push -u origin main
```

## 3. Pages 활성화

GitHub 저장소에서 다음 메뉴로 이동합니다.

```text
Settings → Pages → Build and deployment → Source → GitHub Actions
```

`main` 브랜치에 코드를 올리면 `.github/workflows/deploy-pages.yml`이
자동으로 정적 사이트를 빌드하고 배포합니다. 진행 상태는 저장소의
`Actions` 탭에서 확인할 수 있습니다.

## 로컬에서 GitHub Pages 버전 확인

```bash
npm install
npm run dev:pages
```

터미널에 표시되는 주소의 `/osint/` 경로로 접속합니다. GitHub Actions
배포 시에는 저장소 이름에 맞는 경로로 자동 변경됩니다.

배포 파일만 생성하려면 다음을 실행합니다.

```bash
npm run build:pages
```

생성 결과는 `pages-dist/` 폴더에 저장됩니다.

## 주의

GitHub Pages는 정적 호스팅이므로 정답 판정을 브라우저에서 수행합니다.
이 버전은 정규화한 제출값의 SHA-256 해시만 비교하므로 정답 문자열을
정답 판정표에 직접 저장하지 않습니다. 문제 2의 식별 값도 하나의 Base64
문자열과 숫자 배열로 만든 짧은 키를 반복 XOR하는 실행 코드에서만
복원됩니다.

다만 정적 사이트의 JavaScript와 데이터는 최종적으로 참가자 브라우저에
전달됩니다. 난독화와 해시는 단순 문자열 검색을 어렵게 만들 뿐 완전한
비밀 저장소가 아닙니다. 실제 비밀값을 보호해야 하는 서비스에는 기본
서버 빌드를 사용하세요.
