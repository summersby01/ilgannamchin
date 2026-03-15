# ARCHITECTURE.md

## 1. 시스템 개요
일간남친은 서버 복잡도가 낮은 단순 웹앱 구조를 사용한다.

```text
사용자 브라우저
  ↓
Next.js App (Vercel)
  ├─ UI Rendering
  ├─ Result Card Generation
  ├─ Share / Save Logic
  └─ API Routes (optional)
          ↓
      Supabase
      ├─ Database (idol metadata)
      └─ Storage (idol images)
```

## 2. 구성 요소

### 2.1 클라이언트
역할:
- 홈, 게임, 결과 화면 렌더링
- 이미지 롤링 제어
- 결과 확정
- 저장/공유 버튼 처리

### 2.2 Next.js 서버 레이어
역할:
- 정적 페이지 제공
- 필요 시 `/api/idols` 또는 `/api/share` 같은 얇은 API 제공
- 환경변수 보호

주의:
이 앱은 대부분 클라이언트 중심 동작이므로 복잡한 서버 로직은 필요하지 않다.

### 2.3 Supabase Database
역할:
- 아이돌 메타데이터 저장
  - 이름
  - 그룹명
  - 이미지 경로
  - 표시 여부
  - 정렬 순서

### 2.4 Supabase Storage
역할:
- 이미지 자산 저장
- 공개 버킷 또는 서명 URL 방식 선택 가능

권장:
MVP는 공개 읽기 버킷 사용

## 3. 데이터 흐름

### 기본 흐름
1. 앱 진입
2. 클라이언트가 아이돌 목록 조회
3. 이미지 preload
4. 사용자가 START 클릭
5. 롤링 시작
6. STOP 클릭
7. 현재 선택값 확정
8. 결과 화면 렌더링
9. 저장 또는 공유

## 4. 페이지 구조
- `/` : 홈 + 게임 + 결과를 단일 페이지로 구성 가능
- 선택적으로:
  - `/result/[id]` : 공유용 딥링크 페이지
  - `/admin` : 향후 관리자용

MVP 권장:
- 우선 단일 페이지 구성
- 결과 링크 공유가 필요해지면 결과 전용 라우트 추가

## 5. 상태 구조 예시
```ts
type GamePhase = "home" | "rolling" | "result";

type Idol = {
  id: string;
  name: string;
  groupName: string | null;
  imageUrl: string;
};

type GameState = {
  phase: GamePhase;
  idols: Idol[];
  currentIndex: number;
  selectedIdol: Idol | null;
  isRolling: boolean;
};
```

## 6. 예외 처리 전략
- 아이돌 목록 조회 실패 → 재시도 UI
- 이미지 로딩 실패 → fallback 이미지
- 저장 실패 → 브라우저 지원 안내
- 공유 미지원 → 링크 복사 fallback

## 7. 보안
- 쓰기 권한은 서버 또는 관리자 계정으로 제한
- 일반 사용자에게는 읽기만 허용
- 공개 서비스라면 Supabase RLS 정책 명확히 설정

## 8. 향후 확장 아키텍처
- 관리자 페이지에서 아이돌 CRUD
- 그룹별 필터 API
- 통계 수집
- 결과 공유용 DB 저장
