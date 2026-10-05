# 🚀 Monopic Session Summary & Next Steps Guide

> **최종 업데이트**: 2026-10-05  
> **현재 상태**: 1회 무료 체험(워터마크 미리보기) 도입, 말레이시아 링깃(MYR/RM) 가격 현지화 및 환율 안내 적용, GitHub `main` 푸시 및 Firebase App Hosting 라이브 배포 완료  
> **라이브 서비스**: https://chaechae--chae-chae.asia-east1.hosted.app  
> **광고 계정 ID**: `2102865683953285` / **메타 픽셀 ID**: `2602221480295821`  

---

## 📌 1. 금일(2026-10-05) 진행 및 완료 내역

### 1️⃣ Meta 광고 퍼널 성과 정밀 분석 및 전환 병목 진단
- **성과 데이터 (최근 7일 지출 ₩35,968)**:
  - 노출: 6,628회
  - 링크 클릭: 187회 (CTR 2.82%, CPC 192원) ➡️ **광고 소재/후킹은 매우 우수**
  - 랜딩 페이지 조회: 146회 (도달률 78.1%) ➡️ **웹사이트 접속 및 로딩 정상**
  - 콘텐츠 조회(`ViewContent`): 20회 (13.7%) ➡️ **86.3%가 첫 화면에서 이탈**
  - 결제 시작(`InitiateCheckout`): 0회 (0%) ➡️ **최종 매출 0원**
- **근본 원인 진단**:
  1. 사전 체험(무료 샘플) 없이 가입 즉시 유료 결제 강제 팝업 노출로 인한 100% 이탈
  2. 말레이시아 현지 유저 기준 낯선 달러($) 표기 및 가격 장벽

---

### 2️⃣ 신규 가입자 1회 무료 체험 및 워터마크 파이프라인 구축
- **Google 가입 시 1회 무료 체험 제공**:
  - 첫 방문 유저가 본인 사진으로 생성 퀄리티를 직접 확인할 수 있도록 1회 무료 생성 지원
- **서버 사이드 워터마크 합성 엔진 (`sharp`)**:
  - 무료 체험 결과물에 `MONOPIC · FREE PREVIEW` 대각선 워터마크 및 하단 배너를 서버에서 합성 ([watermark.ts](file:///c:/App/proshot/proshot/app/lib/watermark.ts), [verifyUser.ts](file:///c:/App/proshot/proshot/app/lib/verifyUser.ts))
  - 클라이언트에서 조작/제거 불가능한 안전한 구조
- **워터마크 제거 업셀링(Upsell) UI 연결**:
  - 결과 화면에 "워터마크 없이 2K 원본 받기" 결제 유도 배너 배치 ([UploadCard.tsx](file:///c:/App/proshot/proshot/app/components/UploadCard.tsx))
  - 8개 국어 다국어 문구 완비

---

### 3️⃣ 말레이시아 현지 통화(MYR / RM) 가격 현지화 & 환율 안내 적용
- **요금제 카드 및 랜딩페이지 가격을 링깃(RM)으로 표기**:
  - **Starter (5장)**: `RM 18 / MYR` (장당 RM 3.60 / foto)
  - **Standard (10장)**: `RM 32 / MYR` (장당 RM 3.20 / foto)
  - **Best Value (20장)**: `RM 50 / MYR` (장당 RM 2.50 / foto)
  - *(한국어 `₩5,500`, 영어 `$3.99` 등 언어별 자동 환산 표기)*
- **Paddle 체크아웃 연동 최적화**:
  - 결제창 호출 시 국가 코드 `MY`를 전달하여 말레이시아 통화로 즉시 열리도록 구성
- **환율 차이 안내 문구 추가**:
  - ℹ️ *"Harga dalam RM adalah anggaran berdasarkan kadar pertukaran semasa dan mungkin sedikit berbeza semasa pembayaran. (Dibilkan melalui Paddle)"*
  - 고객 신뢰도 확보 및 투명한 가격 고지 적용

---

### 4️⃣ 빌드 검증 및 깃허브 푸시
- `next build` 프로덕션 빌드 성공
- **Git 최신 커밋**:
  - `e649410`: `feat(pricing): support Malaysian Ringgit (MYR) localized pricing and exchange rate notice`
  - `881120f`: `feat: add 1-time free watermarked trial and server-side watermark pipeline`
- **배포 상태**: GitHub `origin/main` 푸시 완료 ➡️ **Firebase App Hosting 라이브 자동 배포 가동**

---

## 📌 2. 다음 세션 추천 작업 (TODO)

1. **메타 광고 퍼널 데이터 재측정**:
   - 무료 체험 적용 및 RM 통화 표기 이후 `ViewContent` 및 `InitiateCheckout` 전환 지표 모니터링
2. **결제 보안 강화 (추후 진행 권장)**:
   - 클라이언트 사이드 크레딧 동기화 로직을 Paddle Webhook 단일 권한으로 이전
3. **Google Play Console 비공개 테스트 및 AAB 패키징**:
   - 안드로이드 앱 빌드 및 스토어 릴리즈 준비
