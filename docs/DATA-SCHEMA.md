# DATA-SCHEMA.md

## 1. 개요
MVP에서는 데이터 구조가 단순하므로 테이블 하나와 Storage 버킷 하나만으로도 충분하다.

## 2. 테이블: idols

### 컬럼 정의
| 컬럼명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | 기본 키 |
| name | text | Y | 아이돌 이름 |
| group_name | text | N | 그룹명 |
| image_path | text | Y | Storage 내 경로 또는 절대 URL |
| is_active | boolean | Y | 노출 여부 |
| sort_order | integer | Y | 정렬 순서 |
| created_at | timestamptz | Y | 생성 시각 |
| updated_at | timestamptz | Y | 수정 시각 |

## 3. SQL 예시
```sql
create extension if not exists pgcrypto;

create table if not exists public.idols (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  group_name text,
  image_path text not null,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## 4. 인덱스
```sql
create index if not exists idx_idols_is_active on public.idols (is_active);
create index if not exists idx_idols_sort_order on public.idols (sort_order);
```

## 5. updated_at 트리거
```sql
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_idols_updated_at on public.idols;

create trigger trg_idols_updated_at
before update on public.idols
for each row
execute function public.set_updated_at();
```

## 6. 조회 기준
게임에 사용되는 데이터는 아래 조건으로 조회:
- `is_active = true`
- `sort_order asc, created_at asc`

## 7. Storage
버킷 예시:
- `idol-images`

경로 예시:
- `idol-images/astro/cha-eunwoo.jpg`
- `idol-images/seventeen/mingyu.jpg`

## 8. 응답용 가공 형태
프론트에서 필요한 형태:
```ts
type Idol = {
  id: string;
  name: string;
  groupName: string | null;
  imageUrl: string;
};
```

## 9. 향후 확장용 테이블 후보
### game_results
공유 가능한 결과 링크 저장이 필요할 때 추가
| 컬럼명 | 타입 | 설명 |
|---|---|---|
| id | uuid | 결과 ID |
| idol_id | uuid | 선택된 아이돌 |
| share_slug | text | 공유 URL 식별자 |
| created_at | timestamptz | 생성 시각 |

### idol_groups
그룹 필터가 필요할 때 분리 가능

## 10. RLS 권장
- 일반 사용자: `select`만 허용
- 관리자만 `insert/update/delete`
