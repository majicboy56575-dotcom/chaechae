"use client";

import Link from "next/link";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../lib/i18n/LanguageContext";

export default function PrivacyPage() {
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
            <span>🔒</span>
            <span>Privacy & Data Policy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
            개인정보처리방침 (Privacy Policy)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            최종 수정일: 2026년 9월 16일 (Effective Date: September 16, 2026)
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xl shadow-slate-200/50 space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* 1. 개요 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">1.</span> 개요 (Overview)
            </h2>
            <p>
              <strong>Monopic</strong> (이하 &quot;서비스&quot;)은 이용자의 개인정보 및 프라이버시를 매우 중요하게 생각하며, 관련 개인정보보호 법령(GDPR, CCPA 등) 및 결제 규정을 철저히 준수합니다. 본 방침은 서비스 이용 시 수집되는 정보, 이용 목적, 안전한 데이터 암호화 및 영구 파기 절차를 명확히 안내합니다.
            </p>
          </section>

          {/* 2. 수집하는 정보 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">2.</span> 수집하는 정보 항목 (Information We Collect)
            </h2>
            <p className="mb-2">서비스는 정상적인 AI 프로필 생성을 위해 최소한의 정보만을 처리합니다:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>
                <strong>인증 정보</strong>: Google 간편 로그인 시 제공되는 기본 프로필 (이름, 이메일 주소, 프로필 이미지 URL, 고유 UID)
              </li>
              <li>
                <strong>사용자 업로드 이미지</strong>: AI 프로필 및 증명사진 생성을 위해 이용자가 직접 업로드한 셀카 및 인물 사진 (생성 직후 즉시 파기)
              </li>
              <li>
                <strong>결제 정보</strong>: 결제 승인 번호, 구매 플랜 및 크레딧 충전 내역 (신용카드 번호 등 모든 금융 정보는 글로벌 MoR 결제사(LemonSqueezy, Paddle, PayPal)에서 안전하게 암호화 처리되며 Monopic 서버에 절대 저장되지 않습니다)
              </li>
              <li>
                <strong>서비스 이용 기록</strong>: 로컬 브라우저 세션에 저장되는 잔여 크레딧 수량 및 언어 설정
              </li>
            </ul>
          </section>

          {/* 3. AI 데이터 보호 및 비학습 원칙 (심사 핵심) */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">3.</span> AI 데이터 보호 및 무단 학습 금지 (Zero AI Training & Instant Purge)
            </h2>
            <div className="bg-indigo-50/70 border border-indigo-200/80 p-5 rounded-2xl space-y-2">
              <p className="font-extrabold text-indigo-950 text-sm sm:text-base flex items-center gap-2">
                <span>🛡️</span> 이용자 사진에 대한 무단 학습 절대 금지 (Zero-Training Guarantee)
              </p>
              <p className="text-xs sm:text-sm text-indigo-900/90 leading-relaxed">
                이용자가 업로드한 원본 사진과 생성된 결과물은 <strong>AI 기초 모델 훈련(Training) 데이터셋으로 절대 수집, 재사용, 공유, 판매되지 않습니다.</strong> 업로드된 사진은 실시간 인스턴스 메모리에서 변환 연산이 끝나는 즉시 영구적으로 파기(Purged)됩니다.
              </p>
            </div>
          </section>

          {/* 4. 개인정보의 이용 목적 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">4.</span> 개인정보의 이용 목적 (Purpose of Use)
            </h2>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>사용자가 요청한 고화질 인물 사진, 증명사진 및 여권 규격 시트 실시간 변환 및 생성</li>
              <li>계정 로그인 유지 및 구매한 크레딧의 안전한 충전/차감 관리</li>
              <li>고객 환불 요청 및 기술 지원 문의 응대</li>
            </ul>
          </section>

          {/* 5. 신뢰할 수 있는 제3자 서비스 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">5.</span> 제3자 서비스 및 결제 위탁 (Third-Party Providers)
            </h2>
            <p className="mb-2">서비스는 최고 수준의 보안을 보장하기 위해 검증된 글로벌 인프라를 사용합니다:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li><strong>Google Cloud & Firebase</strong>: 안전한 사용자 인증 및 글로벌 클라우드 호스팅</li>
              <li><strong>Google Gemini API</strong>: 암호화된 AI 스타일 렌더링 파이프라인</li>
              <li><strong>LemonSqueezy / Paddle / PayPal</strong>: 글로벌 표준 PCI-DSS 규격을 준수하는 안전한 결제 처리</li>
            </ul>
          </section>

          {/* 6. 이용자의 권리 및 데이터 삭제 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">6.</span> 이용자의 권리 및 계정 삭제 요청 (User Rights & Deletion)
            </h2>
            <p className="text-slate-600 leading-relaxed">
              이용자는 언제든지 자신의 계정 정보 열람, 수정, 데이터 완전 삭제를 요구할 수 있습니다. 아래 고객센터 이메일로 계정 삭제를 요청하시면 지체 없이 모든 관련 기록을 영구 파기합니다.
            </p>
          </section>

          {/* 7. 개인정보 보호 문의처 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">7.</span> 고객 지원 및 문의처 (Contact Information)
            </h2>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm space-y-1.5 text-slate-700">
              <p>• <strong>서비스명 (Service)</strong>: Monopic</p>
              <p>• <strong>운영자 / 개인정보 보호책임자 (Operator)</strong>: Yunwoo Park (박윤우)</p>
              <p>• <strong>소재지 (Address)</strong>: 56, Jeonmin-ro 38beon-gil, Yuseong-gu, Daejeon, Republic of Korea (대전광역시 유성구 전민로38번길 56)</p>
              <p>• <strong>고객 지원 / 문의 이메일 (Support)</strong>: <a href="mailto:majicboy56575@gmail.com" className="text-indigo-600 font-bold hover:underline">majicboy56575@gmail.com</a></p>
              <p>• <strong>응답 시간 (SLA)</strong>: 24시간 이내 회신 (Response within 24 hours)</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Monopic. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">이용약관</Link>
            <Link href="/privacy" className="text-indigo-600 font-bold">개인정보처리방침</Link>
            <Link href="/refund" className="hover:text-indigo-600 transition-colors">환불정책</Link>
            <Link href="/pricing" className="hover:text-indigo-600 transition-colors">요금제</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
