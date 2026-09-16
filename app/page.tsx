"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import UploadCard from "./components/UploadCard";
import LanguageSelector from "./components/LanguageSelector";
import FeedbackModal from "./components/FeedbackModal";
import { useTranslation } from "./lib/i18n/LanguageContext";
import { CATEGORIES, STYLES } from "./lib/styles";
import { getTotalAvailableCredits, PRICING_PLANS } from "./lib/pricing";
import { useAuth } from "./lib/auth/AuthContext";
import { useInstallApp } from "./lib/useInstallApp";

export default function Home() {
  const { t } = useTranslation();
  const [currentCredits, setCurrentCredits] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loginWithGoogle, logout, loading } = useAuth();
  const { canInstall, triggerInstall, showIOSGuide, setShowIOSGuide } = useInstallApp();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    setCurrentCredits(getTotalAvailableCredits());
    const handleUpdate = () => setCurrentCredits(getTotalAvailableCredits());
    window.addEventListener("chae_chae_credits_updated", handleUpdate);
    return () => window.removeEventListener("chae_chae_credits_updated", handleUpdate);
  }, []);

  const scrollToUpload = () => {
    const element = document.getElementById("upload-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50/40 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-200/20 to-purple-200/20 blur-3xl opacity-75" />
        <div className="absolute top-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rose-100/30 to-amber-100/20 blur-3xl opacity-60" />
        <div className="absolute bottom-[10%] left-[20%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-sky-100/30 to-indigo-100/20 blur-3xl opacity-50" />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-950 font-outfit whitespace-nowrap">
                Monopic
              </span>
              <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse flex-shrink-0" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">
              {t("nav_how_it_works")}
            </a>
            <a href="#showcase" className="hover:text-indigo-600 transition-colors">
              {t("nav_showcase")}
            </a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-bold text-indigo-600">
              <span>💳</span> {t("nav_pricing")}
            </a>
            <a href="#safety" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
              <span>🛡️</span> AI 윤리·안전
            </a>
            {canInstall && (
              <button
                onClick={triggerInstall}
                className="hover:text-indigo-600 transition-colors flex items-center gap-1"
              >
                <span>📲</span> {t("install_btn")}
              </button>
            )}
          </nav>
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            <LanguageSelector />
            <div className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100/80 text-xs font-bold text-indigo-700 whitespace-nowrap flex-shrink-0">
              <span className="hidden sm:inline">{t("nav_credits")}:</span>
              <span className="sm:hidden">🪙</span>
              <span className="bg-indigo-600 text-white px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] flex-shrink-0 font-extrabold">
                {currentCredits}
              </span>
            </div>
            <Link
              href="/pricing"
              className="hidden md:inline-flex text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-3 py-2 rounded-xl transition-all whitespace-nowrap flex-shrink-0"
            >
              {t("nav_recharge")}
            </Link>
            {loading ? (
              <div className="hidden md:block w-8 h-8 rounded-full border border-indigo-100 bg-indigo-50 animate-pulse flex-shrink-0" />
            ) : user ? (
              <div className="hidden md:flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-8 h-8 rounded-full border border-indigo-200 object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full border border-indigo-200 bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold font-outfit flex-shrink-0">
                    {user.displayName ? user.displayName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "U"}
                  </div>
                )}
                <button
                  onClick={logout}
                  className="hidden md:inline-flex text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 px-3 py-2 rounded-xl transition-all whitespace-nowrap flex-shrink-0"
                >
                  {t("nav_logout")}
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-2.5 py-2 sm:px-3.5 rounded-xl transition-all shadow-sm active:scale-[0.98] whitespace-nowrap flex-shrink-0"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.327 2.68 1.386 6.582L5.266 9.765z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 15.345c-1.127.755-2.545 1.2-4.04 1.2a7.07 7.07 0 0 1-6.734-4.855L1.38 14.873C3.32 18.79 7.33 21.5 12 21.5c3.155 0 6.018-1.073 8.082-2.909l-4.042-3.246z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.273c0-.773-.073-1.527-.2-2.273H12v4.51h6.464a5.527 5.527 0 0 1-2.4 3.636l4.043 3.246c2.363-2.173 3.73-5.382 3.73-9.119z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.266 11.735a7.07 7.07 0 0 1 0-1.97L1.38 6.582A11.956 11.956 0 0 0 0 12c0 1.927.455 3.745 1.266 5.373l3.99-3.136a7.077 7.077 0 0 1 0-2.502z"
                  />
                </svg>
                <span className="hidden sm:inline">{t("nav_login")}</span>
              </button>
            )}
            <button
              onClick={scrollToUpload}
              className="hidden md:inline-flex bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-slate-950/5 active:scale-[0.98] whitespace-nowrap flex-shrink-0"
            >
              {t("nav_start")}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-indigo-600 transition-colors md:hidden flex-shrink-0"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-6 py-5 flex flex-col gap-4 shadow-xl animate-fade-in">
            <nav className="flex flex-col gap-3 text-sm font-bold text-slate-700">
              <a
                href="#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-indigo-600 transition-colors py-2 border-b border-slate-50"
              >
                {t("nav_how_it_works")}
              </a>
              <a
                href="#showcase"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-indigo-600 transition-colors py-2 border-b border-slate-50"
              >
                {t("nav_showcase")}
              </a>
              <a
                href="#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-indigo-600 transition-colors py-2 border-b border-slate-50 flex items-center gap-1.5 font-bold text-indigo-600"
              >
                <span>💳</span> {t("nav_pricing")}
              </a>
              <a
                href="#safety"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-indigo-600 transition-colors py-2 border-b border-slate-50 flex items-center gap-1.5 font-bold text-slate-700"
              >
                <span>🛡️</span> AI 윤리·안전
              </a>
              {canInstall && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    triggerInstall();
                  }}
                  className="hover:text-indigo-600 transition-colors py-2 border-b border-slate-50 flex items-center gap-1.5 text-left"
                >
                  <span>📲</span> {t("install_btn")}
                </button>
              )}
            </nav>

            <div className="h-px bg-slate-100 my-1" />

            {loading ? (
              <div className="w-8 h-8 rounded-full border border-indigo-100 bg-indigo-50 animate-pulse" />
            ) : user ? (
              <div className="flex items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2.5 min-w-0">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="w-9 h-9 rounded-full border border-indigo-200 object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full border border-indigo-200 bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold font-outfit flex-shrink-0">
                      {user.displayName ? user.displayName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "U"}
                    </div>
                  )}
                  <div className="text-left min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{user.displayName || user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 px-3 py-2 rounded-xl transition-all whitespace-nowrap bg-white flex-shrink-0"
                >
                  {t("nav_logout")}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  loginWithGoogle();
                }}
                className="inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 w-full py-3 rounded-xl transition-all shadow-sm active:scale-[0.98]"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.327 2.68 1.386 6.582L5.266 9.765z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 15.345c-1.127.755-2.545 1.2-4.04 1.2a7.07 7.07 0 0 1-6.734-4.855L1.38 14.873C3.32 18.79 7.33 21.5 12 21.5c3.155 0 6.018-1.073 8.082-2.909l-4.042-3.246z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.273c0-.773-.073-1.527-.2-2.273H12v4.51h6.464a5.527 5.527 0 0 1-2.4 3.636l4.043 3.246c2.363-2.173 3.73-5.382 3.73-9.119z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.266 11.735a7.07 7.07 0 0 1 0-1.97L1.38 6.582A11.956 11.956 0 0 0 0 12c0 1.927.455 3.745 1.266 5.373l3.99-3.136a7.077 7.077 0 0 1 0-2.502z"
                  />
                </svg>
                <span>{t("nav_login")}</span>
              </button>
            )}
          </div>
        )}
      </header>

      {/* iOS Install Guide Modal */}
      {showIOSGuide && (
        <div
          className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-3xl p-6 pb-10 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">
                {t("install_ios_title")}
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{t("install_ios_step1")}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t("install_ios_step1_desc")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{t("install_ios_step2")}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t("install_ios_step2_desc")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{t("install_ios_step3")}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t("install_ios_step3_desc")}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="px-5 py-2.5 rounded-xl bg-slate-100 flex items-center gap-2 text-sm text-slate-600 animate-bounce-gentle">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>
                <span className="font-medium">{t("install_ios_share_hint")}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-32 md:pb-20 px-6 max-w-7xl mx-auto text-center">
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100/80 mb-8 animate-fade-in shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          {t("hero_badge")}
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto text-balance">
          {t("hero_title_1")}<br className="hidden sm:inline" />{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">
            {t("hero_title_2")}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-8 leading-relaxed text-balance">
          {t("hero_subtitle")}
        </p>

        {/* Category chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.id}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/80 text-slate-600 border border-slate-200/80 shadow-sm"
            >
              {cat.emoji} {t(`cat_${cat.id}` as keyof typeof import("./lib/i18n/translations").translations.ko) || cat.label}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-sm">
            {t("hero_chip_print")}
          </span>
        </div>

        {/* Primary CTA button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={scrollToUpload}
            className="group relative inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg px-8 py-4.5 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-950/10 hover:shadow-2xl hover:shadow-indigo-500/20 active:scale-[0.98] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("hero_cta")}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <span className="text-xs text-slate-400 font-semibold tracking-wide">
            {t("hero_badge_bottom")}
          </span>
        </div>
      </section>

      {/* Before-After Showcase Section */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="relative bg-white/60 backdrop-blur-md rounded-3xl border border-slate-100/80 p-6 sm:p-10 md:p-12 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Before Card */}
          <div className="w-full md:w-5/12 flex flex-col items-center">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-md border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <Image
                src="/images/selfie_before.png"
                alt="Before Selfie"
                fill
                sizes="(max-width: 768px) 240px, 288px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-3 left-3 bg-rose-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {t("showcase_before_badge")}
              </div>
            </div>
          </div>

          {/* Connection Indicator */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 shadow-md text-indigo-600 animate-bounce">
              <svg className="w-6 h-6 rotate-90 md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
            <span className="text-[10px] font-extrabold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Monopic AI
            </span>
          </div>

          {/* After Card */}
          <div className="w-full md:w-5/12 flex flex-col items-center">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-300 ring-4 ring-indigo-500/5">
              <Image
                src="/images/profile_after.png"
                alt="After Headshot"
                fill
                sizes="(max-width: 768px) 240px, 288px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-3 left-3 bg-indigo-600/95 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {t("showcase_after_badge")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload & Style Selection Section */}
      <section id="upload-section" className="max-w-5xl mx-auto px-6 pb-24 scroll-mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            {t("upload_title")}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto">
            {t("upload_subtitle")}
          </p>
        </div>
        <UploadCard />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-slate-100/40 border-y border-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4 sm:text-4xl">
              {t("how_title")}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              {t("how_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-slate-100/80 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xl mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t("step1_title")}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {t("step1_desc")}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border border-slate-100/80 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xl mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t("step2_title")}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {t("step2_desc")}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border border-slate-100/80 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xl mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t("step3_title")}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {t("step3_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Style Gallery / Showcase Section */}
      <section id="showcase" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4 sm:text-4xl">
            {t("showcase_section_title")}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            {t("showcase_section_subtitle")}
          </p>
        </div>

        {/* Full style lineup */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-16">
          {STYLES.map((style) => (
            <div
              key={style.id}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5 transition-all flex flex-col items-center text-center"
            >
              <span className="text-3xl mb-2">{style.emoji}</span>
              <span className="text-sm font-bold text-slate-800 leading-tight">
                {t(`style_${style.id}` as keyof typeof import("./lib/i18n/translations").translations.ko) || style.label}
              </span>
              <span className="text-[11px] text-slate-400 font-medium mt-1 leading-tight">
                {t(`style_${style.id}_desc` as keyof typeof import("./lib/i18n/translations").translations.ko) || style.description}
              </span>
            </div>
          ))}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-4 shadow-md flex flex-col items-center justify-center text-center text-white">
            <span className="text-3xl mb-2">✍️</span>
            <span className="text-sm font-bold leading-tight">{t("style_custom_title")}</span>
            <span className="text-[11px] text-indigo-100 font-medium mt-1 leading-tight">
              {t("style_custom_desc")}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Woman Showcase Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[280px] rounded-2xl overflow-hidden mb-6 shadow-inner">
              <Image
                src="/images/profile_woman.png"
                alt="Woman Business Profile"
                fill
                sizes="(max-width: 768px) 280px, 280px"
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {t("woman_tag")}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-4">{t("woman_title")}</h3>
              <p className="text-slate-500 text-xs mt-1 px-4">
                {t("woman_desc")}
              </p>
            </div>
          </div>

          {/* Man Showcase Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[280px] rounded-2xl overflow-hidden mb-6 shadow-inner">
              <Image
                src="/images/profile_after.png"
                alt="Man Business Profile"
                fill
                sizes="(max-width: 768px) 280px, 280px"
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {t("man_tag")}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-4">{t("man_title")}</h3>
              <p className="text-slate-500 text-xs mt-1 px-4">
                {t("man_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section on Landing Page */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100/80 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3 shadow-sm">
            <span>💳</span>
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            합리적인 1회성 요금제 (No Subscription)
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            매달 자동 결제되는 번거로운 구독이 아닙니다. 필요한 수량만 1회 결제하여 원할 때 언제든 평생 사용하세요.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-10">
          {PRICING_PLANS.map((plan) => {
            const isPop = plan.isPopular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 transition-all flex flex-col justify-between ${
                  isPop
                    ? "bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-600/10 ring-4 ring-indigo-50 md:-translate-y-2"
                    : "bg-white border border-slate-200/80 shadow-sm hover:shadow-md"
                }`}
              >
                {plan.discountBadge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20 whitespace-nowrap">
                    {plan.discountBadge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <h3 className="font-extrabold text-lg text-slate-900 font-outfit">
                      {plan.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-50 text-indigo-700">
                      +{plan.count}장
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-outfit">
                        {plan.priceStr}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ 1회 결제</span>
                    </div>
                    <p className="text-xs font-bold text-emerald-600 mt-1">
                      장당 {plan.perPhoto}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  <div className="space-y-2.5 mb-8 pt-4 border-t border-slate-100 text-xs text-slate-600">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/pricing?plan=${plan.id}`}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-center transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                    isPop
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  <span>충전하기</span>
                  <span>→</span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Guarantees on Landing Page */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-2.5">
            <span className="text-lg">🛡️</span>
            <div>
              <h5 className="font-bold text-xs text-emerald-950">14일 안심 환불 보장</h5>
              <p className="text-[10.5px] text-emerald-800 leading-tight mt-0.5">
                미사용 크레딧 100% 무조건 환불
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center gap-2.5">
            <span className="text-lg">⚡</span>
            <div>
              <h5 className="font-bold text-xs text-indigo-950">즉시 디지털 배송</h5>
              <p className="text-[10.5px] text-indigo-800 leading-tight mt-0.5">
                AI 연산 약 30초 내 실시간 제공
              </p>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-2.5">
            <span className="text-lg">🔒</span>
            <div>
              <h5 className="font-bold text-xs text-purple-950">256-bit 안전 결제</h5>
              <p className="text-[10.5px] text-purple-800 leading-tight mt-0.5">
                카드 · Apple/Google Pay 지원
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Ethics, Safety & Privacy Section on Landing Page */}
      <section id="safety" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-100/80 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3 shadow-sm">
            <span>🛡️</span>
            <span>AI Ethics & Safety Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            안전하고 신뢰할 수 있는 AI 스튜디오
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Monopic은 건전한 비즈니스 프로필 생성을 위해 엄격한 AI 윤리 규범(AUP)과 글로벌 개인정보 보호 기준을 철저히 준수합니다.
          </p>
        </div>

        {/* 4 Core Safety Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl mb-5">
              🚫
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              타인 사칭 및 비동의 딥페이크 엄격 금지 (Anti-Deepfake)
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              본인 또는 정당한 서면 동의를 얻은 인물의 사진만 업로드할 수 있습니다. 타인을 사칭하거나 기망할 목적의 악의적 얼굴 합성은 엄격히 금지되며, 적발 시 계정이 즉시 영구 정지됩니다.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-5">
              🔞
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              성인물(NSFW) 및 유해 콘텐츠 원천 차단 (Zero-Tolerance NSFW)
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              누드, 음란물, 성적 묘사 및 폭력적·혐오적 이미지 생성 시도는 인공지능 안전 필터링 시스템에 의해 사전 자동 차단됩니다. 미성년자를 대상으로 한 유해 이미지 생성은 절대 불가능합니다.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mb-5">
              🔒
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              AI 모델 무단 학습 절대 금지 (Zero AI Training & Instant Purge)
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              이용자가 업로드한 원본 사진은 AI 모델 훈련(Training) 데이터셋으로 절대 수집, 재사용, 판매되지 않습니다. 연산 완료 즉시 서버 메모리에서 안전하게 영구 파기됩니다.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-5">
              💼
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              100% 상업적 이용 권리 보장 (Commercial IP Rights)
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              유료 크레딧으로 정상 생성된 모든 고화질 결과물의 소유권은 이용자에게 귀속됩니다. 이력서, 링크드인, 웹사이트, 개인 홍보물 등 상업적/비상업적 목적으로 자유롭게 다운로드하고 활용하실 수 있습니다.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-400 mb-3">
            더 자세한 정책 규정은 공식 법적 문서를 확인해 주세요:
          </p>
          <div className="inline-flex items-center gap-4 text-xs font-bold text-indigo-600">
            <Link href="/terms" className="hover:underline flex items-center gap-1">
              <span>📜</span> 이용약관 (Terms of Service) →
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/privacy" className="hover:underline flex items-center gap-1">
              <span>🔒</span> 개인정보처리방침 (Privacy Policy) →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-16 text-center shadow-2xl overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500 rounded-full blur-[80px] opacity-35" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500 rounded-full blur-[80px] opacity-35" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
              {t("cta_title")}
            </h2>
            <p className="text-indigo-200 text-sm md:text-base mb-8 leading-relaxed max-w-lg mx-auto text-balance">
              {t("cta_desc")}
            </p>
            <button
              onClick={scrollToUpload}
              className="group relative inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-900 font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-white/5 hover:shadow-xl hover:shadow-white/10"
            >
              {t("cta_btn")}
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="font-extrabold text-slate-900 font-outfit text-base">Monopic</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-xs text-slate-500">AI Portrait & Profile Studio SaaS</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500 font-medium">
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">
              Terms of Service (이용약관)
            </Link>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
              Privacy Policy (개인정보처리방침)
            </Link>
            <Link href="/refund" className="hover:text-indigo-600 transition-colors">
              Refund Policy (환불정책)
            </Link>
            <Link href="/pricing" className="hover:text-indigo-600 transition-colors">
              Pricing (요금제)
            </Link>
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              <span>💬</span>
              {t("feedback_footer_btn" as keyof typeof import("./lib/i18n/translations").translations.ko) || "문의 / 지원"}
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>
            Monopic · 대표: 박윤우 (Yunwoo Park) · 소재지: 대전광역시 유성구 전민로38번길 56 · Support: <a href="mailto:majicboy56575@gmail.com" className="text-indigo-600 font-semibold hover:underline">majicboy56575@gmail.com</a>
          </p>
          <p>© 2026 Monopic. All rights reserved.</p>
        </div>
      </footer>

      {/* Feedback Modal */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

    </div>
  );
}
