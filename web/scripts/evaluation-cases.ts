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

export const evaluationCases: EvaluationCase[] = [
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
