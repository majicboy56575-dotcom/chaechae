"use client";

import Link from "next/link";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../lib/i18n/LanguageContext";

export default function RefundPage() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-b from-indigo-100/40 via-purple-100/20 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-950 font-outfit whitespace-nowrap">
                Monopic
              </span>
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse flex-shrink-0" />
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector />
            <Link
              href="/"
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-xl transition-colors"
            >
              ← {t("nav_start") || "홈으로"}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3 shadow-sm">
            <span>🛡️</span>
            <span>14-Day Money Back Guarantee</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
            환불 및 취소 정책 (Refund & Cancellation Policy)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            최종 수정일: 2026년 9월 16일 (Effective Date: September 16, 2026)
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xl shadow-slate-200/50 space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* Summary Box */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200/80 p-5 rounded-2xl">
            <h3 className="font-extrabold text-slate-900 text-base mb-2 flex items-center gap-2">
              <span>✅</span> Monopic의 안심 환불 약속 (Our Commitment)
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Monopic은 고객의 신뢰를 최우선으로 생각합니다. 투명하고 공정한 거래를 위해 <strong>구매 후 14일 이내 미사용 크레딧에 대한 100% 무조건 전액 환불</strong> 및 <strong>AI 연산 실패 시 크레딧 무상 자동 보호</strong>를 원칙으로 합니다.
            </p>
          </div>

          {/* 1. 기본 환불 정책 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">1.</span> 14일 전액 환불 정책 (14-Day Full Refund Policy)
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600">
              <li>
                <strong>미사용 크레딧 전액 환불</strong>: 크레딧 패키지 결제 후 <strong>14일 이내</strong>에 단 1장의 사진도 생성하지 않고 크레딧을 전혀 사용하지 않은 경우, 별도의 사유를 묻지 않고 <strong>100% 전액 환불</strong>해 드립니다.
              </li>
              <li>
                <strong>부분 사용 크레딧</strong>: 크레딧을 일부 사용한 경우, 디지털 상품의 특성상 이미 소모된 연산 비용을 제외한 잔여 크레딧에 대한 비례 환불 또는 무상 재충전을 개별 심사 후 지원해 드립니다.
              </li>
            </ul>
          </section>

          {/* 2. 기술적 오류 및 생성 실패에 대한 보증 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">2.</span> AI 연산 오류 및 생성 실패 보증 (Technical Failure Protection)
            </h2>
            <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl mb-3 text-xs sm:text-sm text-indigo-950">
              <p className="font-bold mb-1">⚡ 자동 크레딧 보호 시스템</p>
              <p className="leading-relaxed">
                Monopic은 AI 이미지가 완벽하게 생성되어 다운로드 가능한 상태로 전달되었을 때만 크레딧을 차감합니다. 서버 장애, 네트워크 끊김, AI 모델 연산 타임아웃 등의 시스템 오류 발생 시 **크레딧은 차감되지 않고 100% 자동 보존**됩니다.
              </p>
            </div>
            <p className="text-slate-600">
              만약 예상치 못한 시스템 결함으로 결과물이 정상 전달되지 않았음에도 크레딧이 소모된 경우, 고객센터로 문의하시면 확인 즉시 크레딧을 무상 재충전해 드리거나 결제 금액을 환불 처리해 드립니다.
            </p>
          </section>

          {/* 3. 환불 신청 및 처리 절차 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">3.</span> 환불 신청 방법 (How to Request a Refund)
            </h2>
            <p className="mb-3 text-slate-600">
              신속한 환불 처리를 위해 아래 정보를 포함하여 공식 고객센터로 이메일을 보내주시거나 앱 내 피드백 모달을 이용해 주시기 바랍니다.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm space-y-2 text-slate-700">
              <p><strong>1. 담당자 및 소재지</strong>: Yunwoo Park (박윤우) / 56, Jeonmin-ro 38beon-gil, Yuseong-gu, Daejeon, Republic of Korea (대전광역시 유성구 전민로38번길 56)</p>
              <p><strong>2. 접수 이메일</strong>: <a href="mailto:majicboy56575@gmail.com" className="text-indigo-600 font-bold hover:underline">majicboy56575@gmail.com</a></p>
              <p><strong>3. 필수 기재 사항</strong>: 결제 시 사용한 이메일 주소, 결제 주문번호(주문 ID/영수증 번호), 환불 요청 사유</p>
              <p><strong>4. 처리 기간</strong>: 접수 후 <strong>24시간 이내</strong> 환불 승인 처리되며, 카드사/은행에 따라 영업일 기준 3~5일 이내 계좌로 환불 입금 완료됩니다.</p>
            </div>
          </section>

          {/* 4. 결제 분쟁 및 차지백 방지 안내 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">4.</span> 분쟁 해결 및 고객 지원 (Customer Support & Dispute Resolution)
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Monopic은 모든 고객의 불편 사항을 신속하고 원만하게 해결하고자 최선을 다하고 있습니다. 카드사를 통한 결제 분쟁(Chargeback) 신청 전에 저희 고객센터로 먼저 연락 주시면 가장 빠르고 친절하게 전액 환불 및 보상 처리를 도와드립니다.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Monopic. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">이용약관</Link>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">개인정보처리방침</Link>
            <Link href="/refund" className="text-indigo-600 font-bold">환불정책</Link>
            <Link href="/pricing" className="hover:text-indigo-600 transition-colors">요금제</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
