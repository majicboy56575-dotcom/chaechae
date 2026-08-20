"use client";

import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { type PricingPlan, addLocalCredits } from "../lib/pricing";
import { useTranslation } from "../lib/i18n/LanguageContext";

interface PayPalButtonProps {
  plan: PricingPlan;
  onSuccess: (orderId: string, plan: PricingPlan) => void;
  onError?: (err: Error | unknown) => void;
}

export default function PayPalButton({ plan, onSuccess, onError }: PayPalButtonProps) {
  const { currentLanguageInfo, t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clientId =
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
    "test"; // Official PayPal Sandbox fallback client ID

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-12 bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-xs text-slate-400 font-bold">
        Loading payment system...
      </div>
    );
  }

  const localizedPlanName =
    t(`plan_${plan.id}_name` as keyof typeof import("../lib/i18n/translations").translations.ko) ||
    plan.name;

  return (
    <div className="w-full flex flex-col items-center">
      {errorMessage && (
        <div className="w-full mb-3 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold rounded-xl text-center">
          {errorMessage}
        </div>
      )}

      <PayPalScriptProvider
        key={currentLanguageInfo.paypalLocale}
        options={{
          clientId,
          currency: "USD",
          intent: "capture",
          components: "buttons",
          locale: currentLanguageInfo.paypalLocale,
        }}
      >
        <div className="w-full relative z-10">
          <PayPalButtons
            key={`${plan.id}-${currentLanguageInfo.paypalLocale}`}
            style={{
              layout: "vertical",
              color: "gold",
              shape: "rect",
              label: "pay",
              height: 48,
            }}
            createOrder={(data, actions) => {
              setErrorMessage(null);
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: `Chae Chae AI - ${localizedPlanName} (${plan.count} credits)`,
                    amount: {
                      currency_code: "USD",
                      value: plan.price.toFixed(2),
                    },
                    custom_id: plan.id,
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              try {
                if (!actions.order) {
                  throw new Error("Order processing error");
                }
                const details = await actions.order.capture();
                const orderId = details.id || data.orderID;
                
                // Add credits to local storage
                addLocalCredits(plan.count);

                onSuccess(orderId, plan);
              } catch (err: unknown) {
                console.error("PayPal Capture Error:", err);
                const msg = err instanceof Error ? err.message : "Payment capture failed.";
                setErrorMessage(msg);
                onError?.(err);
              }
            }}
            onError={(err) => {
              console.error("PayPal Button Error:", err);
              setErrorMessage("Error opening PayPal payment window. Please try again.");
              onError?.(err);
            }}
            onCancel={() => {
              // User closed the PayPal window
            }}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
}
