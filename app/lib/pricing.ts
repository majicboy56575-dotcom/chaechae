export interface PricingPlan {
  id: "starter" | "standard" | "best_value";
  name: string;
  count: number;
  price: number;
  priceStr: string;
  perPhoto: string;
  isPopular?: boolean;
  discountBadge?: string;
  description: string;
  features: string[];
  paddlePriceId?: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "5장 (Starter)",
    count: 5,
    price: 3.99,
    priceStr: "$3.99",
    perPhoto: "$0.80",
    paddlePriceId: "pri_01m2javmd907cd11y1abqyp4e4",
    description: "이력서 & 증명사진을 빠르게 준비하는 기본 패키지",
    features: [
      "AI 고해상도 생성 5장",
      "12가지 전체 스타일 선택 가능",
      "300dpi 인화용 시트 자동 배치",
      "이력서 및 상업적 이용 가능",
      "초고속 10초 완성",
    ],
  },
  {
    id: "standard",
    name: "10장 (Standard)",
    count: 10,
    price: 6.99,
    priceStr: "$6.99",
    perPhoto: "$0.70",
    paddlePriceId: "pri_01m2jaz2zd7zgdbdrtybv11cp5",
    isPopular: true,
    discountBadge: "12% 할인 · 가장 인기",
    description: "비즈니스 정장부터 감성 화보까지 다양한 컨셉 추천",
    features: [
      "AI 초고해상도 생성 10장",
      "12가지 스타일 + 나만의 커스텀 프롬프트",
      "증명·여권·비자 규격 시트 무제한",
      "비포 · 애프터 정밀 비교 슬라이더",
      "우선 순위 쾌속 생성",
    ],
  },
  {
    id: "best_value",
    name: "20장 (Best Value)",
    count: 20,
    price: 10.99,
    priceStr: "$10.99",
    perPhoto: "$0.55",
    paddlePriceId: "pri_01m2jazxj71pvf6mnj79s8crb1",
    discountBadge: "31% 최대 절약",
    description: "전문 스튜디오급 풀 패키지 & 넉넉한 대량 생성",
    features: [
      "AI 초고해상도 생성 20장",
      "모든 스타일 & 무제한 커스텀 스타일",
      "초고화질 2K 원본 파일 평생 보관",
      "4×6인치 모든 규격 인화 시트 지원",
      "VIP 최고 우선순위 생성",
    ],
  },
];

export function getPlan(id: string): PricingPlan | undefined {
  return PRICING_PLANS.find((p) => p.id === id);
}

// ─── Daily Free Generations Event Configuration ─────────────────
// Set to false to instantly turn off the daily free event without breaking anything.
export const ENABLE_DAILY_FREE_EVENT = false;
export const DAILY_FREE_LIMIT = 2;

function getTodayKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `chae_daily_free_${year}-${month}-${day}`;
}

export function getDailyFreeRemaining(): number {
  if (!ENABLE_DAILY_FREE_EVENT || typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(getTodayKey());
    const used = raw ? parseInt(raw, 10) : 0;
    return Math.max(0, DAILY_FREE_LIMIT - (isNaN(used) ? 0 : used));
  } catch {
    return 0;
  }
}

export function getTotalAvailableCredits(): number {
  const free = getDailyFreeRemaining();
  const purchased = getLocalCredits();
  return free + purchased;
}

// Local storage credit helper for seamless UX
const CREDIT_STORAGE_KEY = "chae_chae_user_credits";

export function getLocalCredits(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(CREDIT_STORAGE_KEY);
    if (!raw) return 0;
    const num = parseInt(raw, 10);
    return isNaN(num) ? 0 : num;
  } catch {
    return 0;
  }
}

export function addLocalCredits(amount: number): number {
  if (typeof window === "undefined") return amount;
  try {
    const current = getLocalCredits();
    const updated = current + amount;
    localStorage.setItem(CREDIT_STORAGE_KEY, updated.toString());
    window.dispatchEvent(new Event("chae_chae_credits_updated"));
    return updated;
  } catch {
    return amount;
  }
}

export function consumeLocalCredit(): boolean {
  if (typeof window === "undefined") return true;
  try {
    // 1. Consume daily free credit first if available
    if (ENABLE_DAILY_FREE_EVENT) {
      const freeRemaining = getDailyFreeRemaining();
      if (freeRemaining > 0) {
        const todayKey = getTodayKey();
        const raw = localStorage.getItem(todayKey);
        const used = raw ? parseInt(raw, 10) : 0;
        localStorage.setItem(todayKey, ((isNaN(used) ? 0 : used) + 1).toString());
        window.dispatchEvent(new Event("chae_chae_credits_updated"));
        return true;
      }
    }

    // 2. Consume purchased credits
    const current = getLocalCredits();
    if (current <= 0) return false;
    localStorage.setItem(CREDIT_STORAGE_KEY, (current - 1).toString());
    window.dispatchEvent(new Event("chae_chae_credits_updated"));
    return true;
  } catch {
    return true;
  }
}

// ─── Firestore Credit Sync ──────────────────────────────────────

/**
 * Fetch credits from Firestore via API and sync to localStorage.
 * Returns the server-side credit balance.
 */
export async function fetchFirestoreCredits(userId: string): Promise<number> {
  try {
    const res = await fetch(`/api/credits?userId=${encodeURIComponent(userId)}`);
    if (!res.ok) return getLocalCredits();
    const data = await res.json();
    const serverCredits = data.credits ?? 0;
    // Sync to localStorage for fast UI
    if (typeof window !== "undefined") {
      localStorage.setItem(CREDIT_STORAGE_KEY, serverCredits.toString());
      window.dispatchEvent(new Event("chae_chae_credits_updated"));
    }
    return serverCredits;
  } catch {
    return getLocalCredits();
  }
}

/**
 * Consume 1 credit via server API (Firestore atomic transaction).
 * Also updates localStorage for immediate UI feedback.
 * Returns true if successful, false if insufficient credits.
 */
export async function consumeCreditServer(userId: string): Promise<boolean> {
  try {
    const res = await fetch("/api/credits/consume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (!res.ok) return false;
    // Sync remaining credits to localStorage
    if (typeof window !== "undefined" && data.credits !== undefined) {
      localStorage.setItem(CREDIT_STORAGE_KEY, data.credits.toString());
      window.dispatchEvent(new Event("chae_chae_credits_updated"));
    }
    return data.success === true;
  } catch {
    // Fallback to local credit consumption
    return consumeLocalCredit();
  }
}

/**
 * Set localStorage credits to a specific value (used after Firestore sync).
 */
export function setLocalCredits(amount: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CREDIT_STORAGE_KEY, amount.toString());
    window.dispatchEvent(new Event("chae_chae_credits_updated"));
  } catch {}
}

