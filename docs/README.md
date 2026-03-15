# 일간남친 문서 세트

이 디렉터리는 **일간남친** 웹앱을 구현하기 위한 기본 문서 세트다.

## 앱 한 줄 설명
여러 남자 아이돌 사진이 빠르게 롤링되고, 사용자가 `STOP` 버튼을 누른 순간 멈춘 인물이 “오늘의 남자친구” 결과로 표시되는 팬용 밈 게임 웹앱이다.

## 기본 스택
- Node.js
- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## 포함 문서
- `PRD.md`
- `TECH-STACK.md`
- `ARCHITECTURE.md`
- `USER-FLOWS-WIREFRAMES.md`
- `DATA-SCHEMA.md`
- `API-CONTRACT.md`
- `FRONTEND-SPEC.md`
- `SUPABASE-VERCEL-SETUP.md`
- `IMPLEMENTATION-PLAN.md`
- `TESTING-QA.md`
- `SKILL.md`
- `ENV-VARIABLES.md`
- `ASSET-LICENSE-RISK.md`

## 권장 추가 사항
이 앱에서 기술보다 더 중요한 건 아래 두 가지다.
1. 결과 카드 디자인
2. 이미지 자산 사용 권리 정리

특히 아이돌 실사진을 공개 서비스에 사용하는 경우 저작권·초상권 이슈가 발생할 수 있으므로 `ASSET-LICENSE-RISK.md`를 먼저 확인해야 한다.

## 빠른 시작
1. `PRD.md`로 범위 확정
2. `DATA-SCHEMA.md`로 DB 준비
3. `SUPABASE-VERCEL-SETUP.md`대로 환경 구성
4. `IMPLEMENTATION-PLAN.md` 순서대로 개발
5. `TESTING-QA.md`로 검수

## 현재 기본 UX 구조
```text
홈
↓
START
↓
롤링 화면
↓
STOP
↓
결과 화면
```

## 향후 구조 전환 메모
프로젝트 내부 약속어:
- **게임화면구조 수정**  
  → `START` 없이 자동 롤링 → `STOP` → 결과 구조로 변경하도록 Codex에 지시하는 의미
