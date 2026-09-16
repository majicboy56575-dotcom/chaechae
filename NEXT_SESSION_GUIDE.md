# 🚀 Monopic Next Session Guide (다음 작업 안내)

> **최종 수정일**: 2026-09-16
> **현재 상태**: Paddle & LemonSqueezy MoR 결제 규정/약관/환불 정책 100% 최적화 완료 (빌드 검증 완료, 배포 대기 중)

---

## 📌 진행 완료 내역 상세 요약

### 1️⃣ Paddle & LemonSqueezy 결제 심사 완벽 최적화
- **이용약관 ([app/terms/page.tsx](file:///c:/App/proshot/proshot/app/terms/page.tsx))**:
  - B2B/B2C SaaS 소프트웨어 정의
  - **Paddle 공인 리셀러(Merchant of Record) 필수 고지 문구 반영 완료**
  - AI 윤리 정책(AUP) 및 딥페이크/타인사칭/성인물(NSFW) 엄격 금지 조항
  - 생성 이미지에 대한 사용자의 상업적 이용 권리 보장
- **환불 및 취소 정책 ([app/refund/page.tsx](file:///c:/App/proshot/proshot/app/refund/page.tsx))**:
  - **14일 안심 전액 환불 보장** (미사용 크레딧 100% 무조건 환불)
  - **AI 연산 실패 무상 보호** (시스템 오류 시 크레딧 미차감 보증)
  - `majicboy56575@gmail.com` 24시간 응답 SLA 접수 안내
- **개인정보처리방침 ([app/privacy/page.tsx](file:///c:/App/proshot/proshot/app/privacy/page.tsx))**:
  - **Zero-Training 원칙**: 사용자 사진의 AI 모델 훈련 무단 활용 절대 금지
  - **즉시 파기(Instant Purge)**: 생성 직후 서버에서 즉시 영구 삭제 명시
- **전체 푸터 및 가격 페이지 신뢰도 배너**:
  - 모든 페이지 푸터에 통일된 법적 링크 및 고객센터 정보 배치
  - 가격 페이지에 14일 환불 보장 및 즉시 디지털 배송 배지 추가
- **Lemon Squeezy 재심사 소명서 ([LEMONSQUEEZY_APPEAL_EMAIL.md](file:///c:/App/proshot/proshot/LEMONSQUEEZY_APPEAL_EMAIL.md))**:
  - 맞춤형 영문 공식 재심사 이메일 전문 작성 완료

---

## 📌 다음 진행 작업 (TODO)

### 1️⃣ 프로덕션 빌드 & 호스팅 배포 (원할 때 실행)
```bash
npx firebase-tools deploy --only hosting
```

### 2️⃣ Paddle 계정 승인(Verified) 확인
- [Paddle 대시보드](https://vendors.paddle.com)에서 계정 심사 완료 확인.
- [Paddle Notifications](https://vendors.paddle.com/notifications)에 웹훅 목적지 등록:
  - `https://chaechae--chae-chae.asia-east1.hosted.app/api/paddle/webhook`

### 3️⃣ Lemon Squeezy 재심사 메일 발송 (선택)
- `LEMONSQUEEZY_APPEAL_EMAIL.md` 본문을 복사하여 `support@lemonsqueezy.com`으로 발송.

### 4️⃣ Meta 광고 캠페인 재개 (광고 ON)
- [Meta 광고 관리자](https://adsmanager.facebook.com)에서 `Monopic` 캠페인 활성화.

