# 저장소 가이드라인

## 기준 데이터와 언어

기본 언어는 한국어입니다. 화면 문구, 일정 데이터, 커밋 메시지, PR 설명, QA 보고서는 특별한 이유가 없으면 한국어로 작성합니다. 여행 일정·장소·식당·체험 정보의 1차 기준 출처는 [홋카이도 여행계획 관리](chatgpt-conversation://6a79ea7d-b870-83e8-8a74-31aae604d2f0) 대화입니다. 사용자가 새 지시를 주면 그것이 기존 대화보다 우선합니다.

대화에 없는 운영시간, 운항, 가격, 날씨처럼 변동 가능한 정보는 게시 전 최신 출처로 확인하고 확인일 또는 출처를 함께 남깁니다.

## 프로젝트 구조

이 프로젝트는 Vite와 React 19 기반의 단일 페이지 홋카이도 여행 가이드입니다. `src/main.tsx`에 일정 데이터와 화면 컴포넌트를 두고, 공통 스타일은 `src/style.css`에 둡니다. 변경 범위가 커질 때만 목적별 모듈로 분리합니다.

`pnpm build`는 TypeScript 검사 후 정적 파일을 `dist/`에 생성합니다. `.github/workflows/deploy-pages.yml`은 `main` 브랜치의 빌드 결과를 GitHub Pages로 배포합니다.

## 개발·빌드·검증

Node.js 22 이상과 pnpm 10 이상을 사용합니다.

```bash
pnpm install
pnpm dev
pnpm build
```

개발이 끝나면 반드시 `pnpm build`를 실행합니다. 데스크톱과 모바일에서 일정 선택, 미정 계획 토글, 외부 링크와 레이아웃을 직접 확인합니다.

## 장소 대표 이미지 변환

장소 대표 이미지는 `public/places/`에 WebP로 저장합니다. 원본 해상도는 유지하고, 사진형 AI 이미지에는 WebP 품질 84와 effort 6을 기본값으로 사용합니다.

반복 변환용 `sharp-cli`는 Git에 포함하지 않는 `.local-tools/`에 설치합니다. 처음 한 번만 다음 명령으로 설치합니다.

```bash
pnpm --dir .local-tools add -D sharp-cli
```

변환은 출력용 임시 폴더를 거쳐 검수한 뒤 `public/places/`로 옮기고, `src/data/places.json`의 `imagePath` 확장자를 `.webp`로 갱신합니다.

```bash
pnpm --dir .local-tools exec sharp \
  -i "$PWD"/public/places/*.png \
  -o /private/tmp/hokkaido-webp-output \
  -f webp -q 84 --effort 6
```

변환 후에는 원본·출력 모두의 픽셀 크기와 상세 팝업 표시를 확인합니다. 원본 PNG는 WebP 확인과 빌드가 끝난 뒤에만 제거합니다.

## 작업·배포 흐름

기본 순서는 반드시 **개발 → 테스트 → 커밋 → 푸시 → 배포 확인**입니다. 자동 검사와 필요한 브라우저 검증을 통과한 변경만 커밋합니다.

`main`에 변경사항을 푸시하면 GitHub Actions가 GitHub Pages 배포를 시작합니다. 사용자가 배포 보류를 지시하지 않은 경우, 빌드 검증을 마친 뒤 푸시하고 Actions의 빌드·배포 완료 상태 및 공개 사이트 접속을 확인해 보고합니다.

## 코드·콘텐츠 작성 규칙

엄격한 TypeScript와 React 함수 컴포넌트를 사용합니다. 두 칸 들여쓰기, 큰따옴표, 세미콜론, `camelCase`를 따르고 컴포넌트·타입에는 `PascalCase`를 씁니다. 새 버튼에는 한국어 `aria-label`을 제공합니다.

여행 정보 변경 시 날짜별 일정, 확정/미정 상태, 준비 체크리스트가 서로 어긋나지 않도록 함께 갱신합니다. 미정 항목은 삭제하지 않고 검토 상태로 남겨 사용자가 추후 판단할 수 있게 합니다.

## 커밋과 PR

변경 결과를 설명하는 짧은 한국어 명령형 제목을 사용합니다. 예: `홋카이도 일정 가이드 추가`. PR에는 사용자에게 보이는 변경점, `pnpm build` 결과, 확인한 화면 크기를 적습니다. `dist/`, 의존성 폴더, 비밀값, 로컬 환경 파일은 커밋하지 않습니다.
