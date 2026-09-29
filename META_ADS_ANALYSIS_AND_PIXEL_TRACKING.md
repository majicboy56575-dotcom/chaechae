# 📊 Meta 광고 성과 정밀 분석 및 픽셀 전환 추적 시스템 구축 보고서

> **작성 일시**: 2026-09-29  
> **광고 계정 ID**: `2102865683953285`  
> **메타 픽셀 ID**: `2602221480295821`  
> **라이브 도메인**: `https://chaechae--chae-chae.asia-east1.hosted.app`  

---

## 📌 1. 현재 메타 광고 성과 데이터 분석 (총 지출: ₩74,676)

| 단계 (퍼널) | 수치 | 지표 성격 및 분석 |
| :--- | :---: | :--- |
| **광고 노출** | **15,150회** | 말레이시아 타겟 유저 피드/스토리에 광고 노출 |
| **링크 클릭** | **540회** | **CTR(클릭률) 3.56%**, **CPC 약 138원** ⭐️<br>*(평균 1~2% 대비 2배 이상 높으며, 광고 비디오/소재의 유입 흡입력이 매우 뛰어남)* |
| **랜딩 페이지 조회** | **358회** | **도달률 66.3%** (540명 중 358명이 사이트 접속 성공, 182명은 로딩 중 이탈) |
| **콘텐츠 조회 (ViewContent)** | **— (미기록)** | ⚠️ 이전 버전에서 이벤트 코드가 없어 메타에 미전송 (이번 작업으로 적용 완료) |
| **결제 시작 (InitiateCheckout)** | **— (미기록)** | ⚠️ 이전 버전에서 이벤트 코드가 없어 메타에 미전송 (이번 작업으로 적용 완료) |
| **구매 완료 (Purchase)** | **— (0건)** | 최종 유료 결제 미발생 |

---

## 📌 2. 조치 및 개선 완료 내역

### 1️⃣ 말레이시아어(Bahasa Melayu) 다국어 전면 대응
- **[UploadCard.tsx](file:///c:/App/proshot/proshot/app/components/UploadCard.tsx)**: 사진 미선택 및 처리 중 alert 문구를 다국어 지원 키(`alert_select_image`, `alert_processing`)로 교체
- **[pricing/page.tsx](file:///c:/App/proshot/proshot/app/pricing/page.tsx)**: 결제 시 로그인 유도 한국어 alert를 `pricing_login_required_credits` 다국어 키로 교체
- **[translations.ts](file:///c:/App/proshot/proshot/app/lib/i18n/translations.ts)**: 말레이어(`ms`), 영어, 일본어, 중국어, 스페인어, 힌디어 전 언어셋 신규 번역 추가

### 2️⃣ 메타 픽셀(Meta Pixel) 표준 전환 이벤트 3단계 적용
1. **`ViewContent`**: 가격 페이지(`/pricing`) 방문 시 플랜 정보와 함께 자동 발화
2. **`InitiateCheckout`**: 결제/충전 버튼 클릭 시 선택한 플랜명, 결제 금액, 통화 데이터 포함 발화
3. **`Purchase`**: Paddle 결제 완료(`checkout.completed`) 시 실제 결제 금액과 함께 발화
4. **픽셀 ID 오류 수정**: `layout.tsx` 내 `noscript` 태그에 잘못 들어가 있던 ID(`8612...`)를 실제 운영 픽셀 ID `2602221480295821`로 일치시킴

---

## 📌 3. 향후 퍼널 분석 및 이탈 진단 가이드

테이블에 새로 쌓이는 `콘텐츠 조회` 및 `결제 시작` 수치를 보고 즉시 액션을 취할 수 있습니다:

```
[노출: 15,150] ➡️ [클릭: 540] ➡️ [랜딩: 358] ➡️ [가격 확인: ?] ➡️ [결제 시도: ?] ➡️ [구매: ?]
```

| 이탈 구간 | 핵심 원인 | 대응 전략 |
| :--- | :--- | :--- |
| **랜딩(358) ➡️ 가격 확인 저조** | 첫 화면에서 가치 전달 및 신뢰 부족 | 첫 화면 헤드카피, Before/After 화보 샘플 강화, CTA 버튼 강조 |
| **가격 확인 ➡️ 결제 시도 저조** | 가격 장벽 또는 혜택 부족 | 최저가 체험 플랜(소액) 전면 배치, 첫 결제 할인 프로모션 |
| **결제 시도 ➡️ 구매 완료 0건** | 현지 결제수단 부재 또는 결제 심리 장벽 | Paddle 결제창 내 현지 e-Wallet 지원 점검, 안심 환불 보장 배지 노출 |

---

## 📌 4. 배포 및 깃허브 관리
- **저장소**: `https://github.com/majicboy56575-dotcom/chaechae.git`
- **최신 커밋**: `8a5b04b` (fix(i18n,pixel): complete Malay i18n alerts and add Meta Pixel conversion tracking events)
- **빌드 검증**: `next build` 프로덕션 빌드 성공 (Code 0)
