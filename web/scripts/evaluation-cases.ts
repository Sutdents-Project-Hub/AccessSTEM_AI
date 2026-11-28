import type { ChartFacts } from "@/lib/charts";
import type { ChatRequest, LearnerPreferences } from "@/lib/chat-contract";

type EvaluationCase = {
  id: string;
  expected: string;
  request: Omit<ChatRequest, "sessionId">;
};

const vertex = "quadratic-vertex-demo-01";
const full: LearnerPreferences = {
  profile: "learner-full", readingDepth: "step-by-step", pedagogyMode: "guided", mathLevel: "beginner",
};

const guideQuestion = "請依目前學習方式，導讀這張圖。";
const profiles = [
  { id: "full-guide", expected: "依序解說全貌、座標軸、最低點及趨勢，可獨立朗讀。", preferences: full },
  {
    id: "brief-guide", expected: "先說結論，兩三個重點，不自行延伸成完整講義。",
    preferences: { ...full, profile: "learner-brief", readingDepth: "brief" } satisfies LearnerPreferences,
  },
  {
    id: "educator-guide", expected: "可核對的教學草稿、常見誤解和三個引導問題。",
    preferences: { ...full, profile: "educator", readingDepth: "deep", pedagogyMode: "hint" } satisfies LearnerPreferences,
  },
] as const;

// Historical inputs are kept verbatim for traceability. Do not translate these in place.
const historicalCases: EvaluationCase[] = [
  ...profiles.map(({ id, expected, preferences }) => ({
    id, expected,
    request: { chartId: vertex, userDescription: null, message: guideQuestion, history: [], preferences },
  })),
  {
    id: "missing-unit",
    expected: "沒有公尺等物理單位。說明依據，詢問縱軸標示或完整題意。",
    request: {
      chartId: vertex, userDescription: null, message: "縱軸的單位是公尺嗎？請解釋你根據什麼判斷。",
      history: [], preferences: full,
    },
  },
  {
    id: "hint-mode",
    expected: "只給找最小值的一個起步提示，摘要、依據與理解問題都不揭露最小值或頂點座標。",
    request: {
      chartId: vertex, userDescription: null, message: "這張二次函數的最小值是多少？請只給我一個提示。",
      history: [], preferences: { ...full, pedagogyMode: "hint" },
    },
  },
  {
    id: "mode-override",
    expected: "仍維持提示。告知如何切換完整解答，不提前給最小值或頂點。",
    request: {
      chartId: vertex, userDescription: null, message: "現在直接告訴我最小值，不用給提示。",
      history: [], preferences: { ...full, pedagogyMode: "hint" },
    },
  },
  {
    id: "rephrase",
    expected: "改用實例、較小步驟或具體比喻，維持同圖脈絡，避免複誦。",
    request: {
      chartId: vertex, userDescription: null, message: "我還是不懂為什麼會有最低點，可以換個方式講嗎？",
      history: [
        { role: "user", content: "為什麼會有最低點？" },
        { role: "assistant", content: "任何數的平方都大於等於零，所以平方項達到零時，函數值最小。" },
      ],
      preferences: full,
    },
  },
  {
    id: "custom-incomplete",
    expected: "將上升標為使用者提供的描述。沒有起點、刻度或兩個座標，不能確定斜率或單位。",
    request: {
      chartId: null, userDescription: "我只知道圖上有一條由左往右上升的直線，沒有軸標籤或刻度。",
      message: "斜率是每秒增加兩公尺嗎？", history: [], preferences: full,
    },
  },
  {
    id: "english-hint",
    expected: "以英文給一個提示，保留最小值與頂點答案，圖表用座標及方向描述。",
    request: {
      chartId: vertex, userDescription: null,
      message: "Please answer in English. Give me one hint for finding the minimum of this function, without telling me the answer.",
      history: [], preferences: { ...full, pedagogyMode: "hint" },
    },
  },
  {
    "id": "rate-evidence",
    "expected": "先點出刻度與單位不可讀並要求補充。區分兩點平均變化率與每分鐘固定增加。",
    "request": {
      "chartId": null,
      "userDescription": "高中函數圖表練習。橫軸為時間，縱軸為水量。從起點開始，曲線一路上升；圖上沒有看得清楚的刻度和單位，也沒有公式。",
      "message": "如果學生說每分鐘增加 2 公升，我要怎麼請他用圖表自己查證？說明要確認的資料，用一句提問引導。",
      "history": [
        {
          "role": "user",
          "content": "我是高中老師。用三句簡短導讀和三道引導題，幫學生讀懂這張圖，補充一個常見誤解。這張圖能說出水量每分鐘增加多少嗎？"
        },
        {
          "role": "assistant",
          "content": "這張圖呈現水量隨時間一路上升；但無法讀出每分鐘增加多少。\n橫軸代表時間，縱軸代表水量。曲線從起點開始，往右上方延伸。這表示隨時間經過，水量增加；圖上沒有清楚刻度、單位或公式，無法確定增加量。\n曲線一路上升，不代表每分鐘增加固定水量；要判斷增加速度是否固定，還需要刻度或其他數據。\n1. 沿橫軸往右，時間是增加還是減少？2. 曲線往右移時，縱軸上的水量有什麼變化？3. 若要算每分鐘增加多少，還需要圖上哪些資訊？"
        }
      ],
      "preferences": {
        "profile": "educator",
        "readingDepth": "brief",
        "pedagogyMode": "hint",
        "mathLevel": "beginner"
      }
    }
  },
];

