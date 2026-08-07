export type ApplicantInput = {
  fullName: string;
  age: number;
  gender: string;
  familySize: number;
  employmentStatus: string;
  incomeType: string;
  employmentYears: number;
  annualIncome: number;
  existingLoans: number;
  monthlyDebt: number;
  creditHistoryYears: number;
  creditInquiries: number;
  pastDue: string;
  ownsProperty: boolean;
  ownsCar: boolean;
};

export type FeatureContribution = { feature: string; impact: number };

export type PredictionRecord = {
  id: string;
  createdAt: string;
  name: string;
  approved: boolean;
  confidence: number;
  probability: number;
  income: number;
  contributions: FeatureContribution[];
  recommendations: string[];
};

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

/**
 * Client-side surrogate of the deployed XGBoost scoring endpoint.
 * Weights mirror the feature importances reported by the trained model.
 */
export function scoreApplicant(input: ApplicantInput) {
  const dti = input.annualIncome > 0 ? (input.monthlyDebt * 12) / input.annualIncome : 1;

  const parts: FeatureContribution[] = [
    { feature: "Annual income", impact: clamp(input.annualIncome / 90000) * 0.26 - 0.05 },
    { feature: "Debt-to-income", impact: (0.45 - clamp(dti, 0, 1.2)) * 0.5 },
    { feature: "Credit history", impact: clamp(input.creditHistoryYears / 12) * 0.18 - 0.03 },
    { feature: "Employment tenure", impact: clamp(input.employmentYears / 10) * 0.15 - 0.02 },
    { feature: "Credit inquiries", impact: (2 - Math.min(input.creditInquiries, 8)) * 0.035 },
    { feature: "Existing loans", impact: (1 - Math.min(input.existingLoans, 6)) * 0.04 },
    { feature: "Past-due record", impact: input.pastDue === "none" ? 0.12 : input.pastDue === "under30" ? -0.06 : -0.28 },
    { feature: "Assets owned", impact: (input.ownsProperty ? 0.07 : 0) + (input.ownsCar ? 0.03 : 0) },
    { feature: "Employment status", impact: input.employmentStatus === "employed" ? 0.08 : input.employmentStatus === "self" ? 0.03 : -0.12 },
    { feature: "Household size", impact: (2 - Math.min(input.familySize, 7)) * 0.015 },
  ];

  const raw = parts.reduce((sum, p) => sum + p.impact, 0);
  const probability = clamp(1 / (1 + Math.exp(-4.2 * raw)));
  const approved = probability >= 0.5;
  const confidence = approved ? probability : 1 - probability;

  const contributions = [...parts].sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact)).slice(0, 6);

  const recommendations: string[] = [];
  if (dti > 0.4) recommendations.push("Reduce monthly debt obligations below 40% of income before reapplying.");
  if (input.creditInquiries > 3) recommendations.push("Limit new credit inquiries — 3+ recent checks lower the score materially.");
  if (input.creditHistoryYears < 3) recommendations.push("Build at least 3 years of credit history for a stronger profile.");
  if (input.pastDue !== "none") recommendations.push("Clear past-due balances; overdue records are the strongest negative signal.");
  if (input.annualIncome < 30000) recommendations.push("Higher declared income improves the approval probability significantly.");
  if (recommendations.length === 0) recommendations.push("Profile is strong — maintain current utilisation and payment behaviour.");

  return { approved, probability, confidence, contributions, recommendations };
}

const KEY = "ccap.history.v1";

export function loadHistory(): PredictionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as PredictionRecord[];
  } catch {
    return [];
  }
}

export function saveRecord(record: PredictionRecord) {
  if (typeof window === "undefined") return;
  const next = [record, ...loadHistory()].slice(0, 100);
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
