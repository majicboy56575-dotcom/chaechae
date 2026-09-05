"use client";

import { useState, useEffect, useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../lib/auth/AuthContext";
import { useTranslation } from "../lib/i18n/LanguageContext";

type FeedbackCategory = "bug" | "payment" | "suggestion" | "other";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [category, setCategory] = useState<FeedbackCategory>("bug");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-fill email from user account
  useEffect(() => {
    if (user?.email && !email) {
      setEmail(user.email);
    }
  }, [user, email]);

  // Focus textarea when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Reset form on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setMessage("");
        setCategory("bug");
        setStatus("idle");
      }, 300);
    }
  }, [isOpen]);

  const categories: { id: FeedbackCategory; emoji: string; labelKey: string }[] = [
    { id: "bug", emoji: "🐛", labelKey: "feedback_cat_bug" },
    { id: "payment", emoji: "💳", labelKey: "feedback_cat_payment" },
    { id: "suggestion", emoji: "💡", labelKey: "feedback_cat_suggestion" },
    { id: "other", emoji: "📝", labelKey: "feedback_cat_other" },
  ];

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setStatus("sending");

    try {
      // Collect device & environment info automatically
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        isStandalone: window.matchMedia("(display-mode: standalone)").matches,
      };

      await addDoc(collection(db, "feedbacks"), {
        category,
        message: message.trim(),
        email: email.trim() || null,
        uid: user?.uid || null,
        displayName: user?.displayName || null,
        deviceInfo,
        createdAt: serverTimestamp(),
        status: "new", // for admin dashboard tracking
      });

      setStatus("success");
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-violet-600 px-6 pt-6 pb-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-xl">
              💬
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {t("feedback_title" as keyof typeof import("../lib/i18n/translations").translations.ko) || "문의 / 버그 제보"}
              </h3>
              <p className="text-xs text-white/70 font-medium">
                {t("feedback_subtitle" as keyof typeof import("../lib/i18n/translations").translations.ko) || "소중한 의견을 보내주세요"}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce-gentle">
                ✅
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                {t("feedback_success_title" as keyof typeof import("../lib/i18n/translations").translations.ko) || "접수되었습니다!"}
              </h4>
              <p className="text-sm text-slate-500">
                {t("feedback_success_desc" as keyof typeof import("../lib/i18n/translations").translations.ko) || "빠르게 확인하고 답변드리겠습니다."}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                {t("feedback_close" as keyof typeof import("../lib/i18n/translations").translations.ko) || "닫기"}
              </button>
            </div>
          ) : (
            <>
              {/* Category Selection */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  {t("feedback_category_label" as keyof typeof import("../lib/i18n/translations").translations.ko) || "문의 유형"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        category === cat.id
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm"
                          : "bg-white text-slate-600 border-slate-150 hover:border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      <span>{t(cat.labelKey as keyof typeof import("../lib/i18n/translations").translations.ko) || cat.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  {t("feedback_message_label" as keyof typeof import("../lib/i18n/translations").translations.ko) || "내용"}
                </label>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    String(t("feedback_message_placeholder" as keyof typeof import("../lib/i18n/translations").translations.ko) || "어떤 문제가 발생했는지 자세히 적어주세요...")
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all resize-none"
                />
              </div>

              {/* Email (optional) */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  {t("feedback_email_label" as keyof typeof import("../lib/i18n/translations").translations.ko) || "답변받을 이메일 (선택)"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 transition-all"
                />
              </div>

              {/* Error message */}
              {status === "error" && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-600">
                  <span>⚠️</span>
                  <span>
                    {t("feedback_error" as keyof typeof import("../lib/i18n/translations").translations.ko) || "전송에 실패했습니다. 다시 시도해주세요."}
                  </span>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!message.trim() || status === "sending"}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all ${
                  !message.trim()
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : status === "sending"
                    ? "bg-indigo-400 text-white cursor-wait"
                    : "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] shadow-md"
                }`}
              >
                {status === "sending" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>{t("feedback_sending" as keyof typeof import("../lib/i18n/translations").translations.ko) || "보내는 중..."}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    <span>{t("feedback_submit" as keyof typeof import("../lib/i18n/translations").translations.ko) || "보내기"}</span>
                  </>
                )}
              </button>

              {/* Auto-collected info notice */}
              <p className="text-center text-[10px] text-slate-400 leading-tight">
                {t("feedback_auto_info" as keyof typeof import("../lib/i18n/translations").translations.ko) || "문제 해결을 위해 기기 정보와 앱 버전이 함께 전송됩니다."}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
