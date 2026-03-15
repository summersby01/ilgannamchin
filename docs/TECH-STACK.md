# TECH-STACK.md

## 1. 확정 스택
- **Runtime**: Node.js 20 LTS 권장
- **Framework**: Next.js 15+ 또는 최신 안정 버전
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database / Storage**: Supabase
- **Hosting / Serverless**: Vercel

## 2. 추가로 꼭 필요한 것

사용자가 제시한 스택만으로도 개발은 가능하지만, 아래 요소는 사실상 필요하다.

### 2.1 패키지 매니저
권장:
- `npm` 또는 `pnpm`

초보자 기준으로는 `npm`이 가장 단순하다.

### 2.2 상태 관리
이 앱은 규모가 작아서 전역 상태 라이브러리 없이도 가능하다.

권장:
- React `useState`
- 필요 시 `useMemo`, `useEffect`

추가 라이브러리는 MVP 단계에서는 불필요하다.

### 2.3 결과 이미지 저장 라이브러리
권장 후보:
- `html-to-image`

이유:
- 결과 카드 DOM을 PNG로 뽑기 쉽다.
- 구현 난이도가 비교적 낮다.

### 2.4 아이콘
권장:
- `lucide-react`

이유:
- 버튼 아이콘, 공유 아이콘, 저장 아이콘에 유용하다.

### 2.5 유효성 검사
권장:
- 간단한 경우 직접 검증
- API payload가 늘면 `zod` 고려 가능

MVP에서는 필수는 아니다.

### 2.6 이미지 최적화
권장:
- Next.js `next/image`
- 가능하면 Supabase Storage 또는 앱 내 정적 자산 사용

주의:
- 외부 이미지 사용 시 도메인 허용과 CORS 점검 필요

### 2.7 코드 품질
권장:
- ESLint
- Prettier

### 2.8 분석 툴
선택:
- Vercel Analytics
- PostHog

MVP에서는 필수 아님. 다만 공유/저장 클릭률을 보고 싶다면 유용하다.

## 3. 추천 패키지 목록
```bash
npm install @supabase/supabase-js html-to-image lucide-react
npm install -D tailwindcss eslint prettier
```

선택:
```bash
npm install zod
```

## 4. 왜 이 조합이 맞는가
### 전제
앱 구조가 단순하고, 핵심은 UI/UX와 결과 카드 저장이다.

### 근거
- Next.js: 배포와 라우팅이 간단함
- TypeScript: 데이터 구조 실수 감소
- Tailwind CSS: 빠른 UI 구현
- Supabase: DB + Storage를 한 번에 해결
- Vercel: Next.js 배포 최적화

### 결론
현재 요구사항에는 **가볍고 빠른 구현**에 적합한 조합이다.

## 5. 버전 관리 권장
- Node.js 20 LTS
- npm 최신 안정 버전
- GitHub 저장소 필수

## 6. 배포 구조
- 프론트엔드 + API Route: Vercel
- DB / Storage: Supabase

## 7. 필요하지만 종종 빠뜨리는 항목
- `.env.local`
- Supabase 프로젝트 URL / anon key
- Storage 버킷 정책
- 이미지 자산 라이선스 확인
- 모바일 사파리 저장 테스트
