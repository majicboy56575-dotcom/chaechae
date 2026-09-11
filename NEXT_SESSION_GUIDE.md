# 🚀 Monopic Next Session Guide (다음 작업 안내)

> **작성일**: 2026-09-11
> **현재 상태**: LemonSqueezy 결제 시스템 연동 완료 & 로컬 결제 테스트 성공 (Meta 광고 일시 중지 중)

---

## 📌 다음 접속 시 최우선 진행 작업 (TODO)

### 1️⃣ LemonSqueezy 신분증 본인 인증(Identity Verification) 완료
- **경로**: [LemonSqueezy 대시보드 - General Settings](https://app.lemonsqueezy.com/settings/general)
- `Action Required` 버튼을 클릭하여 본인 인증을 마무리합니다.
- **추천 신분증**: 
  - 🌟 **운전면허증** (인식률 높음)
  - 🌟 **유효기간 남은 여권** (1초 만에 자동 승인)
  - *(주민등록증은 홀로그램 빛 반사로 초점 오류가 날 수 있으므로 간접 조명 및 어두운 배경에서 촬영)*

### 2️⃣ Live 모드 전환 & Live API Key 적용
- 신분증 인증 심사 완료 후:
  1. LemonSqueezy 대시보드 좌측 하단 **`Test mode`** 토글 스위치 끄기 (Live 전환)
  2. **`Settings ➔ API`**에서 Live API Key 생성
  3. `.env.local`의 `LEMONSQUEEZY_API_KEY` 교체

### 3️⃣ 프로덕션 배포 & Meta 광고 재개
- 웹사이트 배포 완료 후 [Meta 광고 관리자](https://adsmanager.facebook.com)에서 `Monopic` 캠페인 스위치를 다시 켜서(ON) 광고 송출 재개!

---

## 📋 핵심 설정 정보 백업
- **Store ID**: `472095` (Monopic)
- **Variant IDs**:
  - Starter (5장 / $3.99): `2114391`
  - Standard (10장 / $6.99): `2114393`
  - Best Value (20장 / $10.99): `2114395`
- **Webhook URL**: `https://chaechae--chae-chae.asia-east1.hosted.app/api/lemonsqueezy/webhook` (Event: `order_created`)
- **Meta 활성 픽셀**: `2602221480295821`