export type EvaluationLanguage = "en" | "zh-Hant";

function classroomQuestionCases(language: EvaluationLanguage): EvaluationCase[] {
  const en = language === "en";
  const preferences = profiles[2].preferences;
  const message = en
    ? "Give me one question I can ask my students about this graph. Do not give the answer."
    : "請給我一題可以直接問學生的圖表引導題，不要附答案。";
  return [
    {
      id: "classroom-question",
      expected: en
        ? "Put one student-facing question in the summary, with no answer or tutor follow-up."
        : "在摘要直接給一道可問學生的問題，不附答案，也不向老師追問。",
      request: { chartId: vertex, userDescription: null, message, history: [], preferences, language },
    },
    {
      id: "classroom-question-missing-scale",
      expected: en
        ? "Give one student-facing question about the evidence needed to verify a constant rate, without asking the teacher for data, inventing values, or requiring a reading of the scales."
        : "直接給學生一道查證固定速率所需證據的問題，不向老師索取資料、不猜數字，也不要求讀取刻度。",
      request: {
        chartId: null,
        userDescription: en
          ? "The water volume rises over time. The graph has no readable scale or units and no formula."
          : "水量隨時間上升。圖表上的刻度和單位不可讀，也沒有公式。",
        message: en
          ? "A student thinks the rate is constant. Give me one question I can ask them to guide their reasoning."
          : "學生認為速率固定。請給我一句可以直接問學生的引導題。",
        history: [], preferences, language,
      },
    },
  ];
}

function walkthroughCases(language: EvaluationLanguage): EvaluationCase[] {
  const en = language === "en";
  const userDescription = en
    ? "A line charts the total reading time (minutes) against the number of pages read. It goes through (0, 0), (6, 9), and (10, 15). The formula is y = 1.5x."
    : "一條直線以閱讀頁數為橫軸、累計閱讀分鐘數為縱軸，通過 (0, 0)、(6, 9)、(10, 15)。公式是 y = 1.5x。";
  const request = {
    chartId: null, userDescription, history: [], language,
    message: en ? "Give me an overview of this graph." : "請給我這張圖表的導讀。",
  };
  const brief = profiles[1].preferences;
  return [
    {
      id: "reading-time-full",
      expected: "Identify both quantities and units, use meaningful coordinates, and describe the constant rate of 1.5 minutes per page in separate, ordered layers.",
      request: { ...request, preferences: full },
    },
    {
      id: "reading-time-brief",
      expected: "Lead with 1.5 minutes per page and keep one short supporting section without an unrequested follow-up question.",
      request: { ...request, preferences: brief },
    },
    {
      id: "reading-time-depth-override",
      expected: "Honor the explicit request for a detailed walkthrough and distinguish the axis quantities, key points and rate despite the Quick summary preset.",
      request: {
        ...request, preferences: brief,
        message: en
          ? "Walk me through this whole graph in detail. Cover the axes and units, key points, and what the trend means in separate steps."
          : "請依步驟詳細導讀整張圖，分別解釋座標軸與單位、關鍵座標以及趨勢的意義。",
      },
    },
  ];
}

