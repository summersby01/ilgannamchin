# IMPLEMENTATION-PLAN.md

## 1. 개발 순서

### 단계 1. 프로젝트 초기화
- Next.js + TypeScript 프로젝트 생성
- Tailwind CSS 설정
- ESLint / Prettier 적용
- 기본 디렉터리 구조 정리

### 단계 2. Supabase 연결
- Supabase 프로젝트 생성
- `idols` 테이블 생성
- Storage 버킷 생성
- 샘플 이미지 업로드
- 환경변수 연결

### 단계 3. 데이터 연동
- 아이돌 목록 fetch 함수 작성
- 로딩/에러 처리
- 이미지 URL 매핑

### 단계 4. 화면 구현
- `HomeScreen`
- `RollingScreen`
- `ResultScreen`
- `ResultCard`

### 단계 5. 게임 로직
- `START` 클릭 시 롤링 시작
- `setInterval` 또는 `requestAnimationFrame` 기반 인덱스 변경
- `STOP` 클릭 시 확정
- `다시하기` 시 초기화

### 단계 6. 저장 기능
- 결과 카드 ref 연결
- `html-to-image`로 PNG 생성
- 다운로드 처리

### 단계 7. 공유 기능
- Web Share API 구현
- fallback 링크 복사 구현
- 실패 메시지 처리

### 단계 8. QA 및 배포
- 모바일 브라우저 테스트
- 이미지 로딩 최적화
- Vercel 배포
- 최종 QA

## 2. 추천 디렉터리 구조
```text
src/
  app/
    page.tsx
    globals.css
  components/
    game/
      HomeScreen.tsx
      RollingScreen.tsx
      ResultScreen.tsx
      ResultCard.tsx
    ui/
      Button.tsx
      ErrorNotice.tsx
  lib/
    supabase.ts
    idols.ts
    share.ts
    save-image.ts
  types/
    idol.ts
```

## 3. 작업 우선순위
### 필수
1. 데이터 조회
2. 롤링 로직
3. 결과 화면
4. 저장
5. 공유

### 후순위
1. 애니메이션 미세조정
2. 장식 UI
3. 필터
4. 결과 통계

## 4. 예상 위험 지점
- 타이머 중복 실행
- 이미지 로딩 지연
- 저장 시 레이아웃 깨짐
- 모바일 사파리 저장 이슈

## 5. 구현 체크리스트
- [ ] 홈 화면 텍스트 확정
- [ ] START 버튼 동작
- [ ] STOP 버튼 동작
- [ ] 결과 이름/이미지 표시
- [ ] 결과 카드 PNG 저장
- [ ] 공유 fallback 구현
- [ ] Supabase 데이터 연결
- [ ] 모바일 반응형 확인

## 6. 향후 구조 전환을 위한 분리 원칙
자동 롤링 구조로 바꾸기 쉽게 아래를 분리한다.
- 홈 화면 컴포넌트
- 롤링 시작 함수
- phase 전환 로직

이렇게 해두면 “게임화면구조 수정” 요청 시 대규모 재작성 없이 변경 가능하다.
