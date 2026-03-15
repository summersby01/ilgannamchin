# API-CONTRACT.md

## 1. 개요
MVP에서는 API가 많지 않다.  
가능하면 서버 API를 최소화하고, 클라이언트에서 Supabase 읽기만 수행해도 된다.  
다만 구조를 명확히 하기 위해 아래 계약을 정의한다.

## 2. GET /api/idols
### 목적
게임에 사용할 활성 아이돌 목록 반환

### 요청
```http
GET /api/idols
```

### 응답 200
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "차은우",
      "groupName": "ASTRO",
      "imageUrl": "https://.../idol-images/astro/cha-eunwoo.jpg"
    }
  ]
}
```

### 응답 규칙
- `is_active = true`만 반환
- 정렬 기준: `sort_order ASC, created_at ASC`

### 에러 응답 500
```json
{
  "error": {
    "code": "IDOL_FETCH_FAILED",
    "message": "아이돌 목록을 불러오지 못했습니다."
  }
}
```

---

## 3. POST /api/share-link (선택)
### 목적
공유 링크를 DB에 남기고 고정된 결과 URL 발급

### 요청
```json
{
  "idolId": "uuid"
}
```

### 응답 201
```json
{
  "id": "uuid",
  "shareUrl": "https://app.example.com/result/abc123"
}
```

### 비고
MVP에서는 생략 가능하다.  
딥링크 공유가 필요해질 때 도입한다.

---

## 4. 클라이언트 함수 계약

### fetchIdols()
```ts
type FetchIdolsResponse = {
  items: Idol[];
};
```

### startRolling()
- phase를 `rolling`으로 변경
- timer 시작

### stopRolling()
- timer 종료
- selectedIdol 확정
- phase를 `result`로 변경

### saveResultCard()
- 결과 카드 DOM을 PNG로 변환
- 파일 다운로드 실행

### shareResult()
- `navigator.share` 가능 시 공유 실행
- 불가능 시 링크 복사

## 5. 에러 코드 표준
| 코드 | 의미 |
|---|---|
| IDOL_FETCH_FAILED | 아이돌 목록 조회 실패 |
| NO_IDOLS_AVAILABLE | 활성 아이돌 없음 |
| IMAGE_EXPORT_FAILED | 결과 이미지 생성 실패 |
| SHARE_NOT_SUPPORTED | 공유 미지원 |