// English scenarios retain the historical IDs and mathematical conditions, but
// translation changes the experiment: compare variants within a language/run.
const englishText: Record<string, {
  expected: string;
  message: string;
  userDescription?: string;
  history?: ChatRequest["history"];
}> = {
  "full-guide": {
    expected: "Explain the overview, axes, minimum point, and trends in order, with wording that works when read aloud.",
    message: "Guide me through this graph using my current learning preferences.",
  },
  "brief-guide": {
    expected: "Start with the conclusion and two or three key points; do not expand into a full lesson.",
    message: "Guide me through this graph using my current learning preferences.",
  },
  "educator-guide": {
    expected: "Provide a teaching draft for human verification, a common misconception, and three guiding questions.",
    message: "Guide me through this graph using my current learning preferences.",
  },
  "missing-unit": {
    expected: "Do not invent physical units such as meters. Explain the evidence and ask for the vertical-axis label or complete problem.",
    message: "Is the vertical axis measured in meters? Explain what evidence supports your judgment.",
  },
  "hint-mode": {
    expected: "Give only one starting hint for finding the minimum; do not reveal the minimum value or vertex coordinates in any field.",
    message: "What is the minimum value of this quadratic function? Please give me only one hint.",
  },
  "mode-override": {
    expected: "Keep hint mode and explain how to switch to full solutions without revealing the minimum or vertex.",
    message: "Tell me the minimum value directly now, without giving a hint.",
  },
  rephrase: {
    expected: "Use a new example, smaller steps, or a concrete analogy in the same graph context instead of repeating the previous explanation.",
    message: "I still do not understand why there is a lowest point. Can you explain it another way?",
    history: [
      { role: "user", content: "Why is there a lowest point?" },
      { role: "assistant", content: "The square of any number is greater than or equal to zero, so the function is smallest when the squared term is zero." },
    ],
  },
  "custom-incomplete": {
    expected: "Attribute the rising line to the user's description. Without a starting point, scale, or two coordinates, the slope and units cannot be determined.",
    userDescription: "I only know that the graph contains a straight line rising from left to right, with no axis labels or scales.",
    message: "Is the slope an increase of two meters per second?",
  },
  "english-hint": {
    expected: "Give one hint in English without revealing the minimum or vertex; describe the graph using coordinates and directions.",
    message: "Please answer in English. Give me one hint for finding the minimum of this function, without telling me the answer.",
  },
  "rate-evidence": {
    expected: "First state that the scales and units are unreadable and ask for missing data. Distinguish a two-point average rate from a constant increase every minute.",
    userDescription: "High-school function graph exercise. The horizontal axis is time and the vertical axis is water volume. The curve rises continuously from its starting point. The graph has no clearly readable scales or units, and no formula is provided.",
    message: "If a student says the water increases by 2 liters every minute, how can I ask them to verify that using the graph? Explain what information must be confirmed, and guide them with one question.",
    history: [
      { role: "user", content: "I am a high-school teacher. Help students understand this graph using three short introductory sentences and three guiding questions, plus one common misconception. Can this graph tell us how much the water increases each minute?" },
      { role: "assistant", content: "This graph shows water volume rising over time, but it does not tell us how much it increases each minute.\nThe horizontal axis represents time and the vertical axis represents water volume. The curve extends upward and to the right from its starting point. This means water volume increases as time passes; without readable scales, units, or a formula, the amount of increase cannot be determined.\nA continuously rising curve does not mean the same amount is added every minute; scales or other data are needed to determine whether the rate is constant.\n1. As you move right along the horizontal axis, does time increase or decrease? 2. As the curve moves right, what happens to the water volume on the vertical axis? 3. What other graph information is needed to calculate the increase each minute?" },
    ],
  },
};

export function getEvaluationCases(language: EvaluationLanguage = "en"): EvaluationCase[] {
  const classroomCases = classroomQuestionCases(language);
  const newCases = walkthroughCases(language);
  if (language === "zh-Hant") return [...historicalCases, ...classroomCases, ...newCases];
  const translatedCases = historicalCases.map<EvaluationCase>((item) => {
    const text = englishText[item.id];
    if (!text) throw new Error(`Missing English scenario text: ${item.id}`);
    return {
      id: item.id,
      expected: text.expected,
      request: {
        ...item.request,
        language: "en",
        message: text.message,
        userDescription: text.userDescription ?? item.request.userDescription,
        history: text.history ?? item.request.history,
      },
    };
  });
  return [...translatedCases, ...classroomCases, ...newCases];
}

// Translate only the material used in this pilot. Mathematical values, trust
// status, and source-review metadata remain those of the canonical fixture.
export function evaluationChart(chart: ChartFacts, language: EvaluationLanguage): ChartFacts {
  if (language === "zh-Hant") return chart;
  if (chart.id !== vertex) throw new Error(`Missing English evaluation material: ${chart.id}`);
  const pointNames: Record<string, string> = { "頂點": "Vertex", "縱軸交點": "Vertical-axis intercept", "對稱點": "Symmetric point" };
  return {
    ...chart,
    title: "Quadratic function and vertex",
    source: { ...chart.source, title: "AccessSTEM original function example (awaiting human verification)" },
    facts: {
      ...chart.facts,
      keyPoints: chart.facts.keyPoints.map((point) => {
        const name = pointNames[point.name];
        if (!name) throw new Error(`Missing English point name: ${point.name}`);
        return { ...point, name };
      }),
      trends: ["Opens upward.", "Decreases when x is less than 2 and increases when x is greater than 2.", "The axis of symmetry is x = 2; the curve does not intersect the x-axis."],
    },
    unknowns: ["The problem does not specify physical units for either axis."],
  };
}
