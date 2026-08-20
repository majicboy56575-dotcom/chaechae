"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PRICING_PLANS, type PricingPlan, getLocalCredits } from "../lib/pricing";
import PayPalButton from "../components/PayPalButton";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../lib/i18n/LanguageContext";

export default function PricingPage() {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(PRICING_PLANS[1]); // Default to Standard (10장)
  const [currentCredits, setCurrentCredits] = useState<number>(0);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    plan: PricingPlan;
  } | null>(null);

  useEffect(() => {
    setCurrentCredits(getLocalCredits());
    const handleUpdate = () => setCurrentCredits(getLocalCredits());
    window.addEventListener("chae_chae_credits_updated", handleUpdate);
    return () => window.removeEventListener("chae_chae_credits_updated", handleUpdate);
  }, []);

  const handlePaymentSuccess = (orderId: string, plan: PricingPlan) => {
    setCompletedOrder({ orderId, plan });
    setCurrentCredits(getLocalCredits());
  };

  const getPlanName = (plan: PricingPlan) => {
    return t(`plan_${plan.id}_name` as keyof typeof import("../lib/i18n/translations").translations.ko) || plan.name;
  };

  const getPlanDesc = (plan: PricingPlan) => {
    return t(`plan_${plan.id}_desc` as keyof typeof import("../lib/i18n/translations").translations.ko) || plan.description;
  };

  const getPlanBadge = (plan: PricingPlan) => {
    if (!plan.discountBadge) return null;
    return t(`plan_${plan.id}_badge` as keyof typeof import("../lib/i18n/translations").translations.ko) || plan.discountBadge;
  };

  const getPlanPer = (plan: PricingPlan) => {
    return t(`plan_${plan.id}_per` as keyof typeof import("../lib/i18n/translations").translations.ko) || `${plan.perPhoto} / photo (${plan.count} photos)`;
  };

  const getPlanFeatures = (plan: PricingPlan) => {
    return [
      t(`plan_${plan.id}_f1` as keyof typeof import("../lib/i18n/translations").translations.ko),
      t(`plan_${plan.id}_f2` as keyof typeof import("../lib/i18n/translations").translations.ko),
      t(`plan_${plan.id}_f3` as keyof typeof import("../lib/i18n/translations").translations.ko),
      t(`plan_${plan.id}_f4` as keyof typeof import("../lib/i18n/translations").translations.ko),
      t(`plan_${plan.id}_f5` as keyof typeof import("../lib/i18n/translations").translations.ko),
    ].filter(Boolean);
  };

  return (
    <div className="relative min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-to-b from-indigo-100/40 via-purple-100/20 to-transparent blur-3xl opacity-70" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100/80 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-950 font-outfit">
              Chae Chae
            </span>
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100/80 text-xs font-bold text-indigo-700">
              <span>{t("nav_credits")}:</span>
              <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[11px]">
                {currentCredits}
              </span>
            </div>
            <Link
              href="/#upload-section"
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-[0.98]"
            >
              {t("nav_start")}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 mb-6 shadow-sm">
            <span>💳</span>
            <span>{t("pricing_badge")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
            {t("pricing_hero_title1")}<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600">
              {t("pricing_hero_title2")}
            </span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto">
            {t("pricing_hero_sub")}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto mb-16">
          {PRICING_PLANS.map((plan) => {
            const isSelected = selectedPlan.id === plan.id;
            const badge = getPlanBadge(plan);
            const features = getPlanFeatures(plan);

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-white border-2 border-indigo-600 shadow-2xl shadow-indigo-500/15 ring-4 ring-indigo-500/10 -translate-y-2"
                    : "bg-white/80 border-2 border-slate-100 hover:border-indigo-200 shadow-lg shadow-slate-200/40 hover:-translate-y-1"
                }`}
              >
                {/* Popular / Discount Badge */}
                {badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-none">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10.5px] font-black uppercase tracking-wider shadow-sm whitespace-nowrap ${
                        plan.isPopular
                          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                          : "bg-emerald-500 text-white"
                      }`}
                    >
                      {badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Radio */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">
                      {getPlanName(plan)}
                    </h3>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-600"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-white block" />
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 font-medium mb-6 leading-relaxed">
                    {getPlanDesc(plan)}
                  </p>

                  {/* Price */}
                  <div className="mb-6 bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        {plan.priceStr}
                      </span>
                      <span className="text-xs font-bold text-slate-400">/ USD</span>
                    </div>
                    <p className="text-[11px] font-bold text-indigo-600 mt-1">
                      {getPlanPer(plan)}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-semibold">
                        <svg className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan(plan);
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {isSelected ? t("pricing_selected_btn") : t("pricing_choose_btn")}
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Plan Checkout Box with PayPal Button */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xl shadow-slate-200/50 mb-16">
          <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                {t("pricing_selected_plan")}
              </span>
              <h4 className="text-lg font-black text-slate-900">
                {getPlanName(selectedPlan)}
              </h4>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-slate-900">
                {selectedPlan.priceStr}
              </span>
              <span className="block text-[11px] font-bold text-emerald-600">
                +{selectedPlan.count}
              </span>
            </div>
          </div>

          {/* PayPal Payment Component */}
          <div className="mb-4">
            <p className="text-xs text-slate-500 font-bold mb-3 text-center">
              {t("pricing_paypal_guide")}
            </p>
            <PayPalButton
              plan={selectedPlan}
              onSuccess={handlePaymentSuccess}
            />
          </div>

          {/* Trust Badges */}
          <div className="pt-4 border-t border-slate-100/80 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 font-bold">
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm">🔒</span>
              <span>{t("pricing_trust_ssl")}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm">🛡️</span>
              <span>{t("pricing_trust_buyer")}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm">⚡</span>
              <span>{t("pricing_trust_instant")}</span>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-black text-slate-900 text-center mb-8 tracking-tight">
            {t("pricing_faq_title")}
          </h3>
          <div className="space-y-4">
            {[
              {
                q: t("faq_1_q"),
                a: t("faq_1_a"),
              },
              {
                q: t("faq_2_q"),
                a: t("faq_2_a"),
              },
              {
                q: t("faq_3_q"),
                a: t("faq_3_a"),
              },
              {
                q: t("faq_4_q"),
                a: t("faq_4_a"),
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm"
              >
                <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="text-indigo-600 font-extrabold">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Payment Success Modal */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 max-w-md w-full shadow-2xl text-center transform scale-100 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-3xl flex items-center justify-center mx-auto mb-4 animate-bounce">
              🎉
            </div>
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
              {t("modal_success_badge")}
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              {t("modal_success_title")}
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              <strong>{getPlanName(completedOrder.plan)}</strong> ({completedOrder.plan.priceStr})
              <br />
              {t("nav_credits")}: <span className="font-extrabold text-indigo-600">{currentCredits}</span>
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left mb-6 text-xs text-slate-500">
              <div className="flex justify-between mb-1">
                <span>Order ID:</span>
                <span className="font-mono font-bold text-slate-700 truncate max-w-[180px]">
                  {completedOrder.orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span className="font-bold text-slate-800">
                  +{completedOrder.plan.count}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <Link
                href="/#upload-section"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all text-sm shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>{t("modal_go_generate")}</span>
              </Link>
              <button
                onClick={() => setCompletedOrder(null)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 px-6 rounded-xl transition-all text-xs"
              >
                {t("modal_close")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 font-outfit">Chae Chae</span>
          </div>
          <div>
            <p>© 2026 Chae Chae. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
