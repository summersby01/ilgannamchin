# FRONTEND-SPEC.md

## 1. 페이지 전략
MVP는 단일 페이지 앱 형태로 구현한다.

- `/` : 홈, 게임, 결과 상태를 모두 포함
- 상태 전환만으로 화면 변경

## 2. 컴포넌트 구조 예시
```text
app/page.tsx
 ├─ GameShell
 │   ├─ HomeScreen
 │   ├─ RollingScreen
 │   ├─ ResultScreen
 │   └─ ResultCard
 └─ Shared UI
     ├─ PrimaryButton
     ├─ SecondaryButton
     └─ ErrorNotice
```

## 3. 상태 정의
```ts
type GamePhase = "home" | "rolling" | "result";
```

필수 상태:
- `phase`
- `idols`
- `currentIndex`
- `selectedIdol`
- `isLoading`
- `error`

## 4. 상호작용 명세

### HomeScreen
표시 요소:
- `일간남친`
- `START를 눌러 / 오늘의 남자친구를 만나보세요`
- `START`

행동:
- `START` 클릭 시 `phase = rolling`
- 롤링 타이머 시작

### RollingScreen
표시 요소:
- 현재 이미지
- `STOP을 눌러 / 오늘의 남자친구를 결정하세요`
- `STOP`

행동:
- 일정 간격으로 `currentIndex` 변경
- `STOP` 클릭 시 현재 인물 확정

### ResultScreen
표시 요소:
- `오늘의 남자친구`
- 결과 카드
- `사진 저장`
- `공유하기`
- `다시하기`

행동:
- 저장: `ResultCard` 기준 PNG 생성
- 공유: Web Share API 또는 링크 복사
- 다시하기: 홈 또는 롤링 초기화

## 5. 스타일 가이드

### 톤
- 귀엽지만 과하게 유치하지 않게
- 팬게임/밈 느낌
- 모바일 카드 UI 중심

### 컬러 방향
예시:
- 메인: 핑크 / 레드 계열
- 보조: 크림 / 화이트
- 포인트: 하트, 글로우, 소프트 그림자

### 타이포
- 제목은 굵고 짧게
- 설명은 2줄 내외
- 버튼 텍스트는 짧고 명확하게

## 6. 반응형 기준
- 모바일 1순위: 360px~430px 폭 대응
- 태블릿/데스크톱: 중앙 카드 폭 유지

## 7. 이미지 처리
- 가능하면 동일 비율로 크롭된 이미지 사용
- `object-cover`
- 레이아웃 점프 방지를 위해 고정 ratio 적용

## 8. 접근성
- 버튼 `aria-label` 지정
- 이미지 `alt` 지정
- 키보드 포커스 스타일 유지

## 9. 저장 대상 분리
결과 페이지 전체가 아니라 **결과 카드 영역만** 저장해야 한다.  
이유:
- 공유 이미지가 깔끔함
- 버튼/배경/광고성 요소 제거 가능

## 10. 구조 전환 대비
자동 롤링 구조로 전환될 가능성이 있으므로 `START` 로직은 컴포넌트 분리 권장.

예:
- `HomeScreen`
- `RollingScreen`

나중에 홈 진입 직후 `RollingScreen`으로 바로 보내도 되게 설계한다.
