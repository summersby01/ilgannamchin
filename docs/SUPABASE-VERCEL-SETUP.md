# SUPABASE-VERCEL-SETUP.md

## 1. Supabase 설정

### 1.1 프로젝트 생성
- Supabase에서 새 프로젝트 생성
- 지역 선택
- DB 비밀번호 저장

### 1.2 테이블 생성
`DATA-SCHEMA.md`의 SQL 실행:
- `idols` 테이블 생성
- 인덱스 생성
- `updated_at` 트리거 생성

### 1.3 Storage 버킷 생성
버킷명 예시:
- `idol-images`

권장:
- MVP에서는 public bucket
- 파일명 규칙 통일
  - 소문자
  - 공백 대신 하이픈

### 1.4 샘플 데이터 입력
예시:
```sql
insert into public.idols (name, group_name, image_path, sort_order)
values
  ('샘플1', 'GROUP A', 'idol-images/group-a/sample1.jpg', 1),
  ('샘플2', 'GROUP B', 'idol-images/group-b/sample2.jpg', 2);
```

### 1.5 RLS
기본 원칙:
- 공개 읽기 허용
- 쓰기는 관리자만

필요 시:
```sql
alter table public.idols enable row level security;
```

읽기 정책 예시:
```sql
create policy "public can read active idols"
on public.idols
for select
to anon
using (is_active = true);
```

## 2. Vercel 설정

### 2.1 GitHub 연결
- GitHub 저장소 생성
- Vercel에서 import

### 2.2 환경변수 등록
필수:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

선택:
- `SUPABASE_SERVICE_ROLE_KEY`  
  관리자 API가 필요할 때만 서버 환경에 추가

### 2.3 배포
- Production 브랜치 자동 배포
- Preview 배포 활성화

## 3. 로컬 환경

### 3.1 .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 3.2 개발 실행
```bash
npm install
npm run dev
```

## 4. 주의사항
- `SERVICE_ROLE_KEY`는 절대 클라이언트에 노출하면 안 된다.
- 이미지 URL 생성 방식은 public URL과 signed URL 중 하나로 통일한다.
- 외부 이미지 대신 Storage 사용이 가장 안정적이다.
