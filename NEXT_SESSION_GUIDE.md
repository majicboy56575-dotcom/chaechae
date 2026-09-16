# 🚀 Monopic Session Summary & Next Steps Guide

> **최종 업데이트**: 2026-09-16  
> **현재 상태**: Paddle & Lemon Squeezy 재승인 심사 준비 및 깃 푸시 완료 (`Pending` 상태)  
> **라이브 서비스**: https://chaechae--chae-chae.asia-east1.hosted.app  

---

## 📌 1. 금일 작업 상세 완료 내역

### 1️⃣ 글로벌 결제사(Lemon Squeezy / Paddle) 규정 100% 충족
- **이용약관 (`/terms`)**:
  - B2B/B2C SaaS 소프트웨어 정의 및 즉시 디지털 제공 명시
  - **Paddle 공인 리셀러(Merchant of Record) 필수 고지 조항 반영 완료**
  - 엄격한 AI 윤리 가이드라인(Zero-NSFW, 비동의 딥페이크 금지, 타인 사칭 차단)
- **환불 및 취소 정책 (`/refund`)**:
  - **단서 조항 없는 14일 100% 전액 환불 보장** (Dev.to 패들 승인 공식 준수)
  - AI 생성 실패 시 크레딧 무상 보호 조항
- **개인정보처리방침 (`/privacy`)**:
  - **Zero AI Training Guarantee**: 유저 사진 AI 훈련 절대 금지
  - **Instant Purge**: 렌더링 즉시 원본 사진 영구 파기
- **랜딩페이지 (`/`) 및 푸터 강화**:
  - `#pricing` (투명 요금제 3단 그리드: $3.99, $6.99, $10.99)
  - `#safety` (AI 윤리 및 안전 규정 4개 카드 노출)
  - 대표자: 박윤우 (Yunwoo Park)
  - 실물 사업장 주소: `대전광역시 유성구 전민로38번길 56`
  - 고객 지원: `majicboy56575@gmail.com` (24시간 SLA)

### 2️⃣ 로컬 화면 렌더링 정상화 (CSS 404 해결)
- Next.js 내부 캐시 충돌 정리 및 `layout.css` 정상 서빙 복구.
- Tailwind 비정규 클래스 `sm:w-68` -> `sm:w-72` 수정으로 Before/After 카드 완벽 복원.

### 3️⃣ 소명 문서 작성 및 GitHub 푸시
- `LEMONSQUEEZY_APPEAL_EMAIL.md` (레몬스퀴즈 Suhasini 심사관용)
- `PADDLE_APPEAL_EMAIL.md` (패들 sellers@paddle.com 팀용)
- `origin/main`으로 모든 소스코드 및 문서 푸시 완료 (`8addb64`).

### 4️⃣ Paddle 대시보드 도메인 재신청
- `vendors.paddle.com/request-domain-approval`에서 도메인 재등록 완료 (`⚪ Pending` 상태 진입).

---

## 📌 2. 대기 중 및 다음 세션 추천 작업 (TODO)

### 1️⃣ 승인 확인 및 후속 연동
- **Paddle**: 승인 완료 시 Webhook 등록 (`https://chaechae--chae-chae.asia-east1.hosted.app/api/paddle/webhook`)
- **Lemon Squeezy**: 거절 메일 답장 후 승인 시 API 키/스토어 ID 라이브 교체

### 2️⃣ 마케팅 & 광고 소재 자동 제작 (`shorts_generator/`)
- 메타 광고(말레이시아/글로벌 CBO 캠페인) 및 유튜브 숏폼/릴스 비디오 자동 렌더링 파이프라인 가동.

### 3️⃣ AI 프로필 신규 스타일 확장
- 정장/여권/링크드인/스튜디오 화보 등 유저 전환율 높은 테마 프리셋 추가.

### 4️⃣ Capacitor 안드로이드 앱 빌드 점검
- Google Play Console 비공개 테스트 및 스토어 릴리즈 AAB 패키징 점검.
