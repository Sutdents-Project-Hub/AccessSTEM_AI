type Axis = { label: string; unit: string | null };
type KeyPoint = { name: string; x: number; y: number };

export type ChartFacts = {
  id: string;
  version: string;
  title: string;
  topic: "linear" | "quadratic";
  source: {
    kind: "unknown" | "curated_verified";
    title: string;
    url: string | null;
    reviewer: string | null;
    reviewedAt: string | null;
  };
  facts: {
    formula: string;
    xAxis: Axis;
    yAxis: Axis;
    keyPoints: KeyPoint[];
    trends: string[];
  };
  unknowns: string[];
  shortDescription: string;
  longDescription: string;
  formulaDisplay: string;
  formulaReading: string;
  plot: {
    coefficients: [number, number, number];
    x: [number, number];
    y: [number, number];
  };
};

const candidateSource: ChartFacts["source"] = {
  kind: "unknown",
  title: "AccessSTEM 自製函數範例",
  url: null,
  reviewer: null,
  reviewedAt: null,
};

const xAxis: Axis = { label: "x", unit: null };
const yAxis: Axis = { label: "y", unit: null };
const unknowns = ["題目沒有指定橫軸或縱軸的實體單位。"];

export const charts: ChartFacts[] = [
  {
    id: "quadratic-vertex-demo-01",
    version: "1.0",
    title: "二次函數與頂點",
    topic: "quadratic",
    source: candidateSource,
    facts: {
      formula: "y = (x - 2)^2 + 1",
      xAxis,
      yAxis,
      keyPoints: [
        { name: "頂點", x: 2, y: 1 },
        { name: "縱軸交點", x: 0, y: 5 },
        { name: "對稱點", x: 4, y: 5 },
      ],
      trends: ["開口向上。", "當 x 小於 2 時遞減，大於 2 時遞增。", "對稱軸是 x = 2，整條曲線不與 x 軸相交。"],
    },
    unknowns,
    shortDescription: "這是一條開口向上的拋物線，從下降轉為上升的地方就是頂點。",
    longDescription: "橫軸為 x，縱軸為 y，題目未指定實體單位。從 x 較小的一側往 x 較大的一側讀，曲線在 x 小於 2 時下降，經過最低點 (2, 1) 後開始上升。以 x = 2 為對稱軸，x = 0 與 x = 4 時的 y 都是 5。",
    formulaDisplay: "y = (x − 2)² + 1",
    formulaReading: "y 等於 x 減二的平方，再加一",
    plot: { coefficients: [1, -4, 5], x: [-3, 7], y: [-2, 9] },
  },
  {
    id: "linear-slope-demo-01",
    version: "1.0",
    title: "線性函數與斜率",
    topic: "linear",
    source: candidateSource,
    facts: {
      formula: "y = 2x + 1",
      xAxis,
      yAxis,
      keyPoints: [
        { name: "縱軸交點", x: 0, y: 1 },
        { name: "橫軸交點", x: -0.5, y: 0 },
        { name: "直線上的點", x: 2, y: 5 },
      ],
      trends: ["斜率為 2。", "每當 x 增加 1，y 就增加 2。", "當 x = 0，y = 1。"],
    },
    unknowns,
    shortDescription: "這是一條往上升的直線，每向 x 的正方向走一格，y 就增加兩格。",
    longDescription: "橫軸為 x，縱軸為 y，題目未指定實體單位。直線隨 x 增加而均勻上升，經過縱軸上的 (0, 1) 和橫軸上的 (−0.5, 0)。它也通過 (2, 5)，從 (0, 1) 到 (2, 5) 時，x 增加 2，y 增加 4。",
    formulaDisplay: "y = 2x + 1",
    formulaReading: "y 等於二乘以 x，再加一",
    plot: { coefficients: [0, 2, 1], x: [-4, 6], y: [-5, 9] },
  },
  {
    id: "quadratic-maximum-demo-01",
    version: "1.0",
    title: "二次函數與最高點",
    topic: "quadratic",
    source: candidateSource,
    facts: {
      formula: "y = -(x + 1)^2 + 4",
      xAxis,
      yAxis,
      keyPoints: [
        { name: "頂點", x: -1, y: 4 },
        { name: "左側橫軸交點", x: -3, y: 0 },
        { name: "右側橫軸交點", x: 1, y: 0 },
      ],
      trends: ["開口向下。", "當 x 小於 −1 時遞增，大於 −1 時遞減。", "對稱軸是 x = −1。"],
    },
    unknowns,
    shortDescription: "這是一條開口向下的拋物線，從上升轉為下降的地方就是頂點。",
    longDescription: "橫軸為 x，縱軸為 y，題目未指定實體單位。曲線在 x 小於負 1 時隨 x 增加而上升，經過最高點 (−1, 4) 後開始下降。對稱軸是 x = −1，兩個橫軸交點分別位於 (−3, 0) 和 (1, 0)。",
    formulaDisplay: "y = −(x + 1)² + 4",
    formulaReading: "y 等於 x 加一的平方取負，再加四",
    plot: { coefficients: [-1, -2, 3], x: [-6, 4], y: [-5, 6] },
  },
];

export function getChart(id: string): ChartFacts | undefined {
  return charts.find((chart) => chart.id === id);
}
