const sourceLabels = {
  formula: { "zh-Hant": "教材公式", en: "Lesson formula" },
  "x-axis": { "zh-Hant": "橫軸與單位", en: "Horizontal axis and unit" },
  "y-axis": { "zh-Hant": "縱軸與單位", en: "Vertical axis and unit" },
  "key-points": { "zh-Hant": "教材關鍵點", en: "Key points in the lesson" },
  trends: { "zh-Hant": "教材趨勢說明", en: "Trend description" },
  "missing-data": { "zh-Hant": "題目未提供的資料", en: "Details missing from the problem" },
  "user-description": { "zh-Hant": "你提供的題目描述", en: "Your problem description" },
  question: { "zh-Hant": "這一輪的提問", en: "Your current question" },
} as const;

export const materialSources = {
  chart: new Set(["formula", "x-axis", "y-axis", "key-points", "trends", "missing-data", "question"]),
  custom: new Set(["user-description", "missing-data", "question"]),
};

export function materialSourceLabel(reference: string | null, language: "zh-Hant" | "en") {
  return reference && Object.hasOwn(sourceLabels, reference)
    ? sourceLabels[reference as keyof typeof sourceLabels][language]
    : null;
}
