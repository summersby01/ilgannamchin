# ENV-VARIABLES.md

## 필수 환경변수
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 선택 환경변수
```env
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

## 설명
| 변수명 | 공개 여부 | 설명 |
|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL | 공개 가능 | Supabase 프로젝트 URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | 공개 가능 | 읽기용 anon key |
| SUPABASE_SERVICE_ROLE_KEY | 비공개 필수 | 서버 전용 관리자 키 |
| NEXT_PUBLIC_SITE_URL | 공개 가능 | 공유 링크 생성 시 기준 URL |

## 주의
- `SUPABASE_SERVICE_ROLE_KEY`는 브라우저로 보내면 안 된다.
- 배포 환경과 로컬 환경 값을 구분한다.
