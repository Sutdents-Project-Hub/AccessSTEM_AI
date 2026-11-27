import type { ChatErrorCode } from "@/lib/chat-contract";
import type { ChartFacts } from "@/lib/charts";
import { fullSolutionLabel } from "@/lib/learning-copy";

export type Language = "zh-Hant" | "en";

export const workspaceCopy = {
  "zh-Hant": {
    skip: "跳至主要內容", nav: "學習室導覽", material: "圖表教材", chat: "AI 對話", contrast: "高對比",
    title: "讀懂函數圖表", titleParts: ["讀懂", "函數圖表"],
    intro: "從圖表的全貌、座標到變化趨勢，依自己的步調閱讀和追問。",
    source: "教材來源", sample: "內建圖表", custom: "貼上題目",
    sourceHelp: "更換教材會開始新的對話。", chart: "圖表範例",
    description: "圖表描述或文字題目",
    descriptionHelp: "貼上公式、已知座標或刻度。請勿填寫姓名、學校或其他個人資料。",
    useDescription: "使用這份題目", descriptionReady: "已使用這份題目，可開始提問。",
    descriptionLabel: "對話中的題目 · 未經教師核對", descriptionChanged: "要改用新內容，請再選一次「使用這份題目」。",
    reviewed: "已經人工核對", unreviewed: "待教師核對", overview: "全貌",
    axes: "座標軸、單位與關鍵點", keyPoint: "關鍵點", concepts: "數學概念與趨勢",
    axesIntro: "橫軸 x，縱軸 y。", tutor: "AI 學習助理", modes: "學習方式", preferences: "調整學習偏好",
    modeCopy: [["完整導讀", "逐步說明"], ["重點短述", "結論優先"], ["教師引導", "教學草稿"]],
    fieldLabels: ["解說深度", "解題方式", "數學程度"],
    optionLabels: [["簡短重點", "逐步解說", "深入解析"], ["只給提示", "循序引導", fullSolutionLabel["zh-Hant"]], ["初次接觸", "熟悉基本概念"]],
  },
  en: {
    skip: "Skip to main content", nav: "Workspace navigation", material: "Graph lesson", chat: "AI chat", contrast: "High contrast",
    title: "Read function graphs", titleParts: ["Read", "function graphs"],
    intro: "Explore coordinates and trends, then ask questions at your own pace.",
    source: "Lesson source", sample: "Sample graphs", custom: "Paste a problem",
    sourceHelp: "Changing lessons starts a new conversation.", chart: "Sample graph",
    description: "Graph description or problem",
    descriptionHelp: "Paste a formula, known points, or scale markings. Leave out names, schools, and other personal information.",
    useDescription: "Use this problem", descriptionReady: "Problem added. You can now ask a question.",
    descriptionLabel: "Current problem · Not reviewed by a teacher", descriptionChanged: "Choose “Use this problem” again to apply the new text.",
    reviewed: "Reviewed", unreviewed: "Teacher review pending", overview: "Overview",
    axes: "Axes, units, and key points", keyPoint: "Key point", concepts: "Math concepts and trends",
    axesIntro: "The horizontal axis is x. The vertical axis is y.", tutor: "AI learning tutor", modes: "Learning mode", preferences: "Learning preferences",
    modeCopy: [["Full guide", "Step by step"], ["Quick summary", "Key points first"], ["Teacher guide", "Lesson draft"]],
    fieldLabels: ["Depth", "Solution style", "Math level"],
    optionLabels: [["Brief", "Step by step", "In depth"], ["Hints only", "Guided", fullSolutionLabel.en], ["New to the topic", "Know the basics"]],
  },
} as const;

export const tutorCopy = {
  "zh-Hant": {
    tutor: "AI 學習助理", draft: "AI 教學草稿，使用前請核對。", copied: "已複製草稿",
    copyFailed: "無法複製，請直接選取回答文字。", copyDraft: "複製教學草稿",
    notes: "查看回答依據", given: "已知資料", derived: "數學推導", unknown: "待確認",
    source: "依據", needsReview: "教材或回答中的部分內容仍待核對。",
    reply: "回應這一題", replyPrefix: "我想回應這一題", ready: "AI 回答已就緒，可到對話紀錄閱讀。",
    waiting: "正在取得 AI 回答。", stopped: "已停止等待，問題仍保留。",
    networkError: "暫時無法連線。問題已保留，可再送出一次。", history: "對話紀錄", you: "你",
    next: "接著問", start: "從這些問題開始", chooseLesson: "使用內建圖表，或在教材區確認題目後開始提問。",
    hintGuidance: `要看完整解答，請到調整學習偏好選「${fullSolutionLabel["zh-Hant"]}」。`,
    yourQuestion: "你的問題", latest: "閱讀最新回答", stop: "停止等待", retry: "重試", send: "送出",
    privacy: "問題會送至 OpenAI。請勿填寫個人資料。",
    starters: ["先說圖表的全貌", "從座標軸說起", "只給我一個提示"],
    followUps: ["換一種方式解釋", "只給我下一步提示", "出一題讓我試答"],
    educator: "產生高中函數導讀草稿，附三道引導題",
  },
  en: {
    tutor: "AI learning tutor", draft: "AI lesson draft. Review before use.", copied: "Draft copied",
    copyFailed: "Could not copy. Select the answer text to copy it.", copyDraft: "Copy lesson draft",
    notes: "View answer sources", given: "Given", derived: "Derived", unknown: "Unknown",
    source: "Source", needsReview: "Some lesson or answer details still need review.",
    reply: "Respond to this question", replyPrefix: "I want to respond to this question", ready: "Your answer is ready in the conversation history.",
    waiting: "Getting an AI answer.", stopped: "Stopped waiting. Your question is still here.",
    networkError: "Could not connect. Your question is still here. Try sending it again.", history: "Conversation history", you: "You",
    next: "Ask a follow-up", start: "Start with one of these questions", chooseLesson: "Choose a sample graph or apply your own problem before asking.",
    hintGuidance: `To see the solution, choose ${fullSolutionLabel.en} in Learning preferences.`,
    yourQuestion: "Your question", latest: "Read the latest answer", stop: "Stop waiting", retry: "Retry", send: "Send",
    privacy: "Questions go to OpenAI. Leave out personal information.",
    starters: ["Give me an overview of the graph", "Start with the axes", "Give me just one hint"],
    followUps: ["Explain it another way", "Give me a hint for the next step", "Give me a question to try"],
    educator: "Draft a high-school lesson guide with three questions",
  },
} as const;

