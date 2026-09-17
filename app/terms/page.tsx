"use client";

import Link from "next/link";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../lib/i18n/LanguageContext";

export default function TermsPage() {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 mb-3 shadow-sm">
            <span>📜</span>
            <span>Terms of Service</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
            서비스 이용약관 (Terms of Service)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            최종 수정일: 2026년 9월 16일 (Effective Date: September 16, 2026)
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xl shadow-slate-200/50 space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* 1. 서비스 소개 및 동의 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">1.</span> 목적 및 약관의 동의 (Acceptance of Terms)
            </h2>
            <p>
              본 이용약관(이하 &quot;약관&quot;)은 <strong>Monopic</strong>(이하 &quot;회사&quot; 또는 &quot;서비스&quot;)이 제공하는 AI 기반 프로필 사진 및 스튜디오 포트레이트 생성 소프트웨어 서비스의 이용 조건 및 절차, 권리 및 의무 사항을 규정합니다. 이용자가 서비스에 접속하거나 결제 및 크레딧을 이용하는 것은 본 약관에 동의하는 것으로 간주됩니다.
            </p>
          </section>

          {/* 2. 서비스 정의 및 소프트웨어 라이선스 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">2.</span> 서비스 내용 및 제공 (Software as a Service)
            </h2>
            <p className="mb-2">
              Monopic은 사용자가 업로드한 인물 사진을 기반으로 비즈니스 프로필, 증명사진, 여권사진 규격 시트 및 스튜디오 스타일의 고화질 이미지를 생성하는 클라우드 기반 <strong>디지털 소프트웨어(SaaS)</strong>입니다.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>디지털 상품(크레딧)은 구매 완료 즉시 계정에 반영되며, AI 이미지 연산은 요청 후 약 10~30초 내에 실시간 디지털 결과물로 제공됩니다.</li>
              <li>사용자는 단일 구매(One-time Purchase)를 통해 원하는 수량의 크레딧을 충전하여 이용할 수 있습니다.</li>
            </ul>
          </section>

          {/* 3. AI 허용 가능한 사용 정책 (AUP) - 심사 핵심 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">3.</span> AI 윤리 및 사용 정책 (Acceptable Use Policy & Anti-Deepfake)
            </h2>
            <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl mb-3 text-amber-950 text-xs sm:text-sm">
              <p className="font-bold mb-1">⚠️ 엄격한 윤리적 AI 사용 기준 준수 의무</p>
              <p className="leading-relaxed">
                Monopic은 안전하고 건전한 개인 프로필 사진 및 비즈니스 초상 제작을 위해서만 사용되어야 합니다. 아래의 금지 행위 적발 시 사전 경고 없이 즉시 계정이 영구 정지되며 사법 기관에 고발 조치될 수 있습니다.
              </p>
            </div>
            <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600">
              <li><strong>타인 사칭 및 비동의 합성(Non-consensual Deepfake) 금지</strong>: 본인의 사진 또는 명시적 서면 동의를 얻은 인물의 사진만 업로드할 수 있으며, 타인을 기망하거나 사칭할 목적의 생성을 엄격히 금지합니다.</li>
              <li><strong>성인물 및 음란물(NSFW) 금지</strong>: 누드, 성적 묘사, 폭력적이거나 혐오감을 유발하는 이미지 생성 시도는 시스템에 의해 차단됩니다.</li>
              <li><strong>미성년자 보호</strong>: 미성년자를 대상으로 한 부적절한 이미지 생성 시도는 즉시 엄격 차단됩니다.</li>
              <li><strong>유명인 및 저작권 침해 금지</strong>: 타인의 초상권, 저작권, 상표권을 침해하는 이미지를 무단 생성하거나 배포할 수 없습니다.</li>
            </ul>
          </section>

          {/* 4. 저작권 및 상업적 이용 권리 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">4.</span> 지식재산권 및 상업적 권리 (Intellectual Property & Commercial Rights)
            </h2>
            <p className="mb-2">
              이용자가 Monopic을 통해 유료 크레딧으로 정상 생성한 결과물에 대한 권리는 다음과 같이 보장됩니다:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li><strong>사용자 소유권 및 상업적 이용</strong>: 사용자는 생성된 고화질 결과물을 이력서, 링크드인, 소셜 미디어, 웹사이트, 개인 홍보물 등 상업적/비상업적 목적으로 자유롭게 다운로드하고 활용할 수 있습니다.</li>
              <li><strong>원본 데이터 보호</strong>: 이용자가 업로드한 원본 사진에 대한 소유권은 이용자에게 있으며, 회사는 이를 AI 모델 학습에 사용하지 않습니다.</li>
            </ul>
          </section>

          {/* 5. 결제, 환불 및 크레딧 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">5.</span> 결제 및 환불 규정 (Payment & Refund Terms)
            </h2>
            <p className="mb-2">
              결제는 신뢰할 수 있는 글로벌 결제 대행사(Merchant of Record)를 통해 안전하게 처리됩니다. 상세한 환불 조건은 별도의 <Link href="/refund" className="text-indigo-600 font-bold underline hover:text-indigo-800">환불 정책(Refund Policy)</Link>에 따릅니다.
            </p>

            {/* Paddle & MoR Reseller Official Disclosure */}
            <div className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl text-xs text-slate-600 my-3">
              <p className="font-bold text-slate-800 mb-1">💳 Reseller & Merchant of Record Notice</p>
              <p className="leading-relaxed">
                Our order process is conducted by our online reseller Paddle.com (and authorized Merchant of Record partners). Paddle.com is the Merchant of Record for all our orders. Paddle provides customer service inquiries and handles returns.
              </p>
            </div>

            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li><strong>14일 환불 보장</strong>: 구매 후 14일 이내이며 크레딧을 사용하지 않은 경우 100% 전액 환불이 가능합니다.</li>
              <li><strong>AI 연산 실패 보증</strong>: 기술적 오류나 서버 장애로 인해 생성이 실패한 경우 크레딧이 차감되지 않으며, 고객 요청 시 즉시 무상 재충전 또는 환불을 지원합니다.</li>
            </ul>

            {/* Quality Assurance & Satisfaction Guarantee — Critical for MoR compliance */}
            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/80 p-4 rounded-2xl mt-4 text-xs sm:text-sm text-amber-950">
              <p className="font-bold mb-2 text-base">✨ Quality Assurance & 100% Satisfaction Guarantee</p>
              <p className="leading-relaxed mb-2">
                Monopic is committed to ensuring every customer is fully satisfied with their AI-generated results. To eliminate the need for payment disputes (chargebacks), the following in-app satisfaction measures are provided:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><strong>1-Click Free Regeneration</strong>: If the AI-generated result does not meet the customer&apos;s expectations, a one-time free regeneration is available at no additional credit cost. This allows the customer to immediately obtain an improved result without financial loss.</li>
                <li><strong>In-App Instant Dispute Resolution</strong>: Customers can submit feedback or complaints directly within the application. All quality-related issues are resolved within 24 hours via credit restoration or full refund.</li>
                <li><strong>Zero-Dispute Policy</strong>: These built-in safeguards ensure that customers never need to initiate a chargeback with their card issuer. Monopic proactively resolves all dissatisfaction before it escalates to a payment dispute.</li>
              </ul>
            </div>
          </section>

          {/* 6. 고객 지원 및 분쟁 해결 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">6.</span> 고객 지원 및 문의 (Customer Support & Contact)
            </h2>
            <p className="mb-3">
              서비스 이용, 결제 분쟁, 약관 관련 문의는 아래 공식 고객센터로 접수해 주시면 영업일 기준 24시간 이내에 신속하게 처리해 드립니다.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm space-y-1.5 text-slate-700">
              <p>• <strong>서비스명 (Service)</strong>: Monopic</p>
              <p>• <strong>운영자 / 대표 (Operator)</strong>: Yunwoo Park (박윤우)</p>
              <p>• <strong>소재지 (Address)</strong>: 56, Jeonmin-ro 38beon-gil, Yuseong-gu, Daejeon, Republic of Korea (대전광역시 유성구 전민로38번길 56)</p>
              <p>• <strong>고객 지원 이메일 (Support)</strong>: <a href="mailto:majicboy56575@gmail.com" className="text-indigo-600 font-bold hover:underline">majicboy56575@gmail.com</a></p>
              <p>• <strong>응답 시간 (SLA)</strong>: 연중무휴 24시간 이내 회신 (Response within 24 hours)</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Monopic. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-indigo-600 font-bold">이용약관</Link>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">개인정보처리방침</Link>
            <Link href="/refund" className="hover:text-indigo-600 transition-colors">환불정책</Link>
            <Link href="/pricing" className="hover:text-indigo-600 transition-colors">요금제</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
