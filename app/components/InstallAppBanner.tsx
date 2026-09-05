"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallAppBanner() {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(standalone);

    if (standalone) return;

    // Check dismissal from session
    const wasDismissed = sessionStorage.getItem("pwa_banner_dismissed");
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // Detect iOS
    const ua = navigator.userAgent;
    const isiOS = /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(isiOS);

    if (isiOS) {
      // On iOS, show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }

    // Android / Desktop: listen for the native install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt, isIOS]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    setShowBanner(false);
    setShowIOSGuide(false);
    sessionStorage.setItem("pwa_banner_dismissed", "true");
  }, []);

  // Don't render if already installed, dismissed, or banner not triggered
  if (isStandalone || dismissed || !showBanner) return null;

  return (
    <>
      {/* Floating Install Banner */}
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-md animate-slide-up"
        role="alert"
      >
        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-500/10 border border-slate-200/80 p-4 flex items-center gap-3.5">
          {/* App Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <img
              src="/icon-192x192.png"
              alt="Monopic"
              className="w-10 h-10 rounded-lg"
            />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-slate-900 truncate">
              Monopic
            </p>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
              {t("install_banner_desc")}
            </p>
          </div>

          {/* Install Button */}
          <button
            onClick={handleInstallClick}
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 transition-all duration-200"
          >
            {t("install_btn")}
          </button>

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            aria-label="Close"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* iOS Install Guide Modal */}
      {showIOSGuide && (
        <div
          className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={handleDismiss}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-3xl p-6 pb-10 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">
                {t("install_ios_title")}
              </h3>
              <button
                onClick={handleDismiss}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Step 1 */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {t("install_ios_step1")}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t("install_ios_step1_desc")}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {t("install_ios_step2")}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t("install_ios_step2_desc")}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {t("install_ios_step3")}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t("install_ios_step3_desc")}
                </p>
              </div>
            </div>

            {/* Visual hint: share icon animation */}
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
    </>
  );
}