export const englishErrors: Record<ChatErrorCode, string> = {
  INVALID_REQUEST: "Choose a lesson or enter a problem, then enter a question.",
  PAYLOAD_TOO_LARGE: "Shorten the question or conversation and try again.",
  ORIGIN_REJECTED: "Submit your question from the AccessSTEM AI page.",
  RATE_LIMITED: "The AI service is temporarily at its limit. Try again shortly.",
  AI_UNAVAILABLE: "AI is temporarily unavailable. You can still read the lesson and try later.",
  AI_TIMEOUT: "This answer took too long. Please try again.",
  AI_INVALID_RESPONSE: "The answer did not arrive in full. Please try again.",
  INTERNAL_ERROR: "The service could not respond. Please try again.",
};

const chartEnglish: Record<string, {
  title: string; short: string; long: string; reading: string; points: string[]; trends: string[];
}> = {
  "quadratic-vertex-demo-01": {
    title: "Quadratic functions and vertices",
    short: "This parabola opens upward. Its vertex is where it changes from falling to rising.",
    long: "The horizontal axis is x and the vertical axis is y. No physical units are specified. As x increases, the curve falls until it reaches its lowest point at (2, 1), then rises. The line x = 2 is the axis of symmetry. When x is 0 or 4, y is 5.",
    reading: "y equals the square of the quantity x minus two, plus one",
    points: ["Vertex", "Vertical intercept", "Symmetric point"],
    trends: ["Opens upward.", "Falls when x is below 2 and rises when x is above 2.", "The curve is symmetric about x = 2 and does not cross the x-axis."],
  },
  "linear-slope-demo-01": {
    title: "Linear functions and slope",
    short: "This line rises by two units of y for every one-unit increase in x.",
    long: "The horizontal axis is x and the vertical axis is y. No physical units are specified. The straight line rises at a constant rate. It crosses the vertical axis at (0, 1) and the horizontal axis at (−0.5, 0). From (0, 1) to (2, 5), x increases by 2 and y increases by 4.",
    reading: "y equals two times x plus one",
    points: ["Vertical intercept", "Horizontal intercept", "Point on the line"],
    trends: ["The slope is 2.", "Whenever x increases by 1, y increases by 2.", "When x is 0, y is 1."],
  },
  "quadratic-maximum-demo-01": {
    title: "Quadratic functions and maxima",
    short: "This parabola opens downward. Its vertex is where it changes from rising to falling.",
    long: "The horizontal axis is x and the vertical axis is y. No physical units are specified. As x increases, the curve rises until it reaches its highest point at (−1, 4), then falls. Its axis of symmetry is x = −1, and its horizontal intercepts are (−3, 0) and (1, 0).",
    reading: "y equals the negative of the square of the quantity x plus one, then add four",
    points: ["Vertex", "Left horizontal intercept", "Right horizontal intercept"],
    trends: ["Opens downward.", "Rises when x is below −1 and falls when x is above −1.", "The axis of symmetry is x = −1."],
  },
};

export function displayChart(chart: ChartFacts, language: Language): ChartFacts {
  const copy = chartEnglish[chart.id];
  if (language !== "en" || !copy) return chart;

  return {
    ...chart,
    title: copy.title,
    source: { ...chart.source, title: "Original AccessSTEM lesson" },
    unknowns: ["The problem does not specify physical units for either axis."],
    shortDescription: copy.short,
    longDescription: copy.long,
    formulaReading: copy.reading,
    facts: {
      ...chart.facts,
      keyPoints: chart.facts.keyPoints.map((point, index) => ({ ...point, name: copy.points[index] ?? point.name })),
      trends: copy.trends,
    },
  };
}
