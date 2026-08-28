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
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "5장 (Starter)",
    count: 5,
    price: 3.99,
    priceStr: "$3.99",
    perPhoto: "$0.80",
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
    const current = getLocalCredits();
    if (current <= 0) return false;
    localStorage.setItem(CREDIT_STORAGE_KEY, (current - 1).toString());
    window.dispatchEvent(new Event("chae_chae_credits_updated"));
    return true;
  } catch {
    return true;
  }
}
