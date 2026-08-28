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
            <span>Privacy Policy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
            개인정보처리방침 (Privacy Policy)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            최종 수정일: 2026년 8월 28일 (Effective Date: August 28, 2026)
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
              <strong>Monopic</strong> (이하 &quot;서비스&quot;)은 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 및 Google Play의 사용자 데이터 정책 등 관련 법령을 준수합니다. 본 개인정보처리방침은 서비스 이용 시 수집되는 정보, 이용 목적, 보관 및 파기 절차 등에 대해 설명합니다.
            </p>
          </section>

          {/* 2. 수집하는 개인정보 항목 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">2.</span> 수집하는 개인정보 항목 (Information We Collect)
            </h2>
            <p className="mb-2">서비스는 원활한 기능 제공을 위해 다음과 같은 최소한의 정보를 수집 및 처리합니다:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>
                <strong>회원 인증 정보</strong>: Google 로그인 시 제공되는 기본 프로필 (이름, 이메일 주소, 프로필 이미지 URL, 고유 계정 ID)
              </li>
              <li>
                <strong>사용자 업로드 이미지</strong>: AI 프로필 및 증명사진 생성을 위해 이용자가 직접 업로드한 셀카 및 인물 사진
              </li>
              <li>
                <strong>결제 및 거래 정보</strong>: PayPal 결제 승인 번호, 결제 금액, 구매한 크레딧 내역 (신용카드 번호 등 금융 정보는 PayPal에서 직접 암호화 처리되며 Monopic 서버에 저장되지 않습니다)
              </li>
              <li>
                <strong>서비스 이용 기록</strong>: 브라우저 로컬 저장소(LocalStorage)에 저장되는 일일 무료 사용 횟수, 크레딧 잔여량, 언어 설정
              </li>
            </ul>
          </section>

          {/* 3. 개인정보의 이용 목적 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">3.</span> 개인정보의 이용 목적 (Purpose of Collection)
            </h2>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>Google Gemini AI 기반의 고해상도 인물 사진, 증명사진 및 여권사진 규격 시트 변환 및 생성</li>
              <li>Google 계정을 통한 본인 확인 및 서비스 로그인 상태 유지</li>
              <li>구매한 크레딧의 지급, 관리 및 사용 차감 처리</li>
              <li>서비스 오작동 방지, 고객 문의 대응 및 이용 환경 최적화</li>
            </ul>
          </section>

          {/* 4. 사진 데이터 처리 및 파기 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">4.</span> 사진 데이터의 안전한 처리 및 즉시 파기 (Photo Processing & Deletion)
            </h2>
            <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl">
              <p className="font-bold text-indigo-950 mb-1">📸 이미지 데이터 보호 정책</p>
              <p className="text-xs text-indigo-900/80 leading-relaxed">
                이용자가 업로드한 원본 사진 및 생성된 AI 이미지는 생성 요청 처리 시간 동안에만 임시로 처리되며, **서버에 영구적으로 보관하거나 AI 모델 학습용으로 재사용하지 않습니다.** 생성된 이미지는 이용자가 직접 기기에 다운로드받을 수 있도록 브라우저 세션에 즉시 전달된 후 안전하게 소멸됩니다.
              </p>
            </div>
          </section>

          {/* 5. 제3자 서비스 제공 및 위탁 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">5.</span> 제3자 서비스 및 데이터 위탁 (Third-Party Services)
            </h2>
            <p className="mb-2">서비스는 기능 구현을 위해 다음과 같은 신뢰할 수 있는 글로벌 제3자 플랫폼을 사용합니다:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li><strong>Google Firebase</strong>: 사용자 인증 및 기본 세션 관리</li>
              <li><strong>Google Gemini API</strong>: AI 이미지 생성 및 스타일 변환 연산</li>
              <li><strong>PayPal</strong>: 안전한 온라인 결제 및 거래 처리</li>
            </ul>
          </section>

          {/* 6. 이용자의 권리 및 탈퇴 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">6.</span> 이용자의 권리 및 데이터 삭제 (User Rights & Choices)
            </h2>
            <p>
              이용자는 언제든지 자신의 개인정보 열람, 정정 및 계정 연동 해제, 데이터 삭제를 요구할 수 있습니다. 브라우저 캐시 및 LocalStorage 삭제 시 로컬에 저장된 이용 기록은 즉시 제거됩니다. 영구적인 계정 정보 삭제를 원하실 경우 아래 지원 이메일로 요청하시면 지체 없이 파기합니다.
            </p>
          </section>

          {/* 7. 개인정보 보호 책임자 및 문의처 */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="text-indigo-600 font-extrabold">7.</span> 개인정보 보호 책임자 및 문의처 (Contact Us)
            </h2>
            <p className="mb-3">
              개인정보 보호 관련 문의사항이나 불만 처리, 의견은 아래의 연락처로 문의해 주시기 바랍니다.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm space-y-1 text-slate-700">
              <p>• <strong>서비스명</strong>: Monopic</p>
              <p>• <strong>담당자 / 고객 지원 이메일</strong>: <a href="mailto:support@monopic.app" className="text-indigo-600 font-bold hover:underline">support@monopic.app</a> (또는 관리자 이메일)</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 Monopic. All rights reserved.</p>
      </footer>
    </div>
  );
}
